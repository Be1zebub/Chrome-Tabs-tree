<script>
	import Tab from "$components/tab.svelte"
	import TabsGroup from "$components/tabs-group.svelte"

	export let tabs = []
	export let hidden = {}
	export let activeTab = null

	let computedTabs = []

	$: {
		let newComputedTabs = []

		tabs.forEach((tab, i) => {
			if (hidden[tab.id]) {
				return
			}

			tab.GetGroup().then((group) => {
				const tabData = {
					type: "tab",
					id: tab.id,
					data: tab,
				}

				if (group === null) {
					newComputedTabs.push(tabData)
				} else {
					let tabsGroup = newComputedTabs.find((info) => {
						return info.type == "group" && tab.groupId == info.id
					})

					if (!tabsGroup) {
						tabsGroup = {
							type: "group",
							id: tab.groupId,
							data: {
								group: group,
								tabs: [],
							},
						}

						newComputedTabs.push(tabsGroup)
					}

					tabsGroup.data.tabs.push(tabData)
				}

				if (i == tabs.length - 1) {
					computedTabs = newComputedTabs
					// console.log("computedTabs = ", JSON.stringify(computedTabs, null, 2))
				}
			})
		})
	}
</script>

<ul>
	{#each computedTabs as info}
		{#if info.type == "tab"}
			<Tab tab={info.data} bind:activeTab />
		{:else}
			<TabsGroup group={info.data.group} tabs={info.data.tabs} bind:activeTab />
		{/if}
	{/each}
</ul>

<style>
	ul {
		list-style-type: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin: 0;
		padding-bottom: 8px;
	}
</style>
