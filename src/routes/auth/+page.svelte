<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut, cubicIn } from 'svelte/easing';
	import { ArrowLeft } from 'lucide-svelte';

	import { Input } from '$lib/components/ui/Input';
	import { Label } from '$lib/components/ui/Label';
	import { Button } from '$lib/components/ui/button';

	import { buttonVariants } from '$lib/components/ui/button';

	let isSignUp = false;
	let isForgotPassword = false;
	let noAccountButton = false;

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
	>
		<div>
			<Label for="email">Email</Label>
			<Input
				id="email"
				name="email"
				type="email"
				placeholder="Email"
				value="ahmed.mohsen@gmail.com"
			/>
		</div>
		<div>
			<Label for="name">Full Name</Label>
			<Input id="name" name="name" type="text" placeholder="Full Name" value="ahmed mohsen" />
		</div>
		<div>
			<Label for="password">Password</Label>
			<Input id="password" name="password" type="password" placeholder="Password" value="pewpew" />
		</div>
		<div>
			<Label for="passwordConfirm">Confirm Password</Label>
			<Input
				id="passwordConfirm"
				name="passwordConfirm"
				type="password"
				placeholder="Confirm Password"
				value="pewpew"
			/>
		</div>
		<div class="grid grid-cols-4 gap-3">
			<button
				class={`${buttonVariants({ variant: 'outline' })} col-span-1`}
				on:click|preventDefault={() => (isSignUp = !isSignUp)}><ArrowLeft /></button
			>
			<button class={`${buttonVariants({ variant: 'default' })} col-span-3`}>Sign Up</button>
		</div>
	</form>
{:else if !isForgotPassword}
	<form
		in:fly={{ easing: cubicOut, x: 20, duration: 300, delay: 300 }}
		out:fly={{ easing: cubicIn, x: -20, duration: 300 }}
		method="POST"
		action="?/login"
	>
		<div>
			<Label for="email">Email</Label>
			<Input id="email" name="email" type="email" placeholder="Email" />
		</div>
		<div>
			<Label for="password">Password</Label>
			<Input id="password" name="password" type="password" placeholder="Password" />
		</div>
		<div>
			<button class={buttonVariants({ variant: 'default' })}>Login</button>
			<button
				class={buttonVariants({ variant: 'outline' })}
				on:click|preventDefault={() => (isSignUp = !isSignUp)}>Sign Up</button
			>
			<hr />
			<button
				class={buttonVariants({ variant: 'ghost' })}
				on:click|preventDefault={() => (isForgotPassword = !isForgotPassword)}
				>Forgot Password?</button
			>
		</div>
	</form>
{:else}
	<form
		in:fly={{ easing: cubicOut, x: 20, duration: 300, delay: 300 }}
		out:fly={{ easing: cubicIn, x: -20, duration: 300 }}
		method="POST"
		action="?/reset"
	>
		<div>
			<Label>Email</Label>
			<Input name="email" type="email" placeholder="Email" />
		</div>
		<div class="grid grid-cols-4 gap-3">
			<button
				on:click|preventDefault={() => (isForgotPassword = !isForgotPassword)}
				class={`${buttonVariants({ variant: 'outline' })} col-span-1`}><ArrowLeft /></button
			>
			<button class={`${buttonVariants({ variant: 'default' })} col-span-3`}>Request Reset</button>
			{#if form?.success}
				<p class="form-success">Email sent. Click the link in your mailbox. Check spam.</p>
			{/if}
		</div>
	</form>
{/if}

<style lang="postcss">
	form {
		@apply sticky grid place-items-center gap-3;
	}
	form div {
		@apply grid w-full max-w-sm items-center gap-1.5;
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
