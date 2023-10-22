<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { showError, showInfo } from '$lib/components/notification';
	import { getLocaleValue, type GuildYellowPage } from '$lib/types';
	import { fade, scale } from 'svelte/transition';
	import LoadingIcon from './LoadingIcon.svelte';
	import NavBar from './NavBar.svelte';
	import TelephoneIcon from './TelephoneIcon.svelte';

	export let entries: GuildYellowPage[] = [];
	export let page: number = 0;
	export let totalPages: number = 0;
	let loading = false;

	beforeNavigate(e => {
		if (e.to?.route?.id === e.from?.route?.id)
			loading = true;
	});
	afterNavigate(() => {
		loading = false;
	});

	function asPhoneNumber(id: string) {
		const builder = id.split('').reverse();
		for (let i = 4; i < builder.length; i += 5) {
			builder.splice(i, 0, ' ');
		}
		builder.push('+');
		return builder.reverse().join('');
	}

	function asIconUrl(id: string, icon: string | null) {
		return `https://cdn.discordapp.com/icons/${id}/${icon}.${
			icon?.startsWith('a_') ? 'gif' : 'png'
		}?size=64`;
	}

	function copyNumber(id: string) {
		if (!navigator.clipboard) {
            showError("Your browser does not support clipboard copying!");
            return;
        }
        navigator.clipboard.writeText(asPhoneNumber(id)).then(() => {
            showInfo("Number copied to clipboard!");
        }, e => {
            showError("Failed to copy number to clipboard!");
            throw e;
        });
	}
</script>

<div class="flex justify-center m-1 mt-1">
	<div class="bg-edge max-lg:hidden rounded-l-lg p-2 flex flex-col-reverse justify-center border-l-8 border-black border-opacity-10 z-10 shadow-xl">
		<TelephoneIcon />
		<p>Telephone</p>
	</div>
	<div class="bg p-2 rounded-lg lg:rounded-l-none border-stone-800 w-full max-w-2xl relative shadow-xl">
		<div id="navbar">
			<NavBar {page} {totalPages} on:flip />
		</div>
		{#key entries}
			<div class="overflow-y-auto p-1" style="height: 712px;" in:fade={{ duration: 400 }}>
				<table class="list w-full [&_p]:max-md:text-xs [&_td]:max-md:text-xs [&_*]:text-gray-800 [&_p]:font-mono [&_td]:font-mono">
					<colgroup>
						<col>
						<col class="w-1/2">
						<col>
						<col>
					</colgroup>
					<tr class="border-b border-gray-400">
						<td></td>
						<td>
							<p class="mx-1">Name</p>
						</td>
						<td></td>
						<td class="border-l border-gray-400">
							<p class="mx-2">Number</p>
						</td>
						<td></td>
					</tr>
					{#each entries as entry}
						<tr class="border-b border-gray-400">
							<td class="pl-1 min-w-7">
								{#if entry.icon}
									<img src={asIconUrl(entry.id, entry.icon)} alt="?" class="rounded-full w-5 h-5" />
								{:else}
									<div></div>
								{/if}
							</td>
							<td class="whitespace-nowrap text-ellipsis overflow-hidden max-w-0">
								{entry.name}
							</td>
							<td>
								<span class="fi fi-{getLocaleValue(entry.locale).a2c} fis rounded-full mr-1" />
							</td>
							<td class="border-l border-gray-400 group hover:bg-white hover:bg-opacity-50 active:bg-opacity-25 duration-100">
								<button class="transparent flex flex-row justify-between place-items-center w-full"
									on:click={() => copyNumber(entry.id)}>

									<p class="mx-2">{asPhoneNumber(entry.id)}</p>
									<i class="max-lg:hidden fa-solid fa-copy pr-2 opacity-0 group-hover:opacity-25 group-active:opacity-25 duration-100"></i>
								</button>
							</td>
						</tr>
					{/each}
				</table>
			</div>
		{/key}
		{#if loading}
			<div class="absolute top-10 left-2 bottom-10 right-2 bg-black bg-opacity-20 rounded-lg" id="loading-bg" out:fade={{ duration: 400 }}>
				<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" out:scale={{ duration: 400 }}>
					<LoadingIcon />
				</div>
			</div>
		{/if}
		<NavBar {page} {totalPages} bottom on:flip />
	</div>
</div>

<style>
	.list > * {
		height: 32px;
	}

	.list > :nth-child(2n+1):not(:first-child) {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.list > :last-child {
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

	@media not all and (max-height: 910px) {
		#navbar {
			display: none;
		}

		#loading-bg {
			top: 0.5rem;
		}
	}
</style>
