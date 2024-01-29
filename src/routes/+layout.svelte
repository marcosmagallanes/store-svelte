<script>
	import { fade } from 'svelte/transition';
	import '../app.css';
	import { User, LogOut, ShoppingBasket, Menu, Home } from 'lucide-svelte';

	let isMenuOpen = false;

	export let data;
	console.log(data);
</script>

<nav class="relative mb-5 flex items-center justify-between bg-stone-300 px-5 py-3">
	<ul>
		<a class="rounded-button" href="/"><Home /></a>
	</ul>
	<ul>
		{#if !data.user}
			<a href="/auth" class="rounded-button"><User /></a>
		{:else}
			<a href="/cart" class="rounded-button"><ShoppingBasket /></a>
			<button on:click|preventDefault={() => (isMenuOpen = !isMenuOpen)} class="rounded-button"
				><User /></button
			>
		{/if}
	</ul>
	{#if data.user}
		{#if isMenuOpen}
			<ol transition:fade={{ duration: 100 }}>
				<li>{data.user.name}</li>
				<hr />
				<li><a href="/account">account</a></li>
				<li><a href="/orders">orders</a></li>
				<li><form action="/logout" method="post"><button type="submit">logout</button></form></li>
			</ol>
		{/if}
	{/if}
</nav>
<main class="flex flex-col gap-5 p-5">
	<slot />
</main>

<style lang="postcss">
	ul {
		@apply flex items-center gap-3;
	}
	ol {
		@apply absolute right-5 top-20 z-10 grid gap-1 rounded border-2 border-black bg-gray-300 px-3 py-1;
	}
	.rounded-button {
		@apply rounded-md border-2 border-gray-700 px-3 py-2;
	}
</style>
