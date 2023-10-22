<script lang="ts">
    import { page } from "$app/stores";
</script>

<div class="h-screen flex flex-col justify-center">
    <h1>Error</h1>
    <p>{$page.status}: {$page.error?.message ?? "Unknown"}</p>
</div>

<style>
    h1 {
        font-size: 3rem;
        font-weight: bold;
        margin: 0;
        padding: 0;
        text-align: center;
        color: #ff5555;
    }

    p {
        font-size: 2rem;
        font-weight: bold;
        margin: 0;
        padding: 0;
        text-align: center;
        color: #ff5555;
    }
</style>