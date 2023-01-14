<script lang="ts">
    import "../app.css";
</script>

<div class="center">
    <div>
        <slot/>
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
</style>