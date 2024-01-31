<script>
	import '../app.pcss';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';

	import { User, LogOut, ShoppingBasket, Menu, Home } from 'lucide-svelte';

	function logout() {
		fetch('/logout', {
			method: 'POST',
			redirect: 'manual'
		}).then((response) => {
			if (response.type == 'opaqueredirect') {
				window.location.replace('/auth');
				return;
			}
		});
	}

	let isMenuOpen = false;
	let isCartOpen = false;
	export let data;
</script>

<nav class="relative m-5 flex items-center justify-between rounded-md bg-zinc-800 px-5 py-3">
	<ul>
		<Button variant="outline" href="/"><Home /></Button>
	</ul>
	<ul>
		{#if !data.user}
			<Button variant="outline" href="/auth"><User /></Button>
		{:else}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button variant="outline" on:click={() => (isCartOpen = !isCartOpen)} builders={[builder]}
						><ShoppingBasket /></Button
					>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content sideOffset={16} class="w-fit">
					<DropdownMenu.Group>
						<DropdownMenu.Label>Cart</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item href="/account">Account</DropdownMenu.Item>
						<DropdownMenu.Item on:click={() => logout()}>Logout</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>

			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button variant="outline" on:click={() => (isMenuOpen = !isMenuOpen)} builders={[builder]}
						><User /></Button
					>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end" sideOffset={16} class="w-fit">
					<DropdownMenu.Group>
						<DropdownMenu.Label class="capitalize">{data.user.name}</DropdownMenu.Label>
						<DropdownMenu.Separator />
					</DropdownMenu.Group>
					<DropdownMenu.Group>
						<DropdownMenu.Item href="/account">Account</DropdownMenu.Item>
						<DropdownMenu.Item on:click={() => logout()}>Logout</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{/if}
	</ul>
</nav>
<main class="flex flex-col gap-5 p-5">
	<slot />
</main>

<style lang="postcss">
	ul {
		@apply flex items-center gap-3;
	}
</style>
