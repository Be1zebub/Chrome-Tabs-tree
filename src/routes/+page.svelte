<script>
	import SearchBar from "$components/search-bar.svelte"
	import TabsList from "$components/tabs-list.svelte"
	import Footer from "$components/footer.svelte"
	import Api from "$lib/api/chrome.js"

	let tabs = []
	Api().then((api_tabs) => {
		tabs = api_tabs
	})

	let hidden = {}
</script>

<SearchBar {tabs} {hidden} />
<TabsList {tabs} {hidden} />
<Footer />
