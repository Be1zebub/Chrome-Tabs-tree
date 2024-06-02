<script>
	import Tab from "$components/tab.svelte"
	import TabsGroup from "$components/tabs-group.svelte"

	export let tabs = []
	export let hidden = {}

	let computedTabs = []
	$: {
		computedTabs = []

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
					computedTabs.push(tabData)
				} else {
					let tabsGroup = computedTabs.find((info) => {
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
						computedTabs.push(tabsGroup)
					}

					tabsGroup.data.tabs.push(tabData)
				}

				if (i == tabs.length - 1) {
					console.log("computedTabs = ", JSON.stringify(computedTabs, null, 2))
				}
			})
		})
	}
</script>

<ul>
	{#each computedTabs as info}
		{#if info.type == "tab"}
			<Tab tab={info.data} />
		{:else}
			<TabsGroup group={info.data.group} tabs={info.data.tabs} />
		{/if}
	{/each}
</ul>

<style>
</style>
