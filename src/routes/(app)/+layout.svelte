<script lang="ts">
    import "../../app.css";
</script>

<div class="center">
    <div>
        <slot/>
        <div class="footer">
            <a href="/privacy" data-sveltekit-preload-data>Privacy</a>
            <a href="/terms" data-sveltekit-preload-data>Terms of Service</a>
        </div>
    </div>
</div>

<style>
    .center {
        display: flex;
        justify-content: center;
    }

    .center > div {
        width: 768px;
    }

    @media (max-width: 768px) {
        .center > div {
            width: 100%;
        }
    }

    .footer {
        display: flex;
        justify-content: space-evenly;
        margin-top: 5rem;
        padding: 0 2rem;
    }
</style>