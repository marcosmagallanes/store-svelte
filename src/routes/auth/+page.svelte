<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut, cubicIn } from 'svelte/easing';
	import { ArrowLeft } from 'lucide-svelte';

	let isSignUp = false;
	let isForgotPassword = false;

	export let form;
</script>

<div class="grid place-items-center *:w-1/2">
	{#if form?.error}
		<p class="form-error">Error: {form.error}</p>
	{:else if form?.success}
		<p class="form-success">Success!</p>
	{:else if form?.notVerified}
		<p class="form-error">You must verify your email before logging in.</p>
	{/if}
</div>

{#if isSignUp}
	<form
		in:fly={{ easing: cubicOut, x: 20, duration: 300, delay: 300 }}
		out:fly={{ easing: cubicIn, x: -20, duration: 300 }}
		method="POST"
		action="?/signup"
		class="sticky grid place-items-center gap-3 *:w-1/2"
	>
		<label>
			<span>Email</span>
			<input name="email" type="email" placeholder="Email" value="ahmed.mohsen@gmail.com" />
		</label>
		<label>
			<span>Full Name</span>
			<input name="name" type="text" placeholder="Full Name" value="ahmed mohsen" />
		</label>
		<label>
			<span>Password</span>
			<input name="password" type="password" placeholder="Password" value="pewpew" />
		</label>
		<label>
			<span>Confirm Password</span>
			<input name="passwordConfirm" type="password" placeholder="Confirm Password" value="pewpew" />
		</label>
		<div class="flex gap-3">
			<button on:click|preventDefault={() => (isSignUp = !isSignUp)} class="form-button"
				><ArrowLeft /></button
			>
			<button class="form-button grow">Sign Up</button>
		</div>
	</form>
{:else}
	<form
		in:fly={{ easing: cubicOut, x: 20, duration: 300, delay: 300 }}
		out:fly={{ easing: cubicIn, x: -20, duration: 300 }}
		method="POST"
		action="?/login"
		class="sticky grid place-items-center gap-3 *:w-1/2"
	>
		<label>
			<span>Email</span>
			<input name="email" type="email" placeholder="Email" />
		</label>
		{#if !isForgotPassword}
			<label>
				<span>Password</span>
				<input name="password" type="password" placeholder="Password" />
			</label>
			<button class="form-button">Login</button>
			<button on:click={() => (isForgotPassword = !isForgotPassword)} class="text-sm"
				>Forgot Password?</button
			>
		{:else}
			<div class="flex gap-3">
				<button
					on:click|preventDefault={() => (isForgotPassword = !isForgotPassword)}
					class="form-button"><ArrowLeft /></button
				>
				<button formaction="?/reset" class="form-button grow">Request Reset</button>
				{#if form?.success}
					<p class="form-success">Email sent. Click the link in your mailbox. Check spam.</p>
				{/if}
			</div>
		{/if}
		<hr />
		<span class="text-center"
			>Don't have an account? <button
				class="text-stone-400"
				on:click|preventDefault={() => (isSignUp = !isSignUp)}>Sign Up</button
			></span
		>
	</form>
{/if}

<style lang="postcss">
	label {
		@apply grid;
	}
	label span {
		@apply text-sm;
	}
	.form-button {
		@apply rounded bg-stone-700 p-3 text-white;
	}
	.form-success {
		@apply rounded border-2 border-green-500 bg-green-50 p-3 text-green-700;
	}
	.form-error {
		@apply rounded border-2 border-red-500 bg-red-50 p-3 text-red-500;
	}
</style>
