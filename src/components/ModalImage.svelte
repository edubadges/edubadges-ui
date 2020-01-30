<script>
    export let src;
    export let alt;
    import closeIcon from "../icons/close_smll.svg";

    let isModalActive = false;

    const cancel = () => isModalActive = false;
    const toggle = () => isModalActive  = !isModalActive;
    const handle_keydown = e => {
        if (e.key === "Escape") {
            cancel();
        }
    };

</script>
<svelte:window on:keydown={handle_keydown}/>

{#if isModalActive}
    <div class="modal" role="dialog" aria-modal="true" on:click={cancel}>
        <span href="/close" class="cancel" on:click|preventDefault|stopPropagation={cancel}>
            {@html closeIcon}
        </span>
        <img class="full" {src} alt={alt} on:click={toggle}/>
    </div>
{:else}
    <img {src} alt={alt} on:click={toggle}/>
{/if}

<style>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 57, 128, 0.8);
        z-index: 999;
        display: flex;
    }

    img {
        cursor: pointer;
        margin: auto;
        max-height: 95vh;
    }

    img:not(.full):hover {
        opacity: 0.8;
    }

    img.full {
        animation-name: zoom;
        animation-duration: 0.6s;
    }

    @keyframes zoom {
        from {
            transform: scale(0)
        }
        to {
            transform: scale(1)
        }
    }

    span.cancel {
        text-decoration: none;
        position: absolute;
        right: 15px;
        top: 15px;
        cursor: pointer;
    }

    :global(span.cancel svg) {
        fill: white;
        width: 40px;
    }
</style>
