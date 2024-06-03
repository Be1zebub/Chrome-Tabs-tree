export const ssr = false

import { dev } from "$app/environment"
if (dev) {
	// fake chrome api in development env

	window.chrome = {
		tabs: {},
		tabGroups: {},
		bookmarks: {},
		windows: {
			WINDOW_ID_CURRENT: null,
		},
	}

	let mockTabs = [
		{
			active: false,
			audible: false,
			autoDiscardable: true,
			discarded: false,
			favIconUrl: "https://www.google.com/favicon.ico",
			groupId: -1,
			height: 919,
			highlighted: false,
			id: 2009560142,
			incognito: true,
			index: 0,
			mutedInfo: {
				muted: false,
			},
			pinned: true,
			selected: false,
			status: "complete",
			title: "Google",
			url: "https://www.google.com/",
			width: 1920,
			windowId: 2009560141,
		},
		{
			active: false,
			audible: false,
			autoDiscardable: true,
			discarded: false,
			favIconUrl:
				"https://www.youtube.com/s/desktop/905763c7/img/favicon_32x32.png",
			groupId: -1,
			height: 919,
			highlighted: false,
			id: 2009560143,
			incognito: true,
			index: 1,
			mutedInfo: {
				muted: false,
			},
			pinned: true,
			selected: false,
			status: "complete",
			title: "YouTube",
			url: "https://www.youtube.com/",
			width: 1920,
			windowId: 2009560141,
		},
		{
			active: false,
			audible: true,
			autoDiscardable: true,
			discarded: false,
			favIconUrl:
				"https://www.youtube.com/s/desktop/905763c7/img/favicon_32x32.png",
			groupId: -1,
			height: 919,
			highlighted: false,
			id: 2009560162,
			incognito: true,
			index: 2,
			mutedInfo: {
				muted: false,
			},
			pinned: true,
			selected: false,
			status: "complete",
			title: "Me at the zoo",
			url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
			width: 1920,
			windowId: 2009560141,
		},
		{
			active: false,
			audible: true,
			autoDiscardable: true,
			discarded: false,
			favIconUrl: "https://pngquant.org/favicon.ico",
			groupId: 2095230792,
			height: 919,
			highlighted: false,
			id: 2009560144,
			incognito: true,
			index: 3,
			mutedInfo: {
				muted: true,
			},
			pinned: false,
			selected: false,
			status: "complete",
			title: "pngquant — lossy PNG compressor",
			url: "https://pngquant.org/",
			width: 1920,
			windowId: 2009560141,
		},
		{
			active: false,
			audible: false,
			autoDiscardable: true,
			discarded: false,
			favIconUrl: "https://prettier.io/icon.png",
			groupId: 2095230792,
			height: 919,
			highlighted: true,
			id: 2009560145,
			incognito: true,
			index: 4,
			mutedInfo: {
				muted: false,
			},
			pinned: false,
			selected: false,
			status: "complete",
			title: "Prettier · Opinionated Code Formatter",
			url: "https://prettier.io/",
			width: 1920,
			windowId: 2009560141,
		},
		{
			active: false,
			audible: false,
			autoDiscardable: true,
			discarded: false,
			favIconUrl: "https://dummyjson.com/public/fav.png",
			groupId: 2095230792,
			height: 919,
			highlighted: false,
			id: 2009560146,
			incognito: true,
			index: 5,
			mutedInfo: {
				muted: false,
			},
			pinned: false,
			selected: false,
			status: "complete",
			title: "DummyJSON - Fake REST API of JSON data for development",
			url: "https://dummyjson.com/",
			width: 1920,
			windowId: 2009560141,
		},
		{
			active: false,
			audible: false,
			autoDiscardable: true,
			discarded: false,
			favIconUrl: "https://svelte.dev/favicon.png",
			groupId: 2095230792,
			height: 919,
			highlighted: false,
			id: 2009560147,
			incognito: true,
			index: 6,
			mutedInfo: {
				muted: false,
			},
			pinned: false,
			selected: false,
			status: "complete",
			title: "Svelte • Cybernetically enhanced web apps",
			url: "https://svelte.dev/",
			width: 1920,
			windowId: 2009560141,
		},
		{
			active: false,
			audible: false,
			autoDiscardable: true,
			discarded: false,
			favIconUrl: "https://supabase.com/favicon/favicon-32x32.png",
			groupId: 2095230792,
			height: 919,
			highlighted: false,
			id: 2009560148,
			incognito: true,
			index: 7,
			mutedInfo: {
				muted: false,
			},
			pinned: false,
			selected: false,
			status: "complete",
			title: "Supabase | The Open Source Firebase Alternative",
			url: "https://supabase.com/",
			width: 1920,
			windowId: 2009560141,
		},
		{
			active: false,
			audible: false,
			autoDiscardable: true,
			discarded: false,
			favIconUrl: "https://utteranc.es/favicon.497adcf6.ico",
			groupId: 2095230792,
			height: 919,
			highlighted: false,
			id: 2009560149,
			incognito: true,
			index: 8,
			mutedInfo: {
				muted: false,
			},
			pinned: false,
			selected: false,
			status: "complete",
			title: "utterances",
			url: "https://utteranc.es/",
			width: 1920,
			windowId: 2009560141,
		},
		{
			active: true,
			audible: false,
			autoDiscardable: true,
			discarded: false,
			favIconUrl: "https://static.figma.com/app/icon/1/favicon.ico",
			groupId: 1751054339,
			height: 919,
			highlighted: false,
			id: 2009560154,
			incognito: true,
			index: 9,
			lastAccessed: 1717318035882.975,
			mutedInfo: {
				muted: false,
			},
			pinned: false,
			selected: true,
			status: "complete",
			title: "Figma: The Collaborative Interface Design Tool",
			url: "https://www.figma.com/",
			width: 1920,
			windowId: 2009560141,
		},
		{
			active: false,
			audible: false,
			autoDiscardable: true,
			discarded: false,
			favIconUrl: "https://www.svgrepo.com/favicon.ico",
			groupId: 1751054339,
			height: 919,
			highlighted: false,
			id: 2009560152,
			incognito: true,
			index: 10,
			mutedInfo: {
				muted: false,
			},
			pinned: false,
			selected: false,
			status: "complete",
			title: "SVG Repo - Free SVG Vectors and Icons",
			url: "https://www.svgrepo.com/",
			width: 1920,
			windowId: 2009560141,
		},
		{
			active: false,
			audible: false,
			autoDiscardable: true,
			discarded: false,
			favIconUrl: "https://media.flaticon.com/dist/min/img/favicon.ico",
			groupId: 1751054339,
			height: 919,
			highlighted: false,
			id: 2009560153,
			incognito: true,
			index: 11,
			mutedInfo: {
				muted: false,
			},
			pinned: false,
			selected: false,
			status: "complete",
			title: "Vector Icons and Stickers - PNG, SVG, EPS, PSD and CSS",
			url: "https://www.flaticon.com/",
			width: 1920,
			windowId: 2009560141,
		},
	]

	chrome.tabs.query = (_, cback) => {
		cback(mockTabs)
	}
	chrome.tabs.update = (id, updateProperties) => {
		const tab = mockTabs.find((tab) => {
			return tab.id == id
		})

		if (tab) {
			Object.assign(tab, updateProperties)
		}
	}
	chrome.tabs.remove = (id) => {
		mockTabs = mockTabs.filter((tab) => {
			return tab.id !== id
		})
	}

	let mockGroups = {
		2095230792: {
			collapsed: false,
			color: "purple",
			id: 2095230792,
			title: "dev tools",
			windowId: 2009560141,
		},
		1751054339: {
			collapsed: false,
			color: "orange",
			id: 1751054339,
			title: "design tools",
			windowId: 2009560141,
		},
	}

	chrome.tabGroups.get = (groupId, cback) => {
		cback(mockGroups[groupId])
	}

	chrome.tabGroups.update = (groupId, updateProperties) => {
		const group = mockGroups[groupId]

		if (group) {
			Object.assign(group, updateProperties)
		}
	}

	let mockBookmarks = [
		{
			dateAdded: 1714435974561,
			id: "249",
			index: 37,
			parentId: "43",
			title: "DummyJSON - Fake REST API of JSON data for development",
			url: "https://dummyjson.com/",
		},
		{
			dateAdded: 1713529175398,
			id: "234",
			index: 31,
			parentId: "43",
			title: "Prettier · Opinionated Code Formatter",
			url: "https://prettier.io/",
		},
	]

	chrome.bookmarks.search = (filter, cback) => {
		return mockBookmarks.find((bookmark) => {
			return bookmark.url == filter.url
		})
	}
	chrome.bookmarks.create = (data) => {
		mockBookmarks.push({
			dateAdded: Date.now(),
			id: null, // there is no sense to implement this in mock, because ext does not use it
			index: null, // there is no sense to implement this in mock, because ext does not use it
			parentId: null, // there is no sense to implement this in mock, because ext does not use it
			title: data.title,
			url: data.url,
		})
	}
	chrome.bookmarks.remove = (id) => {
		mockBookmarks = mockBookmarks.filter((bookmark) => {
			return bookmark.id !== id
		})
	}
}

