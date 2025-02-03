app.contextMenu = {}
app.contextMenu.waitRender = false

app.contextMenu.open = (parentNode) => {
	const prev = document.querySelector("#context-menu")
	if (prev !== null) {
		prev.remove()
	}

	const menu = document.createElement("ul")
	menu.id = "context-menu"

	document.body.appendChild(menu)

	app.contextMenu.waitRender = true
	setTimeout(() => {
		app.contextMenu.waitRender = false
	}, 10)

	app.contextMenu._parentNode = parentNode
	app.contextMenu.current = menu

	return menu
}

app.contextMenu.addOption = (menu, opt) => {
	if (opt.customcheck && opt.customcheck() == false) {
		return
	}

	const li = document.createElement("li")
	li.innerHTML = opt.name
	li.addEventListener("click", () => {
		opt.cback()
		menu.remove()
	})

	if (opt.warning) {
		li.classList.add("warning")
	}

	menu.appendChild(li)
}

app.contextMenu.setPos = (menu, event) => {
	let w = menu.clientWidth
	let h = menu.clientHeight
	let x = event.pageX
	let y = event.pageY

	// let x = Math.min(event.pageX, document.body.scrollWidth - w)
	// let y = Math.min(event.pageY, document.body.scrollHeight - h)

	if (x + w > document.body.scrollWidth) {
		x = x - w
	}

	if (y + h > document.body.scrollHeight) {
		y = y - h
	}

	if (y < 0) {
		y = 0
	}

	menu.style.left = `${x}px`
	menu.style.top = `${y}px`
}

{
	document.addEventListener("click", ContextMenuRemover)
	document.addEventListener("contextmenu", ContextMenuRemover)

	function ContextMenuRemover(e) {
		const menu = document.querySelector("#context-menu")

		if (
			app.contextMenu.waitRender == true ||
			menu == null ||
			e.target == menu ||
			menu.contains(e.target)
		) {
			return
		}

		menu.remove()
		app.contextMenu.current = null
	}
}
