<script>
  import TabList from '../tabs/TabList.svelte';
  import Tab from '../tabs/Tab.svelte';
  import I18n from "i18n-js";
  import {onMount} from "svelte";

  export let errorEnglish;
  export let errorDutch;
  export let initialTab = "en";
  let activeTab;

  onMount(() => activeTab = initialTab);

  const switchTab = () => activeTab = (activeTab === "en" ? "nl" : "en");

</script>


<TabList>
  <Tab error={errorEnglish} active={activeTab === "en"} switchTab={switchTab}>
    {I18n.t("language.en_EN")}
  </Tab>
  <Tab error={errorDutch} active={activeTab === "nl"} switchTab={switchTab}>
    {I18n.t("language.nl_NL")}
  </Tab>
</TabList>

{#if activeTab === "en"}
  <slot name="en"/>
{/if}

{#if activeTab === "nl"}
  <slot name="nl"/>
{/if}

