<script lang="ts">
	import type { Topics } from "@prisma/client";
	import type { PageData } from "./$types";

	export let data: PageData;

	let topicstatus = "";

	const newTopic = {
		name: "",
	};

	const createTopic = async () => {
		const res = await fetch("/topic/create", {
			method: "POST",
			body: JSON.stringify(newTopic),
		});
		topicstatus = res.statusText;
		const jsn: Topics = await res.json();
		data.topics.push(jsn);
		data = data;
	};
</script>

<h1>Quiz App</h1>
<h2>Create a Topic</h2>
{topicstatus}
<input placeholder="Enter name" class="w-full" bind:value={newTopic.name} />
<button class="w-full mt-4" on:click={createTopic}>Create</button>
<h2>Topics</h2>
<ul>
	{#each data.topics as topic}
		<li><a class="block" href={"/topic/" + topic.id}>{topic.name}</a></li>
	{/each}
</ul>
