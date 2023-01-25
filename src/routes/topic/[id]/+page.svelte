<script lang="ts">
	import type { Questions } from "@prisma/client";

	export let data: any;
	let status = "";
	let quiz: Questions[];
	let quizStatus = {
		index: 0,
	};
	let options = ["correct", "option2", "option3", "option4"];
	let renderQuiz = false;

	const newQuestion = {
		topicid: data.id,
		questionString: "",
		type: "0",
		correct: "",
		option2: "",
		option3: "",
		option4: "",
	};
	const filerQuiz = {
		amount: data.questions.length,
		type: "0",
	};
	const createQuestion = async () => {
		const res = await fetch(document.URL + "/createQuestion", {
			method: "POST",
			body: JSON.stringify(newQuestion),
		});
		status = res.statusText;
	};
	const del = async () => {
		const res = await fetch(document.URL + "/delete", {
			method: "DELETE",
		});
		status = res.statusText;
	};
	const startQuiz = async () => {
		quiz = await (
			await fetch(document.URL + "/generateQuiz", {
				method: "POST",
				body: JSON.stringify(filerQuiz),
			})
		).json();
		renderQuiz = true;
		console.log(quiz);
	};
	const nextQ = () => {
		setTimeout(() => {
			if (quizStatus.index < quiz.length - 1) quizStatus.index++;
			else {
				renderQuiz = false;
				quizStatus.index = 0;
			}
			options = options.sort((a, b) => 0.5 - Math.random());
		}, 1000);
	};
</script>

<nav class="flex justify-between items-center">
	<h1 class="text-5xl"><a href="/">{data.name}</a></h1>
	<button class="border-none text-4xl i-heroicons:trash" on:click={del} />
</nav>

<h2>Create a Question</h2>
{status}
<input
	placeholder="Question"
	class="block w-full mb-4"
	bind:value={newQuestion.questionString}
/>
<select class="block w-full" bind:value={newQuestion.type}>
	<option value="0">Multiple Choise</option>
	<option value="1">Exact</option>
</select>
{#if newQuestion.type === "0"}
	<h2>Add Answers</h2>
	<div class="grid grid-cols-2 gap-4">
		<input placeholder="Correct Answer" bind:value={newQuestion.correct} />
		<input placeholder="1. Wrong Answer" bind:value={newQuestion.option2} />
		<input placeholder="2. Wrong Answer" bind:value={newQuestion.option3} />
		<input placeholder="3. Wrong Answer" bind:value={newQuestion.option4} />
	</div>
{/if}
<button class="w-full mt-4" on:click={createQuestion}>Create</button>

<h2>Questions for this topic:</h2>
<ul>
	{#each data.questions as question}
		<li>
			<a class="block" href="/question/{question.id}"
				>{question.questionString}</a
			>
		</li>
	{/each}
</ul>

<h2>Do a Quiz</h2>
<select class="w-full" bind:value={filerQuiz.type}>
	<option value="0">Multiple Choise</option>
	<option value="1">Exact</option>
</select>
<input class="w-full mt-4" bind:value={filerQuiz.amount} type="number" />
<button class="w-full mt-4" on:click={startQuiz}>Start</button>

{#if renderQuiz}
	<h2>Quiz</h2>
	<div>{quiz[quizStatus.index].questionString}</div>
	<div class="grid grid-cols-2 gap-4">
		{#if quiz[quizStatus.index].type === 0}
			{#each options as option}
				<button
					on:click={nextQ}
					class={option === "correct" ? "active:bg-green" : "active:bg-red"}
					>{quiz[quizStatus.index][option]}</button
				>
			{/each}
		{/if}
	</div>
{/if}
