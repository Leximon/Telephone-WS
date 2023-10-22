<script lang="ts">
    import Flip from "./Flip.svelte"
    import Centered from "$lib/components/Centered.svelte";
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";
    import NotificationHandler from "$lib/components/notification/NotificationHandler.svelte";
    import {showError, showInfo} from "$lib/components/notification";
    import type { PageData } from './$types';

    export let data: PageData

    if (browser) {
        newAudio(); // preload
    }

    let toggle1 = false;
    let toggle2 = false;
    let toggle3 = false;

    function handle(i) {
        if (!(toggle3 && toggle2 && toggle1))
            return;

        switch (i) {
            case 1:
                toggle2 = false;
                break;
            case 2:
                toggle3 = false;
                break;
            case 3:
                toggle1 = false;
                break;
        }

        let audio = newAudio();
        audio.play();

    }

    function newAudio(): HTMLAudioElement {
        let audio = new Audio("https://www.myinstants.com/media/sounds/vine-boom.mp3");
        audio.volume = 0.35;
        return audio;
    }

    let email = "";
    let invalidEmail = false;

    function submit() {
        if (!email.includes("@")) {
            showError("Please enter a valid email address!");
            invalidEmail = true;
            return;
        }

        showInfo("Thanks for taking your time to fill out this survey!<br>We will sell this data shortly and come back to you later!", 6000, true);
        goto("/");
    }
</script>

<Centered>
    <div>
        <h1 class="mt-10 mb-5">Gamer Survey</h1>
        <p class="text-gray-400 italic mb-5">
            This survey is anonymous. No data will be shared to any third party services.
        </p>
        <table>
            <tr>
                <td><p class="my-5 text-right mr-4">Email:</p></td>
                <td><input type="text" placeholder="example@mail.com" class:error={invalidEmail} bind:value={email} on:input={() => invalidEmail = false}></td>
            </tr>
            <tr>
                <td><Flip bind:enabled={toggle1} on:click={() => handle(1)}/></td>
                <td><p class="my-2">I have money</p></td>
            </tr>
            <tr>
                <td><Flip bind:enabled={toggle2} on:click={() => handle(2)}/></td>
                <td><p class="my-2">I play {data.game}</p></td>
            </tr>
            <tr>
                <td><Flip bind:enabled={toggle3} on:click={() => handle(3)}/></td>
                <td><p class="my-2">I don't have brain damage</p></td>
            </tr>
        </table>
        <div class="flex justify-end mt-5">
            <button class="green" on:click={submit}>Submit</button>
        </div>
    </div>
</Centered>

<style>

    input.error {
        border-color: red;
    }
</style>