<script>
	import { onMount } from "svelte"
	import FzySearch from "$lib/fuzzy-search.js"

	export let tabs = []
	export let hidden = {}

	let input

	onMount(function () {
		input.focus()
	})

	function keyup(event) {
		let userinput = event.target.value.trim().toLowerCase()
		let newHidden = {}

		tabs.forEach((tab) => {
			const visible = FzySearch(userinput, tab)

			if (visible == false) {
				newHidden[tab.id] = true
			}
		})

		hidden = newHidden
	}
</script>

<div>
	<input
		placeholder="Search by title or url..."
		bind:this={input}
		on:keyup={keyup}
	/>
	<button></button>
</div>

<style>
	div {
		position: relative;
		margin-top: 8px;
		margin-bottom: 24px;
		width: 100%;
		display: block;
		background-color: rgb(42, 42, 42);
		border-radius: 8px;
	}

	div > input {
		background: none;
		border: none;
		outline: none;
		color: rgb(225, 225, 225);
		padding: 0;
		padding-left: 16px;
		font-size: 14px;
		width: calc(100% - 66px);
		height: 50px;
	}

	div > button {
		height: 50px;
		aspect-ratio: 1;
		cursor: pointer;
		background: none;
		border: none;
		position: absolute;
		top: 0;
		right: 0;
	}

	div > button::before {
		content: "";
		display: inline-block;
		width: 18px;
		height: 18px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'%3E%3Cg fill='%23798b9b'%3E%3Cline x1='15.25' y1='15.25' x2='11.285' y2='11.285' fill='none' stroke='%23798b9b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3C/line%3E%3Ccircle cx='7.75' cy='7.75' r='5' fill='none' stroke='%23798b9b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'%3E%3C/circle%3E%3C/g%3E%3C/svg%3E");
	}
</style>
