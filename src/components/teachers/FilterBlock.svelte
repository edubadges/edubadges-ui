<script>
    import I18n from "i18n-js";
    import {chevronUp, chevronDown, closeIcon} from "../../icons";
    import {Select} from "../forms";
    import indicator from "../../icons/chevron-down-large.svg";
    import {isEmpty} from "../../util/utils";

    export let collection = [];
    export let value = [];
    export let title = "";
    export let maxLength = 5;
    export let objectIdentifier = "entityId";
    export let selectModus = false;
    export let placeholder = null;

    let expanded = false;

    $: showExpand = !value.length && collection.length > maxLength && collection.filter(item => item.count > 0).length > maxLength;
    $: items = expanded ? collection : collection.slice(0, maxLength);

</script>

<style lang="scss">
    .filter-block {
        padding-left: var(--hor-padding-s);

        :global(.selectContainer) {
            margin-top: 14px;
        }
    }

    input[type="checkbox"] {
        display: none;
    }

    label {
        font-size: 18px;
        display: block;
        margin: 14px 0;
        position: relative;
        line-height: 26px;

        &.inactive {
            display: none;
        }

        &.active {
            display: flex;
            color: black;
            background: white;
            padding: 8px;
            border: var(--card-border);
            border-radius: var(--card-border-radius);
            font-size: 16px;

            div {
                flex: 1;
                margin-right: 5px;
            }

            :global(svg) {
                --close-filter-size: 18px;
                width: var(--close-filter-size);
                height: var(--close-filter-size);
                margin: auto;
                border: 2px solid var(--purple);
                border-radius: 50%;
                fill: var(--purple);
            }
        }

        &:not(.active) {
            font-weight: var(--semi-bold);

            &:hover {
                text-decoration: underline;
            }
        }
    }

    .expand {
        display: flex;
        align-items: center;
        color: var(--text-grey-dark);

        :global(svg) {
            width: 20px;
            margin-left: 6px;
            fill: var(--text-grey-dark);
        }
    }
</style>

<div class="filter-block">
    <h3>{I18n.t(`teacher.sidebar.filters.${title}`)}</h3>
    {#if selectModus}
        <Select value={isEmpty(value) ? null : value}
                showIndicator={false}
                customIndicator={indicator}
                showChevron={isEmpty(value)}
                clearable={true}
                isSearchable={true}
                isMulti={true}
                optionIdentifier="name"
                placeholder={placeholder}
                handleSelect={values => {
                    value = isEmpty(values) ? [] : values;
                }}
                items={items
                    .filter(item => item.count > 0)
                    .map(item => ({name: `${item.name} (${item.count})`, value: item.name}))}
        />
    {:else}
        {#each items.filter(item => item.count > 0) as item}
            <label
                    class="link"
                    class:active={value.includes(item[objectIdentifier])}
                    class:inactive={value.length && !value.includes(item[objectIdentifier])}>
                <input type="checkbox" bind:group={value} value={item[objectIdentifier]}/>
                <div>
                    {`${item.name} (${item.count})`}
                </div>

                {#if value.includes(item[objectIdentifier])}
                    {@html closeIcon}
                {/if}
            </label>
        {/each}

        {#if showExpand}
            <label class="expand click">
                <input type="checkbox" bind:checked={expanded}/>
                {expanded ? I18n.t(`teacher.sidebar.filters.show_less`) : I18n.t(`teacher.sidebar.filters.show_all`)}
                {@html expanded ? chevronUp : chevronDown}
            </label>
        {/if}
    {/if}

</div>