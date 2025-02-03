app.tabs = {}

// chrome has no api for tab-groups colors ¯\_(ツ)_/¯
app.tabs.colors = {
	grey: "#DADCE0",
	blue: "#8AB4F8",
	red: "#F28B82",
	yellow: "#FDD663",
	green: "#81C995",
	pink: "#FF8BCB",
	purple: "#C58AF9",
	cyan: "#78D9EC",
	orange: "#FCAD70",
}

app.tabs.icons = {
	speaker: {
		[true]: "media/speaker-mute.svg",
		[false]: "media/speaker.svg",
	},
	pin: "media/pin.svg",
	fallback: "media/tab-fallback.png",
}

app.tabs.create = (tab) => {
	if (tab.groupId === -1) {
		app.tabs.append(tab, app.nodes.tabsList)
	} else {
		app.tabs.append(tab, app.tabs.createGroup(tab.groupId, app.nodes.tabsList))
	}
}

app.tabs.groupOptions = (menu, groupId, groupData, li) => {
	{
		const entry = document.createElement("div")
		menu.appendChild(entry)
		entry.classList.add("entry-small")

		const input = document.createElement("input")
		entry.appendChild(input)
		input.setAttribute("autofocus", "1")
		input.setAttribute("placeholder", "Title")
		input.value = groupData.title
		input.focus({
			preventScroll: true,
		})
		input.addEventListener("input", () => {
			li.span.textContent = input.value
			chrome.tabGroups.update(groupId, {
				title: input.value,
			})
		})
	}

	{
		const container = document.createElement("div")
		menu.appendChild(container)
		container.classList.add("group-colorpicker")

		let buttons = {}

		for (let name in app.tabs.colors) {
			const col = app.tabs.colors[name]

			const btn = document.createElement("button")
			container.appendChild(btn)
			btn.style.backgroundColor = col
			btn.onclick = (e) => {
				e.preventDefault()

				li.span.style.backgroundColor = col

				chrome.tabGroups.update(groupId, {
					color: name,
				})

				for (let name2 in buttons) {
					let active = name == name2
					let btn2 = buttons[name2]

					if (active) {
						btn2.classList.add("active")
					} else {
						btn2.classList.remove("active")
					}
				}
			}

			buttons[name] = btn

			if (groupData.color == name) {
				btn.classList.add("active")
			}
		}
	}

	app.contextMenu.addOption(menu, {
		name: "Archive",
		cback: () => {
			chrome.tabGroups.get(groupId, (groupData2) => {
				chrome.tabs.query({ groupId: groupId }, (tabs) => {
					app.archive.addGroup(groupData2, tabs)

					const tabIds = tabs.map((tab) => tab.id)
					chrome.tabs.remove(tabIds)
					li.remove()
				})
			})
		},
	})

	app.contextMenu.addOption(menu, {
		name: "Move to new window",
		cback: () => {
			chrome.tabs.query({ groupId: groupId }, (tabs) => {
				const tabIds = tabs.map((tab) => tab.id)

				chrome.tabGroups.get(groupId, (groupData2) => {
					chrome.windows.create(
						{ focused: true, tabId: tabIds[0] },
						(newWindow) => {
							chrome.tabs.move(
								tabIds.slice(1),
								{
									windowId: newWindow.id,
									index: -1,
								},
								() => {
									chrome.tabs.group(
										{
											tabIds: tabIds,
											createProperties: {
												windowId: newWindow.id,
											},
										},
										(groupId2) => {
											chrome.tabGroups.update(groupId2, {
												title: groupData2.title,
												color: groupData2.color,
											})
										}
									)
								}
							)
						}
					)
				})
			})
		},
	})

	app.contextMenu.addOption(menu, {
		name: "Ungroup",
		cback: () => {
			chrome.tabs.query({ groupId: groupId }, (tabs) => {
				const tabIds = tabs.map((tab) => tab.id)
				chrome.tabs.ungroup(tabIds)
			})

			li.remove()
		},
		warning: true,
	})

	app.contextMenu.addOption(menu, {
		name: "Close",
		cback: () => {
			chrome.tabs.query({ groupId: groupId }, (tabs) => {
				const tabIds = tabs.map((tab) => tab.id)
				chrome.tabs.remove(tabIds)
			})

			li.remove()
		},
		warning: true,
	})
}

