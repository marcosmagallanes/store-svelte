<script>
	export let data;
</script>

{#if !data.user}
	<h1>Please log in :I</h1>
{:else}
	<p>{data.user.name}</p>
	<p>{data.user.username}</p>
	<p>verified: {data.user.verified}</p>

	<p>account created: {new Date(data.user.created).toLocaleDateString()}</p>
{/if}
