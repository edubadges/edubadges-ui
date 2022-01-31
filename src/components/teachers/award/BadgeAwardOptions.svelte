<script>
    import I18n from "i18n-js";
    import {link} from "svelte-routing";
    import InviteDialog from "./InviteDialog.svelte";
    import Button from "../../Button.svelte";
    import {onMount} from "svelte";
    import {ltiContext} from "../../../stores/lti";
    import EntityHeaderNotification from "../EntityHeaderNotification.svelte";

    export let badgeclass = {};

    let showInviteDialog = false;
    let showShareFeedback = false;
    let directAwardingEnabled = false;

    onMount(() => {
        directAwardingEnabled = badgeclass.issuer.faculty.institution.directAwardingEnabled;
    });

    const publicUrl = () => {
        const loc = window.location;
        return loc.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + "/public/" + badgeclass.entityId;
    }

    const copiedLink = () => {
        showInviteDialog = false;
        showShareFeedback = true;
        setTimeout(() => showShareFeedback = false, 1750)
    }


</script>
<style lang="scss">
  div.badge-award-options {
    display: flex;
    position: relative;

    flex-direction: column;
    margin-right: 275px;

    @media (max-width: 1480px) {
      margin-right: 50px;
    }

    span.award-link {
      margin-top: 15px;

      a {
        font-weight: bold;
        text-decoration: underline;
      }
    }

    div.tooltip {
      z-index: 9;
      position: absolute;
      border-radius: 4px;
      padding: 4px 8px;
      right: 22px;
      top: 120%;
      left: 40%;
      width: 134px;
      background-color: var(--grey-3);
      font-size: 13px;

      &.direct-awarding-enabled {
        top: 108%;
      }

      &::after {
        content: " ";
        position: absolute;
        top: -15px;
        left: 50%;
        margin-left: -5px;
        border-width: 8px;
        border-style: solid;
        border-color: transparent transparent var(--grey-3) transparent;
      }
    }


  }
</style>
<div class="badge-award-options">
  {#if badgeclass.isPrivate}
    <EntityHeaderNotification msg={I18n.t("invites.copyPublicUrlDisabled")}/>
  {:else if badgeclass.archived}
    <EntityHeaderNotification msg={I18n.t("badgeAwardOptions.badgeClassArchived")}/>
  {:else}
    {#if directAwardingEnabled}
      <Button href={`/badgeclass/${badgeclass.entityId}/direct-award`} text={I18n.t("badgeAwardOptions.directAward")}/>
      <span class="award-link">{I18n.t("badgeAwardOptions.or")}
        <a use:link href={`/badgeclass/${badgeclass.entityId}/bulk-award`}>
          {I18n.t("badgeAwardOptions.bulkAward")}
        </a>
      </span>
      <span class="award-link">{I18n.t("badgeAwardOptions.or")}
        <a on:click|preventDefault|stopPropagation={() => showInviteDialog = true}
           href="/">{I18n.t("badgeAwardOptions.inviteEnrollements")}</a>
      </span>
      {#if $ltiContext.launchId || true}
        <span class="award-link">{I18n.t("badgeAwardOptions.or")}
        <a use:link href={`/badgeclass/${badgeclass.entityId}/lti-award`}>
          {I18n.t("badgeAwardOptions.ltiAward")}
        </a>
      </span>
      {/if}
    {:else}
      <Button action={() => showInviteDialog = true} text={I18n.t("badgeAwardOptions.inviteEnrollements")}/>
    {/if}
    {#if showShareFeedback}
      <div class="tooltip" class:direct-awarding-enabled={directAwardingEnabled}>
        {I18n.t("copyToClipboard.copied")}
      </div>
    {/if}
  {/if}


</div>

{#if showInviteDialog}
  <InviteDialog
    copied={copiedLink}
    cancel={() => showInviteDialog = false}
    publicUrl={publicUrl()}/>
{/if}


