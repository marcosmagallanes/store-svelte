<script>
	import { PlusSquare } from 'lucide-svelte';

	/** @type {import('./$types').PageServerData} */
	export let data;
</script>

<section class="prose">
	<h1>Featured Items</h1>
</section>
<section>
	<ol class="grid grid-cols-2 gap-5">
		{#each data.items as item}
			<li class="grid gap-1">
				<div class="relative">
					<img
						src={`https://store-pocketbase.fly.dev/api/files/${item.collectionId}/${item.id}/${item.imageURL}?thumb=300x300`}
						alt={item.name}
						class="h-full w-full rounded-lg"
					/>
					<button
						class="absolute bottom-4 right-4 rounded border-2 border-stone-300 bg-white p-2 shadow-2xl hover:bg-stone-100"
						><PlusSquare /></button
					>
				</div>
				<span class="text-2xl font-bold">{item.name}</span>
				<span class="text-sm italic text-stone-600">{item.expand.categoryID.name}</span>
			</li>
		{/each}
	</ol>
</section>
