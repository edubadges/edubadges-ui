<script>
    import I18n from "i18n-js";
    import {Button} from "../../components";
    import placeholder from "../../icons/forms/image-placeholder.svg";

    export let value;
    export let error;
    export let disabled = false;
    export let removeAllowed = false;
    export let disclaimer;

    let input;
    let src = null;

    $: if (value) {
        src = value;
    }

    const reader = new FileReader();
    reader.onload = ({target: {result}}) => {
        value = result;
        src = result;
    };

    const setFile = file => {
        if (file) {
            reader.readAsDataURL(file);
        } else {
            value = null;
            src = null;
            input.value = null;
        }
    };
</script>

<style lang="scss">
    div.container {
        display: flex;
    }

    div.image-container {
        flex: 0 0 auto;
        height: 120px;
        width: 120px;
        margin-right: var(--hor-padding-m);

        display: flex;
        justify-content: space-around;
        object-fit: contain;

        p {
            text-align: center;
            padding: 6px;
        }
    }
    .no-file {
        :global(svg) {
            width: 110px;
            height: auto;

        }
    }

    div.buttons-container {
        flex: 1;
        display: flex;
        flex-direction: column;

        > :global(*) {
            margin-bottom: 5px;
        }
    }

    .disclaimer {
        margin: auto 0 5px 18px;
        font-size: 14px;

        :global(ul) {
            list-style: initial;
        }
    }
</style>

<div class="container file-container">
    <div class="image-container input-field" class:error class:disabled>
        {#if src}
            <img alt="preview" {src}/>
        {:else}
            <div class="no-file">
                {@html placeholder}
            </div>
        {/if}
    </div>

    <div class="buttons-container" {disabled}>
        <input
                class="input-hidden"
                id="file"
                type="file"
                accept="image/*"
                on:change={({ target }) => setFile(target.files[0])}
                bind:this={input}
                {disabled}/>

        <Button
                label="file"
                disabled={disabled}
                text={I18n.t('file.upload')}/>
        {#if removeAllowed}
            <Button
                    secondary
                    disabled={disabled || !value}
                    action={_ => setFile()}
                    text={I18n.t('file.remove')}/>
        {/if}
        <span class="disclaimer">{ @html disclaimer || I18n.t('file.disclaimer')}</span>

    </div>
</div>
