<script lang="ts">
	import { createEventDispatcher } from "svelte";

    export let page: number
    export let totalPages: number

    export let bottom = false

    const dispatch = createEventDispatcher<{flip: number}>();
</script>

<div class="flex justify-between" class:mt-2={bottom} class:mb-2={!bottom}>
    <div>
        <button on:click={() => dispatch("flip", -page)} class="transparent group rounded-full hover:bg-opacity-20 hover:bg-black duration-150 disabled:bg-transparent disabled:cursor-default" disabled={page <= 0}>
            <i class="fa-solid fa-angles-left text-stone-800 mx-2 group-disabled:text-stone-400"></i>
        </button>
        <button on:click={() => dispatch("flip", -1)} class="transparent group rounded-full hover:bg-opacity-20 hover:bg-black duration-150 disabled:bg-transparent disabled:cursor-default" disabled={page <= 0}>
            <i class="fa-solid fa-angle-left text-stone-800 mx-2 group-disabled:text-stone-400"></i>
        </button>
    </div>
    <p class="text-stone-800 font-mono">Page {totalPages == 0 ? 0 : page+1}/{totalPages}</p>
    <div>
        <button on:click={() => dispatch("flip", 1)} class="transparent group rounded-full hover:bg-opacity-20 hover:bg-black duration-150 disabled:bg-transparent disabled:cursor-default" disabled={page >= totalPages - 1}>
            <i class="fa-solid fa-angle-right text-stone-800 mx-2 group-disabled:text-stone-400"></i>
        </button>
        <button on:click={() => dispatch("flip", totalPages - page - 1)} class="transparent group rounded-full hover:bg-opacity-20 hover:bg-black duration-150 disabled:bg-transparent disabled:cursor-default" disabled={page >= totalPages - 1}>
            <i class="fa-solid fa-angles-right text-stone-800 mx-2 group-disabled:text-stone-400"></i>
        </button>
    </div>
</div>