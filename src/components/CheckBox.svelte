<script>
    import check from "../icons/check.svg";

    export let value;
    export let onChange;
    export let label;
    export let readOnly = false;

</script>
<style>
    label.checkbox {
        display: block;
        margin-top: 10px;
        position: relative;
        padding-left: 28px;
        cursor: pointer;
        user-select: none;
        font-weight: 600;
    }

    .checkbox input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 18px;
        width: 18px;
        border: 1px solid #004c97;
        border-radius: 2px;
    }

    .checkbox:hover input ~ .checkmark {
        background-color: #ebebeb;
    }

    .checkbox input:checked ~ .checkmark {
        background-color: #b3e5ff;
    }

    :global(.checkbox input ~ .checkmark svg) {
        display: none;
    }

    :global(.checkbox input:checked ~ .checkmark svg) {
        display: inherit;
    }

</style>
<label class="checkbox">
    <span>{label}</span>
    <input type="checkbox" checked={value} on:change={e => onChange(e.target.checked)} disabled="{readOnly}">
    <span class="checkmark">
        {@html check}
    </span>
</label>
