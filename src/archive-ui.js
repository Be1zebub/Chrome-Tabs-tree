app.archiveUI = {
	refresh() {
		const db = app.archive.getAll()

		if (db.length == 0) {
			this.displayPlaceholder()
			return
		}

		app.nodes.archive.innerHTML = ""
		db.forEach((row) => {
			row.type == "tab"
				? this.addTab(row.data, row.id)
				: this.addGroup(row.data, row.id)
		})
	},

	// templates

	displayPlaceholder() {
		app.nodes.archive.innerHTML = ""

		const container = document.createElement("div")
		container.classList.add("blank-archive")
		container.innerHTML = `
			<h1>Nothing yet</h1>
			<p>All saved tabs will be displayed here.</p>
			<p>To save a tab/group, open the context menu and click the archive button.</p>
		`

		app.nodes.archive.appendChild(container)
	},

	tabTemplate(tab, parent) {
		const li = app.tabs.tabTemplate(parent)
		if (tab.favicon) li.fav.setURL(tab.favicon)

		li.titleText.textContent = tab.title
		li.descText.textContent = tab.url

		if (tab.pinned) li.pin.style.display = "inline-block"

		if (tab.muted) {
			const img = document.createElement("img")
			img.alt = "Audible"
			img.src = app.tabs.icons.speaker[true]
			img.classList.add("small", "tab-audible")
			li.header.appendChild(img)
		}

		return li
	},

	showPlaceholderIfEmpty() {
		if (app.archive.getAll().length == 0) this.displayPlaceholder()
	},

	// main ui methods

	addTab(tab, id) {
		const li = this.tabTemplate(tab, app.nodes.archive)
		const handleClick = (e) => this.tabContextMenu(e, li, tab, id)

		li.addEventListener("click", handleClick)
		li.addEventListener("contextmenu", handleClick)
	},

	addGroup(data, id) {
		const groupLi = app.tabs.groupTemplate(app.nodes.archive)
		groupLi.setHeader(data.group.title, data.group.color)

		groupLi.addEventListener("contextmenu", (e) => {
			if (
				e.target === groupLi ||
				e.target == groupLi.span ||
				e.target == groupLi.ul
			) {
				this.groupContextMenu(e, groupLi, id)
			}
		})

		data.tabs.forEach((tab) => {
			const tabLi = this.tabTemplate(tab, groupLi.ul)
			tabLi.archiveData = { tab, parentID: id }

			const handleClick = (e) => {
				e.stopPropagation()
				this.subTabContextMenu(e, e.target)
			}
			tabLi.addEventListener("click", handleClick)
			tabLi.addEventListener("contextmenu", handleClick)
		})
	},

	// context menus

	groupContextMenu(e, li, id) {
		e.preventDefault()
		const menu = app.contextMenu.open(li)

		app.contextMenu.addOption(menu, {
			name: "Restore",
			cback: () => {
				app.archive.restoreGroup(id)
				li.remove()
			},
		})
		app.contextMenu.addOption(menu, {
			name: "Delete",
			cback: () => {
				app.archive.delete(id, "group")
				li.remove()
			},
			warning: true,
		})

		app.contextMenu.setPos(menu, e)
	},

	tabContextMenu(e, li, tab, id) {
		e.preventDefault()
		const menu = app.contextMenu.open(li)

		app.contextMenu.addOption(menu, {
			name: "Copy URL",
			cback: () => navigator.clipboard.writeText(tab.url),
		})
		app.contextMenu.addOption(menu, {
			name: "Copy Title",
			cback: () => navigator.clipboard.writeText(tab.title),
		})
		app.contextMenu.addOption(menu, {
			name: "Open",
			cback: () => app.archive.createTab(tab),
		})
		app.contextMenu.addOption(menu, {
			name: "Restore",
			cback: () => {
				app.archive.restoreTab(id)
				li.remove()
			},
		})
		app.contextMenu.addOption(menu, {
			name: "Delete",
			cback: () => {
				app.archive.delete(id, "tab")
				li.remove()
				this.showPlaceholderIfEmpty()
			},
			warning: true,
		})

		app.contextMenu.setPos(menu, e)
	},

	subTabContextMenu(e, li) {
		e.preventDefault()

		const menu = app.contextMenu.open(li)
		const { tab } = li.archiveData

		app.contextMenu.addOption(menu, {
			name: "Copy URL",
			cback: () => navigator.clipboard.writeText(tab.url),
		})
		app.contextMenu.addOption(menu, {
			name: "Copy Title",
			cback: () => navigator.clipboard.writeText(tab.title),
		})
		app.contextMenu.addOption(menu, {
			name: "Open",
			cback: () => app.archive.createTab(tab),
		})
		app.contextMenu.addOption(menu, {
			name: "Restore",
			cback: () => {
				app.archive.createTab(tab)
				app.archive.deleteSubTab(li.archiveData)
				li.remove()
			},
		})
		app.contextMenu.addOption(menu, {
			name: "Delete",
			cback: () => {
				app.archive.deleteSubTab(li.archiveData)
				li.remove()
			},
			warning: true,
		})

		app.contextMenu.setPos(menu, e)
	},
}
