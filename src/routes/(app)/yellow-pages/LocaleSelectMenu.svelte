<script lang="ts">
	import { DiscordLocaleValues, getLocaleValue, type DiscordLocale } from "$lib/types";
	import { outsideClick } from "$lib/utils";
	import { createEventDispatcher } from "svelte";
	import { slide } from "svelte/transition";


    const dispatch = createEventDispatcher<{select: {locale: DiscordLocale | null}}>();
    export let locale: DiscordLocale | null = null;
    let open = false;

    function toggle() {
        open = !open;
    }

    function select(localeRaw: string | null) {
        locale = localeRaw as DiscordLocale | null;
        open = false;
        dispatch("select", { locale });
    }
</script>

<div class="relative" use:outsideClick={() => open = false}>
    <button class="px-2 h-full w-32 max-sm:w-24 duration-150 hover:bg-slate-300" on:click={toggle}>
        <div class="flex flex-row items-center justify-center">
            {#if locale}
                <div class="flex flex-row">
                    <div class="flex items-center mr-1">
                        <span class="fi fi-{getLocaleValue(locale).a2c} fis rounded-full"></span>
                    </div>
                    <p class="text-sm max-sm:text-xs text-gray-800 text-left">{getLocaleValue(locale).name}</p>
                </div>
            {:else}
                <p class="text-xl max-sm:text-base text-gray-400">Language</p>
            {/if}
            <i class="fa-solid fa-caret-down text-base text-gray-400 ml-2 duration-150" class:fa-rotate-180={open}></i>
        </div>
    </button>
    {#if open}
        <div class="absolute top-full left-0 right-0 bg-slate-200 shadow-lg rounded-b-lg max-h-32 overflow-y-scroll overflow-x-hidden z-50 [&_p]:text-left" transition:slide={{duration: 150}}>
            <button class="w-full h-full duration-150 p-1 hover:bg-slate-300 border-b border-gray-400 last:border-b-0" on:click={() => select(null)}>
                <p class="text-sm max-sm:text-xs m-0 text-gray-500 italic">Deselect</p>
            </button>
            {#each Object.entries(DiscordLocaleValues) as [key, value]}
                <button class="w-full h-full duration-150 p-1 hover:bg-slate-300 border-b border-gray-400 last:border-b-0 flex flex-row" on:click={() => select(key)}>
                    <div class="flex items-center mr-1">
                        <span class="fi fi-{value.a2c} fis rounded-full"></span>
                    </div>
                    <p class="text-sm max-sm:text-xs m-0 text-gray-800">
                        {value.name}
                    </p>
                </button>
            {/each}
        </div>
    {/if}
</div>