app.tabs.groupTemplate = (parent) => {
	const li = document.createElement("li")
	parent.appendChild(li)
	li.classList.add("tabs-element")
	li.onclick = (e) => {
		e.preventDefault()

		li.classList.toggle("collapsed")
		if (li.ontoggle) {
			li.ontoggle()
		}
	}

	li.span = document.createElement("span")
	li.appendChild(li.span)

	li.ul = document.createElement("ul")
	li.appendChild(li.ul)
	li.ul.classList.add("tabs-group")
	li.ul.isGroup = true

	li.setHeader = (title, color) => {
		li.span.textContent = title
		li.span.style.backgroundColor = app.tabs.colors[color] || color
	}

	return li
}

app.tabs.createGroup = (groupId, parent) => {
	const cache = app.data.groups[groupId]
	if (cache !== undefined && document.body.contains(cache.li)) {
		return cache.ul
	}

	const li = app.tabs.groupTemplate(parent)
	li.ontoggle = (e) => {
		chrome.tabGroups.update(groupId, {
			collapsed: li.classList.contains("collapsed"),
		})
	}
	li.addEventListener("contextmenu", (e) => {
		e.preventDefault()

		chrome.tabGroups.get(groupId, (groupData) => {
			const menu = app.contextMenu.open(li)
			app.tabs.groupOptions(menu, groupId, groupData, li)
			app.contextMenu.setPos(menu, e)
		})
	})

	li.span.textContent = groupId

	let obj = {
		id: groupId,
		ul: li.ul,
		li: li,
		data: {},
	}

	chrome.tabGroups.get(groupId, (data) => {
		li.setHeader(data.title, data.color)

		if (data.collapsed) {
			li.classList.add("collapsed")
		}

		obj.data = data
	})

	app.data.groups[groupId] = obj

	return li.ul
}

app.tabs.tabOptions = (menu, tab, li, bookmarkData) => {
	app.contextMenu.addOption(menu, {
		name: "Copy URL",
		cback: () => {
			navigator.clipboard.writeText(tab.url)
		},
	})

	app.contextMenu.addOption(menu, {
		name: "Copy Title",
		cback: () => {
			navigator.clipboard.writeText(tab.title)
		},
	})

	app.contextMenu.addOption(menu, {
		name: tab.mutedInfo.muted ? "Unmute" : "Mute",
		cback: () => {
			tab.mutedInfo.muted = !tab.mutedInfo.muted

			chrome.tabs.update(tab.id, {
				muted: tab.mutedInfo.muted,
			})

			li.audible.src = app.tabs.icons.speaker[tab.mutedInfo.muted]
		},
		customcheck: () => {
			return tab.audible
		},
	})

	app.contextMenu.addOption(menu, {
		name: "Remove from favorites",
		cback: () => {
			chrome.bookmarks.remove(bookmarkData[0].id)
		},
		customcheck: () => {
			return bookmarkData.length > 0
		},
	})

	app.contextMenu.addOption(menu, {
		name: "Add to favorites",
		cback: () => {
			chrome.bookmarks.create({
				title: tab.title,
				url: tab.url,
			})
		},
		customcheck: () => {
			return bookmarkData.length == 0
		},
	})

	app.contextMenu.addOption(menu, {
		name: "Move to new group",
		cback: () => {
			chrome.tabs.group(
				{
					tabIds: tab.id,
				},
				(groupId) => {
					chrome.tabGroups.update(
						groupId,
						{
							title: "New group",
						},
						() => {
							const group = app.tabs.createGroup(groupId, app.nodes.tabsList)
							group.appendChild(li)
						}
					)
				}
			)
		},
		customcheck: () => {
			return tab.groupId == -1
		},
	})

	app.contextMenu.addOption(menu, {
		name: "Archive",
		cback: () => {
			chrome.tabs.get(tab.id, (tabData) => {
				app.archive.addTab(tabData)

				chrome.tabs.remove(tab.id)
				li.remove()
			})
		},
	})

	app.contextMenu.addOption(menu, {
		name: "Close",
		cback: () => {
			chrome.tabs.remove(tab.id)
			li.remove()

			if (parent.children.length == 0 && parent.isGroup) {
				parent.parentNode.remove()
			}
		},
		warning: true,
	})
}

