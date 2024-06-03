<script>
	import SearchBar from "$components/search-bar.svelte"
	import TabsList from "$components/tabs-list.svelte"
	import Footer from "$components/footer.svelte"
	import Api from "$lib/api/chrome.js"

	let activeTab = null
	let hidden = {}

	let tabs = []
	Api().then((api_tabs) => {
		tabs = api_tabs
		// activeTab = tabs.filter((tab) => {
		// 	return tab.IsActive()
		// })

		tabs.forEach((tab) => {
			if (tab.IsActive()) {
				activeTab = tab
			}
		})
	})
</script>

<div>
	<SearchBar {tabs} bind:hidden />
	<TabsList {tabs} {hidden} bind:activeTab />
	<Footer />
</div>

<style>
	div {
		font-family: Arial, sans-serif;
		width: 512px;
		max-height: 768px;
		margin: 0;
		padding: 10px;
		box-sizing: border-box;
		overflow-y: auto;
		background-color: #131313;
	}

	::-webkit-scrollbar {
		width: 0.5em;
	}

	::-webkit-scrollbar-thumb:hover {
		background: rgb(31, 31, 31);
	}

	::-webkit-scrollbar-track {
		background: #131313;
	}

	::-webkit-scrollbar-thumb {
		background: #313131;
	}

	@supports not selector(::-webkit-scrollbar) {
		* {
			scrollbar-color: #0081ff transparent;
		}
	}
</style>
