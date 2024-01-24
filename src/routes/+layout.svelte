<script>
	import '../app.css';
	import { User, ShoppingBasket, Menu } from 'lucide-svelte';
</script>

<nav class="mb-5 flex items-center justify-between bg-stone-300 px-5 py-3">
	<ul>
		<a class="rounded-button" href="/"><Menu /></a>
	</ul>
	<ul>
		<a class="rounded-button" href="/login"><User /></a>
		<a href="/cart" class="rounded-button"><ShoppingBasket /></a>
	</ul>
</nav>
<main class="flex flex-col gap-5 p-5">
	<slot />
</main>

<style lang="postcss">
	ul {
		@apply flex items-center gap-3;
	}
	.rounded-button {
		@apply rounded-xl border-2 border-gray-700 px-3 py-2;
	}
</style>
