<script lang="ts">
    import type { PageData } from './$types';
    import { goto } from "$app/navigation";
	import Search from './Search.svelte';
	import Book from './Book.svelte';
	import type { DiscordLocale } from '$lib/types';

    export let data: PageData;


    function search(query: string | null, locale: DiscordLocale | null, count: number = 0) {
        const params = new URLSearchParams();
        if (query != null && query != "")
            params.set("q", query);

        const page = data.page + count;
        if (page != 0)
            params.set("p", page.toString());
        
        if (locale != null)
            params.set("locale", locale);
        goto(`?${params.toString()}`);
    }
</script>

<svelte:head>
    <title>Yellow Pages</title>
</svelte:head>

<div class="bg min-h-screen p-1 pb-10">
    <div class="p-2">
        <h1 class="my-0 text-4xl text-center font-extrabold">Yellow Pages</h1>
    </div>
    <div class="flex justify-center">
        <Search query={data.query} locale={data.locale} on:search={e => search(e.detail.query, e.detail.locale)}/>
    </div>
    <Book entries={data.yellowPages} page={data.page} totalPages={data.totalPages} on:flip={e => search(data.query, data.locale, e.detail)}/>
</div>
<div class="p-5 flex justify-center" style="background: rgb(189, 129, 0);">
    <div class="w-full max-w-lg flex justify-evenly [&_a]:text-center">
        <a href="/privacy" data-sveltekit-preload-data>Privacy</a>
        <a href="/yellow-pages" data-sveltekit-preload-data>Yellow Pages</a>
        <a href="/terms" data-sveltekit-preload-data>Terms of Service</a>
    </div>
</div>

<style>
    .bg {
        background: rgb(234,138,8);
        background: linear-gradient(0deg, rgb(234, 155, 8) 0%, rgb(234, 188, 8) 80%);
    }
</style>