<script lang="ts">
	import { login, signup } from '$lib/pocketbase';
	import { fly } from 'svelte/transition';
	import { cubicOut, cubicIn } from 'svelte/easing';
	import { ArrowLeft } from 'lucide-svelte';

	let isSignUp = false;
</script>

{#if isSignUp}
	<form
		in:fly={{ easing: cubicOut, y: -10, duration: 300, delay: 400 }}
		out:fly={{ easing: cubicIn, y: 10, duration: 300 }}
		method="POST"
		on:submit|preventDefault={(e) => signup(e.currentTarget)}
		class="sticky grid place-items-center gap-3 *:w-1/2"
	>
		<label class="flex flex-col">
			<span class="text-sm">Email</span>
			<input id="email" type="email" placeholder="Email" />
		</label>

		<label class="flex flex-col">
			<span class="text-sm">Full Name</span>
			<input id="fullname" type="text" placeholder="Full Name" />
		</label>
		<label class="flex flex-col">
			<span class="text-sm">Password</span>
			<input id="password" type="password" placeholder="Password" />
		</label>
		<label class="flex flex-col">
			<span class="text-sm">Confirm Password</span>
			<input id="confirmPassword" type="password" placeholder="Confirm Password" />
		</label>
		<div class="flex gap-3">
			<button on:click={() => (isSignUp = !isSignUp)} class="rounded bg-stone-700 p-3 text-white"
				><ArrowLeft /></button
			>
			<button class="grow rounded bg-stone-700 p-3 text-white">Sign Up</button>
		</div>
	</form>
{:else}
	<form
		in:fly={{ easing: cubicOut, y: -10, duration: 300, delay: 400 }}
		out:fly={{ easing: cubicIn, y: 10, duration: 300 }}
		method="POST"
		on:submit|preventDefault={(e) => login(e.currentTarget)}
		class="sticky grid place-items-center gap-3 *:w-1/2"
	>
		<label class="flex flex-col">
			<span class="text-sm">Email</span>
			<input id="email" type="email" placeholder="Email" />
		</label>
		<label class="flex flex-col">
			<span class="text-sm">Password</span>
			<input id="password" type="password" placeholder="Password" />
		</label>
		<button class="rounded bg-stone-700 p-3 text-white">Login</button>
		<hr />
		<span class="text-center"
			>Don't have an account? <button class="text-stone-400" on:click={() => (isSignUp = !isSignUp)}
				>Sign Up</button
			></span
		>
	</form>
{/if}