const groupsColors = {
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

const GroupPrototype = {
	GetColor() {
		return groupsColors[this.color]
	},
	GetTitle() {
		return this.title
	},
	IsCollapsed() {
		return this.collapsed
	},
	SetCollapsed(collapsed) {
		chrome.tabGroups.update(this.id, {
			collapsed: collapsed,
		})
	},
}

function fetchFavicon(url) {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					reject()
					return
				}

				const contentType = response.headers.get("content-type")

				response.buffer().then((buffer) => {
					const base64 = buffer.toString("base64")
					resolve(`data:${contentType};base64,${base64}`)
				})
			})
			.catch(() => {
				reject()
			})
	})
}

let CurrentTabs = []

const TabPrototype = {
	GetGroup() {
		return new Promise((resolve) => {
			if (this.groupId === -1) {
				resolve(null)
				return
			}

			chrome.tabGroups.get(this.groupId, (group) => {
				Object.setPrototypeOf(group, GroupPrototype)
				resolve(group)
			})
		})
	},
	GetFavicon() {
		return new Promise((resolve) => {
			if (dev || !this.favIconUrl) {
				resolve(null)
				return
			}

			fetchFavicon(this.favIconUrl)
				.then((favicon) => {
					resolve(favicon)
				})
				.catch(() => {
					fetchFavicon(`https://images.duckduckgo.com/iu/?u=${this.favIconUrl}`)
						.then((favicon) => {
							resolve(favicon)
						})
						.catch(() => {
							resolve(null)
						})
				})
		})
	},
	GetTitle() {
		return this.title
	},
	GetURL() {
		return this.url
	},

	IsActive() {
		return this.active
	},
	IsPinned() {
		return this.pinned
	},
	IsAudible() {
		return this.audible
	},
	IsBookmarked() {
		return new Promise((resolve) => {
			chrome.bookmarks.search({ url: this.url }, (results) => {
				resolve(results.length > 0)
			})
		})
	},
	IsMuted() {
		return this.mutedInfo.muted
	},

	CreateBookmark() {
		chrome.bookmarks.search({ url: this.url }, (results) => {
			chrome.bookmarks.remove(results[0].id)
		})
	},
	RemoveBookmark() {
		chrome.bookmarks.create({
			title: this.title,
			url: this.url,
		})
	},
	SetMuted(muted) {
		this.mutedInfo.muted = muted
		chrome.tabs.update(this.id, {
			muted: muted,
		})
	},
	Activate() {
		chrome.tabs.update(this.id, {
			active: true,
		})
	},
	Remove() {
		chrome.tabs.remove(this.id)
	},
}

function Api() {
	return new Promise((resolve) => {
		chrome.tabs.query(
			{ windowId: chrome.windows.WINDOW_ID_CURRENT },
			(tabs) => {
				tabs.forEach((tab) => {
					Object.setPrototypeOf(tab, TabPrototype)
				})

				CurrentTabs = tabs
				resolve(tabs)
			}
		)
	})
}

export default Api
