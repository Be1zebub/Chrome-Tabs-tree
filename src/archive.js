app.archive = {
	cache: null,

	// Data Management

	getAll() {
		if (!this.cache) {
			const data = localStorage.getItem("TabsTreeArchive")
			this.cache = data ? JSON.parse(data) : []
		}
		return this.cache
	},

	save(db) {
		this.cache = db
		localStorage.setItem("TabsTreeArchive", JSON.stringify(db))
	},

	// Internal Insert & Delete

	push(type, data) {
		const db = this.getAll()
		const newId = db.length ? Math.max(...db.map((t) => t.id)) + 1 : 1
		db.push({ id: newId, type, data })
		this.save(db)
	},

	pop(id, type) {
		const row = this.getAll().find((row) => row.id === id && row.type === type)
		return row ? row.data : null
	},

	delete(id, type) {
		this.save(
			this.getAll().filter((row) => !(row.id === id && row.type === type))
		)
	},

	// Archive Operations

	addTab(tab) {
		this.push("tab", {
			title: tab.title,
			url: tab.url,
			favicon: tab.favIconUrl,
			pinned: tab.pinned,
			muted: tab.mutedInfo?.muted || false,
		})
	},

	addGroup(group, tabs) {
		this.push("group", {
			group: { title: group.title, color: group.color },
			tabs: tabs.map((tab) => ({
				title: tab.title,
				url: tab.url,
				favicon: tab.favIconUrl,
				pinned: tab.pinned,
				muted: tab.mutedInfo?.muted || false,
			})),
		})
	},

	deleteSubTab(data) {
		const db = this.getAll()
		const group = db.find(
			(row) => row.id === data.parentID && row.type === "group"
		)
		if (!group) return
		group.data.tabs = group.data.tabs.filter((tab) => tab !== data.tab)
		this.save(db)
	},

	// Internal Restore Helpers

	createTab(tab, callback) {
		chrome.tabs.create({ url: tab.url, pinned: tab.pinned }, (tabData) => {
			chrome.tabs.update(tab.id, { muted: tab.muted })
			callback?.(tabData)
		})
	},

	createGroup(data) {
		let tabIds = []
		data.tabs.forEach((tab, i) => {
			this.createTab(tab, (tabData) => {
				tabIds.push(tabData.id)
				if (tabIds.length === data.tabs.length) {
					chrome.tabs.group({ tabIds }, (groupId) => {
						chrome.tabGroups.update(groupId, {
							title: data.group.title,
							color: data.group.color,
						})
					})
				}
			})
		})
	},

	// Restore Methods

	restoreTab(id) {
		const data = this.pop(id, "tab")
		if (data) {
			this.createTab(data)
			this.delete(id, "tab")
		}
	},

	restoreGroup(id) {
		const data = this.pop(id, "group")
		if (data) {
			this.createGroup(data)
			this.delete(id, "group")
		}
	},
}
