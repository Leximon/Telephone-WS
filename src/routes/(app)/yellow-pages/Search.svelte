<script lang="ts">
	import { browser } from "$app/environment";
	import { afterNavigate, beforeNavigate } from "$app/navigation";
	import type { DiscordLocale } from "$lib/types";
	import { createEventDispatcher } from "svelte";
	import LocaleSelectMenu from "./LocaleSelectMenu.svelte";


    const dispatch = createEventDispatcher<{search: {query: string | null, locale: DiscordLocale | null}}>();
    export let query: string | null = "";
    export let locale: DiscordLocale | null = null;
    let searchInput: HTMLInputElement;
    let newLocale = locale;
    
    let wasFocused = false;
    beforeNavigate(() => {
        if(browser)
            wasFocused = document.activeElement == searchInput
    });
    afterNavigate(() => {
        if (wasFocused)
            searchInput.focus();
    });

    function onLocaleSelect(e: CustomEvent<{locale: DiscordLocale | null}>) {
        newLocale = e.detail.locale;
        search();
    }

    function search() {
        dispatch("search", { 
            query: searchInput.value,
            locale: newLocale
        });
    }

    function onKeydown(e: KeyboardEvent) {
        if (e.key == "Enter")
            search();
    }
</script>

<div class="bg-slate-200 m-2 rounded-lg text-gray-800 flex flex-row justify-center max-w-full">
    <input type="text"
        class="bg-transparent border-none outline-none p-0 m-2 text-xl max-sm:text-base text-gray-800 placeholder:text-gray-400 w-full"
        placeholder="Search..."
        bind:this={searchInput}
        value={query}
        on:keydown={onKeydown}>
    <div class="w-px h-full py-1"><div class="w-px h-full bg-gray-400"></div></div>

    <LocaleSelectMenu {locale} on:select={onLocaleSelect}/>
    <div class="w-px h-full py-1"><div class="w-px h-full bg-gray-400"></div></div>

    <button on:click={search} class="w-12 h-12 duration-150 hover:bg-slate-300 rounded-r-lg">
        <i class="fa-solid fa-magnifying-glass text-gray-800 text-2xl mx-2"></i>
    </button>
</div>