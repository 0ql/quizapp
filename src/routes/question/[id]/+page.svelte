<script lang="ts">
	import type { Questions } from "@prisma/client";

	export let data: Questions;

	let statusText = "";

	const del = async () => {
		const res = await fetch(document.URL + "/delete", {
			method: "DELETE",
		});
		statusText = res.statusText;
	};
	const update = async () => {
		const res = await fetch(document.URL + "/update", {
			method: "PUT",
			body: JSON.stringify(data),
		});
		statusText = res.statusText;
	};
</script>

<nav class="flex justify-between items-center">
	<h1 class="text-5xl"><a href="/">{data.questionString}</a></h1>
	<button class="border-none text-4xl i-heroicons:trash" on:click={del} />
</nav>

{statusText}
{#if data.type === 0}
	<h2>Multiple Choise</h2>
	<div class="grid grid-cols-2 gap-4">
		<input bind:value={data.correct} />
		<input bind:value={data.option2} />
		<input bind:value={data.option3} />
		<input bind:value={data.option4} />
	</div>
	<button on:click={update} class="w-full mt-4">Update</button>
{/if}
