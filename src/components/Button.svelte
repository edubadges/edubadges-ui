<script>
    export let className = "";
    export let active = false;
    export let href = "/";
    export let disabled = false;
    export let label;
    export let onClick;

    const handleLinkClick = e => e.key === " " && e.target.click();

</script>
<style>
    .button {
        background-color: #0077c8;
        border-radius: 8px;
        padding: 10px 20px;
        display: inline-block;
        color: white;
        text-decoration: none;
        cursor: pointer;
        text-align: center;
        font-weight: bold;
        width: 216px;
    }
    @media (max-width: 820px) {
        .button {
            width: 176px;
        }
    }
    .button:hover {
        background-color: #004c97;
        color: #94d6ff;
    }

    .button.active {
        background-color: #003980;
        order: 1;
        margin-left: 20px;
    }

    .button.cancel {
        color: #0077c8;
        background-color: white;
        border: 1px solid #0066b8;
    }

    .button.cancel:hover {
        color: #0066b8;
        background-color: whitesmoke;
    }

    .button.disabled {
        cursor: not-allowed;
        color: #ababab;
        background-color: #efefef;
    }
    .button.disabled:hover {
        color: #ababab;
        background-color: #efefef;
    }

    .button.full {
        width: 260px;
    }

    @media (max-width: 580px) {
        .button.full {
            width: 200px;
        }

    }

    .button.small {
        width: 140px;
    }

    @media (max-width: 580px) {
        .button.small {
            width: 90px;
        }

    }


</style>

<a class="{`button ${className}`}"
   class:active={active}
   href="{href}"
   class:disabled={disabled}
   on:click|preventDefault|stopPropagation={() => !disabled && onClick()}
   on:keydown={handleLinkClick}>
    {label}
</a>