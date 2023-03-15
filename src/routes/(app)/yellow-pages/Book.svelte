<script lang="ts">
	import { afterNavigate, beforeNavigate } from "$app/navigation";
	import { getLocaleValue, type GuildYellowPage } from "$lib/types";
	import { createEventDispatcher } from "svelte";
	import { fade, scale } from "svelte/transition";
	import LoadingIcon from "./LoadingIcon.svelte";
	import TelephoneIcon from "./TelephoneIcon.svelte";

    const dispatch = createEventDispatcher<{flip: number}>();
    export let entries: GuildYellowPage[] = [];
    export let page: number = 0;
    export let totalPages: number = 0;
    let loading = false;

    beforeNavigate(() => {
        loading = true;
    });
    afterNavigate(() => {
        loading = false;
    });

    function asPhoneNumber(id: string) {
        const builder = id.split("").reverse();
        for (let i = 4; i < builder.length; i += 5) {
            builder.splice(i, 0, " ");
        }
        builder.push("+");
        return builder.reverse().join("");
    }

    function asIconUrl(id: string, icon: string) {
        return `https://cdn.discordapp.com/icons/${id}/${icon}.${icon.startsWith("a_") ? "gif" : "png"}?size=128`;
    }
</script>

<div class="flex justify-center m-1 mt-1">
    <div class="bg-edge max-lg:hidden rounded-l-lg p-2 flex flex-col-reverse justify-center border-l-8 border-black border-opacity-10 z-10 shadow-xl">
        <TelephoneIcon/>
        <p>Telephone</p>
    </div>
    <div class="bg p-2 rounded-lg lg:rounded-l-none border-stone-800 w-full max-w-2xl relative shadow-xl">
        <div class="overflow-y-auto p-1">
            {#key entries}
                <div class="list [&_p]:max-md:text-xs [&_*]:text-gray-800 [&_*]:font-mono [&>div]:flex [&>div]:items-center" in:fade={{duration: 400}}>
                    <div class="border-b border-gray-400"></div>
                    <div class="border-b border-gray-400">
                        <p class="mx-1">Name</p>
                    </div>
                    <div class="border-b border-l border-gray-400">
                        <p class="mx-2">Number</p>
                    </div>
                    {#each entries as entry}
                        <div class="flex justify-center items-center border-b border-gray-400">
                            <img src={asIconUrl(entry.id, entry.icon)} alt="?" class="rounded-full w-5 h-5">
                        </div>
                        <div class="border-b border-gray-400 flex-row justify-between">
                            <p class="mx-1 text-ellipsis whitespace-nowrap overflow-hidden max-w-xs">{entry.name}</p>
                            <div>
                                <span class="fi fi-{getLocaleValue(entry.locale).a2c} fis rounded-full mr-1"></span>
                            </div>
                        </div>
                        <div class="border-b border-l border-gray-400">
                            <p class="mx-2">{asPhoneNumber(entry.id)}</p>
                        </div>
                    {/each}
                </div>
            {/key}
        </div>
        {#if loading}
            <div class="absolute top-2 left-2 bottom-10 right-2 bg-black bg-opacity-20 rounded-lg" out:fade={{duration: 400}}>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" out:scale={{duration: 400}}>
                    <LoadingIcon/>
                </div>
            </div>
        {/if}
        <div class="flex justify-between mt-2">
            <button on:click={() => dispatch("flip", -1)} class="group rounded-full hover:bg-opacity-20 hover:bg-black duration-150 disabled:bg-transparent disabled:cursor-default" disabled={page <= 0}>
                <i class="fa-solid fa-angles-left text-stone-800 mx-2 group-disabled:text-stone-400"></i>
            </button>
            <p class="text-stone-800 font-mono">Page {totalPages == 0 ? 0 : page+1}/{totalPages}</p>
            <button on:click={() => dispatch("flip", 1)} class="group rounded-full hover:bg-opacity-20 hover:bg-black duration-150 disabled:bg-transparent disabled:cursor-default" disabled={page >= totalPages - 1}>
                <i class="fa-solid fa-angles-right text-stone-800 mx-2 group-disabled:text-stone-400"></i>
            </button>
        </div>
    </div>
</div>

<style>
    .list {
        display: grid;
        grid-template-columns: 32px 1fr 1fr;
        grid-template-rows: repeat(20, 1fr);
        align-content: space-between;
        height: 675px; /* 20*32px */
    }

    .list > :nth-last-child(-n+3) {
        border-bottom: none;
    }

    .bg {
        background: rgb(226, 232, 240);
        background: linear-gradient(-28deg, rgb(186, 199, 216) 0%, rgb(226, 232, 240) 50%);
    }

    .bg-edge {
        background: rgb(189, 129, 0);
        background: linear-gradient(-45deg, rgb(189, 129, 0) 0%, rgb(187, 137, 0) 100%);
    }

    .bg-edge p {
        writing-mode: vertical-rl;
        text-orientation: mixed;
        width: 64px;
        color: black;
        font-family: monospace;
        font-size: 64px;
        font-weight: bolder;
        opacity: 33%;
        transform: translateX(-20px) scale(-1, -1);
    }
</style>