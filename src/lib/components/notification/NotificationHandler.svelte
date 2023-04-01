<script lang="ts">
	import { flip } from "svelte/animate";
	import { fly } from "svelte/transition";
    import { backOut, circIn } from "svelte/easing";
    import { notifications } from ".";
	import Notification from "./Notification.svelte";

</script>

<div class="fixed right-0 m-4 z-50 top-0 pointer-events-none">
    {#each $notifications as notification (notification)}
        <div class="w-screen flex flex-row-reverse" animate:flip={{duration: 250}}>
            <div class="notification {notification.type}"
                style="max-width: 90vw;"
                in:fly={{x: 100, duration: 500, easing: backOut}} 
                out:fly={{x: 100, duration: 250, easing: circIn}}>
                <Notification {notification}/>
            </div>
        </div>
    {/each}
</div>

<style>
    .notification {
        @apply relative border-2 border-black border-opacity-20 rounded-sm mb-1 p-1 pb-2 min-w-45 w-fit max-w-md pointer-events-auto;
        background-color: #5b6cca;
    }

    .notification.error {
        background-color: #ff5c5c;
    }

    .notification.info {
        background-color: #5b6cca;
    }
</style>