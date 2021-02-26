<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	export let error;

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);
</script>

<style>
	button {
		background: none;
		border: none;
		border-bottom: 2px solid white;
		border-radius: 0;
		margin: 0;
		color: #ccc;
		float: right;
	}
	
	.selected {
		border-bottom: 2px solid purple;
		color: #333;
	}

	.error {
		color: red;
	}
	
</style>
{#if error}
<button class:selected="{$selectedTab === tab}" on:click="{() => selectTab(tab)}">
	<div class="error">
		<slot></slot>
	</div>
</button>
{:else}
<button class:selected="{$selectedTab === tab}" on:click="{() => selectTab(tab)}">
	<slot></slot>
</button>
{/if}