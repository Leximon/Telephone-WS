<script>
    export let enabled = false;
</script>

<button on:click={() => enabled = !enabled} on:click class:enabled class="transparent">
    <div class="nub" class:enabled></div>
</button>

<style>
    button {
        background-color: #e01a1a;
        border-style: none;
        border-radius: 100px;
        width: 60px;
        height: 35px;
        margin: 0 20px 0 20px;
        padding: 3px;
        cursor: pointer;
        transition-duration: 300ms;
    }

    button.enabled {
        background-color: #16c716;
    }

    button .nub {
        background-color: white;
        border-radius: 50px;
        height: 25px;
        width: 25px;
        transform: translateX(2px);
        transition-duration: 300ms;
    }

    button .nub.enabled {
        transform: translateX(26px);
    }
</style>