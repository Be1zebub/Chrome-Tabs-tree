function openTab(id) {
	if (id == "archive") {
		app.archiveUI.refresh()
	} else {
		app.tabs.refresh()
	}

	document.querySelectorAll("nav > button").forEach((btn) => {
		const section = document.getElementById(btn.dataset.targetId)

		if (btn.dataset.targetId == id) {
			btn.classList.add("active")
			section.style.display = "block"
		} else {
			btn.classList.remove("active")
			section.style.display = "none"
		}
	})
}

document.addEventListener("DOMContentLoaded", () => {
	app.nodes.tabsList = document.querySelector("#tabs > .tabs-list")
	app.nodes.archive = document.querySelector("#archive > .tabs-list")

	let search = document.querySelector("#tabs > .search-bar > input")
	search.addEventListener("keyup", app.search)

	document.querySelectorAll("nav > button").forEach((btn) => {
		btn.onclick = () => {
			if (btn.classList.contains("active")) {
				return
			}

			localStorage.setItem("TabsTreeActiveTab", btn.dataset.targetId)
			openTab(btn.dataset.targetId)
		}
	})

	openTab(localStorage.getItem("TabsTreeActiveTab") || "tabs")
})
