<script>
	import Tab from "$components/tab.svelte"

	export let group = {}
	export let tabs = []

	function click() {
		group.SetCollapsed(!group.IsCollapsed())
	}

	console.log("group tabs", tabs[0].data)
</script>

<li>
	<button style="color: {group.GetColor()};" on:click={click}>
		{group.GetTitle()}
	</button>
	{#if !group.IsCollapsed()}
		<ul>
			{#each tabs as tab}
				<Tab tab={tab.data} />
			{/each}
		</ul>
	{/if}
</li>