app.tabs.tabTemplate = (parent) => {
	const li = document.createElement("li")
	parent.appendChild(li)
	li.classList.add("tab")

	li.header = document.createElement("div")
	li.header.classList.add("tab-header")
	li.appendChild(li.header)

	li.icons = document.createElement("span")
	li.icons.classList.add("tab-icons")
	li.header.appendChild(li.icons)

	li.pin = document.createElement("img")
	li.pin.src = app.tabs.icons.pin
	li.pin.alt = "Pinned"
	li.pin.style.display = "none"
	li.pin.classList.add("small")
	li.pin.classList.add("tab-pin")
	li.icons.appendChild(li.pin)

	li.fav = document.createElement("img")
	li.fav.alt = "Favicon"
	li.fav.src = app.tabs.icons.fallback
	li.fav.classList.add("tab-favicon")
	li.icons.appendChild(li.fav)
	li.fav.setURL = (url) => {
		li.fav.crossOrigin = "anonymous"
		li.fav.src = url
		li.fav.onerror = () => {
			li.fav.src = "https://images.duckduckgo.com/iu/?u=" + url
			li.fav.onerror = () => {
				li.fav.src = app.tabs.icons.fallback
				// console.log(tab.url, img, img.src)
			}
		}
	}

	li.titleText = document.createElement("span")
	li.titleText.classList.add("tab-title")
	li.header.appendChild(li.titleText)

	li.descText = document.createElement("div")
	li.descText.classList.add("tab-desc")
	li.appendChild(li.descText)

	return li
}

app.tabs.append = (tab, parent) => {
	const li = app.tabs.tabTemplate(parent)
	li.onclick = () => {
		chrome.tabs.update(tab.id, {
			active: true,
		})
	}

	app.data.tabs.push({
		tab: tab,
		node: li,
		parent: parent,
	})

	if (tab.pinned) {
		li.pin.style.display = "inline-block"
	}

	if (tab.audible) {
		const img = document.createElement("img")
		img.alt = "Audible"
		img.classList.add("small")
		img.classList.add("tab-audible")
		li.header.appendChild(img)

		img.src = app.tabs.icons.speaker[tab.mutedInfo.muted]
		li.audible = img
	}

	if (tab.favIconUrl) {
		li.fav.setURL(tab.favIconUrl)
	}

	if (tab.highlighted) {
		li.classList.add("highlighted")
		app.nodes.highlightedTab = li
	}

	li.titleText.textContent = tab.title
	li.descText.textContent = tab.url

	li.addEventListener("contextmenu", (e) => {
		e.preventDefault()

		chrome.bookmarks.search({ url: tab.url }, (bookmarkData) => {
			const menu = app.contextMenu.open(li)
			app.tabs.tabOptions(menu, tab, li, bookmarkData)
			app.contextMenu.setPos(menu, e)
		})
	})
}

app.tabs.refresh = () => {
	app.nodes.tabsList.innerHTML = ""

	chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_CURRENT }, (tabs) => {
		tabs.forEach((tab) => {
			app.tabs.create(tab, app.nodes.tabsList)
		})

		if (app.alreadyOpened) {
			return
		}
		app.alreadyOpened = true

		const scrollInterval = setInterval(function () {
			if (!app.nodes.highlightedTab) {
				clearInterval(scrollInterval)
				return
			}

			if (
				app.nodes.highlightedTab.offsetHeight > 0 &&
				app.nodes.highlightedTab.offsetWidth > 0
			) {
				app.nodes.highlightedTab.scrollIntoView({
					behavior: "instant",
					block: "center",
				})
				clearInterval(scrollInterval)
			}
		}, 5)
	})
}
