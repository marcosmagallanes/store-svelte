<script>
	import * as Card from '$lib/components/ui/card';
	import { Button } from '@/components/ui/button';
	import { Plus } from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge';

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
				<Card.Root>
					<Card.Header>
						<span class="text-2xl font-bold">{item.name}</span>
					</Card.Header>
					<Card.Content class="relative">
						<img
							src={`https://store-pocketbase.fly.dev/api/files/${item.collectionId}/${item.id}/${item.imageURL}?thumb=300x300`}
							alt={item.name}
							class="rounded"
						/>
					</Card.Content>
					<Card.Footer class="flex justify-between">
						<Badge variant="outline">{item?.expand?.categoryID.name}</Badge>
						<Button size="sm" variant="outline"><Plus /></Button>
					</Card.Footer>
				</Card.Root>
			</li>
		{/each}
	</ol>
</section>
