<script lang="ts">
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import type { RecordModel } from 'pocketbase';

	type Order = {
		id: string;
		created: string;
		updated: string;
		customerID: string;
		orderDate: string;
		totalAmount: number;
		status: string;
		orderItems: string;
	};

	export let orders: RecordModel[] = [];

	const table = createTable(readable(orders));

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: 'Order ID'
		}),
		table.column({
			accessor: 'created',
			header: 'Created',
			cell: ({ value }) => {
				const date = new Date(value);
				return date.toLocaleDateString();
			}
		}),
		table.column({
			accessor: 'updated',
			header: 'Updated',
			cell: ({ value }) => {
				const date = new Date(value);
				return date.toLocaleDateString();
			}
		}),
		table.column({
			accessor: 'status',
			header: 'Status'
		}),
		table.column({
			accessor: 'expand',
			header: 'Order Details',
			cell: ({ value }) => {
				return value.orderItems.map((item) => item.name).join(', ');
			}
		}),
		table.column({
			accessor: 'totalAmount',
			header: 'Total Amount',
			cell: ({ value }) => {
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD'
				}).format(value);
				return formatted;
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									{#if cell.id === 'totalAmount'}
										<div class="text-right font-medium">
											<Render of={cell.render()} />
										</div>
									{:else if cell.id === 'status'}
										<div class="uppercase">
											<Render of={cell.render()} />
										</div>
									{:else}
										<Render of={cell.render()} />
									{/if}
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
