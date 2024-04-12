<script>

    export let label;
    export let question;
    export let value;
    export let onChange;
    export let disabled = false;

</script>

<style lang="scss">
    .switch-container {
        p {
            font-weight: bold;
            position: relative;
            display: inline-block;
            width: 100%;
        }
    }

    .question-container {
        display: flex;
        align-items: center;
        margin: 7px 0;
        width: 100%;
        border: 1px solid var(--grey-3);
        border-radius: 4px;
        padding: 3px 10px;

    }

    .switch {
        margin-left: auto;
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;

        input {
            opacity: 0;
            width: 0;
            height: 0;
        }
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--grey-2);
        transition: .4s;

        &::before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
        }

        &.disabled {
            cursor: not-allowed;
            background-color: var(--grey-4);
        }

        &.round {
            border-radius: 34px;
        }

        &.round::before {
            border-radius: 50%;
        }

        &.round:not(.checked)::before {
            border: 1px solid var(--grey-4);
        }

    }

    input:checked + .slider.checked {
        background-color: var(--green-medium);
    }

    input:checked + .slider.checked.disabled {
        background-color: var(--grey-4);
    }

    input:focus + .slider.checked {
        box-shadow: 0 0 1px var(--green-medium);
    }

    input:focus + .slider.checked.disabled {
        box-shadow: 0 0 1px var(--grey-4);
    }

    input:checked + .slider.checked:before {
        transform: translateX(26px);
    }

</style>

<div class="switch-container">
    {#if label}
        <p>{label}</p>
    {/if}
    <div class="question-container">
        <span class="question">{question}</span>
        <label class="switch">
            <input type="checkbox"
                   checked={value}
                   disabled={true}>
            <span class:checked={value} class:disabled class="slider round"
                  on:click={() => !disabled && onChange(!value)}/>
        </label>
    </div>

</div>