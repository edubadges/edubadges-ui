<script>
    import {isEmpty} from "../../util/utils";
    import {stopEvent} from "../../util/forms";
    import closeIcon from "../../icons/close_smll.svg";

    export let values;
    export let addValues;
    export let removeValue;
    export let placeholder = "";

    let value = "";

    const internalAddValue = e => {
        const val = e.target.value;
        if (isEmpty(e.target.value)) {
            return;
        }
        addValues(val);
        value = "";
    };

    const internalRemoveValue = value => {
        removeValue(value);
    }

</script>

<style lang="scss">
    div.values-field {
        display: flex;
        position: relative;
        flex-direction: column;

        label {
            display: inline-block;
            margin: 12px 0 6px 0;
            min-width: 210px;
            color: black;
            position: relative;
            font-weight: 600;
        }

        .inner-value-field {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            border: 1px solid var(--grey-6);
            border-radius: 4px;
            font-size: 16px;

            &:focus-within {
                outline: none;
                box-shadow: 3px 3px 3px var(--grey-1), -3px -3px 1px var(--grey-1);
            }


        }

        textarea {
            height: 70px;
            border: none;
            flex-grow: 2;
            display: inline-block;
            background-color: transparent;
            font-size: 16px;
            margin: 14px 5px 5px 5px;

            &:focus {
                border: none;
                outline: none;
            }
        }

        div.value-tag {
            border: 1px solid var(--grey-4);
            border-radius: 4px;
            margin: 10px 5px 0 5px;
            display: inline-block;
            position: relative;
            background-color: var(--grey-2);
            padding: 4px 26px 4px 10px;
            max-height: 32px;

            span {
                &:first-child {
                    word-break: break-all;
                }

                &.icon {
                    padding: 8px 14px;
                    cursor: pointer;
                    font-size: 14px;
                    color: var(--grey-7);
                    position: absolute;
                    right: -8px;
                    top: -2px;

                    :global(svg) {
                        width: 18px;
                        height: auto;
                        z-index: 3;
                        &:hover {
                            fill: var(--red-medium);
                        }
                    }


                    &.disabled {
                        cursor: not-allowed;
                        color: var(--green-medium);
                    }
                }
            }
        }
    }

</style>

<div class="values-field">
    <div class="inner-value-field">
        {#each values as val}
            <div class="value-tag">
                <span>{val}</span>
                <span class="icon" on:click={() => internalRemoveValue(val)}>
                                {@html closeIcon}
                            </span>
            </div>
        {/each}
        <textarea id="value-field"
                  bind:value={value}
                  on:blur={internalAddValue}
                  on:keydown={e => {
                              if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
                                  internalAddValue(e)
                                  setTimeout(() => document.getElementById("value-field").focus(), 50);
                                  return stopEvent(e);
                              } else if (e.key === "Backspace" && isEmpty(value) && values.length > 0) {
                                  const val = values[values.length - 1];
                                  internalRemoveValue(val);
                              }
                          }}
                  placeholder={placeholder}
                  cols={3}/>
    </div>
</div>


