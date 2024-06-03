<script>
	import Tab from "$components/tab.svelte"

	export let group = {}
	export let tabs = []
	export let activeTab = null

	let collapsed = group.IsCollapsed()

	function click() {
		group.SetCollapsed(!group.IsCollapsed())
		collapsed = group.IsCollapsed()
	}
</script>

<li>
	<button style="background-color: {group.GetColor()};" on:click={click}>
		{group.GetTitle()}
	</button>
	{#if !collapsed}
		<ul>
			{#each tabs as tab}
				<Tab tab={tab.data} bind:activeTab />
			{/each}
		</ul>
	{/if}
</li>

<style>
	li {
		background: none;
		border-width: 0;
		padding: 0;
		margin-top: 12px;
	}

	li > button {
		font-size: 12px;
		font-weight: 500;
		color: rgb(32, 33, 36);
		border-radius: 5px;
		border-style: none;
		padding: 6px;
		cursor: pointer;
	}

	ul {
		list-style-type: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding-left: 16px;
		margin-top: 16px;
		border-left-width: 1px;
		border-left-color: #585858;
		border-left-style: solid;
	}
</style>
