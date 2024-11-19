<script>
    import Tab from '../tabs/Tab.svelte';
    import I18n from "i18n-js";
    import {onMount} from "svelte";

    export let errorEnglish;
    export let errorDutch;
    export let initialTab = "en";
    export let activeTab = initialTab;
    export let showTabSwitch = true;
    export let tabSwitchNotify = null;

    onMount(() => activeTab = initialTab);

    const switchTab = newTab => {
        if (newTab !== activeTab) {
            activeTab = newTab;
            tabSwitchNotify && tabSwitchNotify(newTab);
        }
    }

</script>

<style>
    .tab-list {
        display: flex;
        margin-top: 15px;
        padding-top: 10px;
        border-top: 1px solid var(--grey-3)
    }
</style>

{#if showTabSwitch}
    <div class="tab-list">
        <Tab error={errorEnglish} active={activeTab === "en"} switchTab={() => switchTab("en")}>
            {I18n.t("language.en_EN")}
        </Tab>
        <Tab error={errorDutch} active={activeTab === "nl"} switchTab={() => switchTab("nl")}>
            {I18n.t("language.nl_NL")}
        </Tab>
    </div>
{/if}
<slot name="before"/>

{#if activeTab === "en"}
    <slot name="en"/>
{/if}

{#if activeTab === "nl"}
    <slot name="nl"/>
{/if}

<slot name="after"/>

