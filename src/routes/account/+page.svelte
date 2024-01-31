<script lang="ts">
	export let data;
	import DataTable from './data-table.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { ShieldCheck, ShieldQuestion } from 'lucide-svelte';
</script>

<div class="container mx-auto grid gap-5 py-10">
	<Card.Root>
		<Card.Header>
			<Card.Title>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{data.user.name}
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>{data.user.username}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</Card.Title>
			<Card.Description>
				<p class="flex items-center gap-2">
					{#if data.user.verified}
						<ShieldCheck /> Verified
					{:else}
						<ShieldQuestion /> Not verified
					{/if}
				</p>
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>User since: {new Date(data.user.created).toLocaleDateString()}</p>
		</Card.Content>
		<Card.Footer></Card.Footer>
	</Card.Root>

	<DataTable orders={data.orders} />
</div>
