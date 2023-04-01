<script lang="ts">
    import type { PageData } from './$types';
    import { goto } from "$app/navigation";
	import Search from './Search.svelte';
	import Book from './Book.svelte';
	import type { DiscordLocale } from '$lib/types';
	import Footer from '$lib/components/Footer.svelte';

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
<div class="footer">
    <Footer/>
</div>

<style>
    .bg {
        background: rgb(234,138,8);
        background: linear-gradient(0deg, rgb(234, 155, 8) 0%, rgb(234, 188, 8) 80%);
    }

    .footer {
        background: rgb(214, 142, 8);
    }
</style>