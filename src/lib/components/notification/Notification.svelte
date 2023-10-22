<script lang="ts">
	import { onMount } from "svelte";
    import type { Notification } from ".";

    export let notification: Notification;
    let scale = 1;
    onMount(() => {
        scale = 0; // trigger the transition
    });
</script>

<span class="text-white">
    {#if notification.html}
        {@html notification.message}
    {:else}
        {notification.message}
    {/if}
</span>
<div class="progress" style:transition-duration="{notification.duration}ms" style:transform="scale({scale}, 1)">

</div>

<style>
    .progress {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 4px;
        border-radius: 2px;
        background-color: #ffffff79;
        transition-timing-function: linear;
        transform-origin: top left;
    }
</style>