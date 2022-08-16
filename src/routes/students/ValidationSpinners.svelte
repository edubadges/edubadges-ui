<script>
    import I18n from "i18n-js";
    import {formatDate} from "../../util/utils";
    import closeIcon from "../../icons/close_smll.svg";
    import DotSpinner from "../../components/DotSpinner.svelte";
    import checkP from "../../icons/check-purple.svg";
    import {onMount} from "svelte";
    import {importedAssertionValidate, validateBadge} from "../../api";
    import DOMPurify from 'dompurify';
    import {validatedUserName} from "../../stores/user";

    export let close;
    export let badge = {issuer: {}};
    export let validatedName;
    export let importedBadge = false;

    const timer = 375;
    let validationResult = {valid: false};
    let done = false;

    const validations = [
        {key: "issuedOn", val: formatDate(badge.issuedOn)},
        {key: "institution", val: badge.issuer.faculty ? badge.issuer.faculty.institution.name : "-", eduBadge: true },
        {key: "imported", val: formatDate(badge.created_at), eduBadge: false},
        {key: "issuedBy", val: badge.issuer.name},
        {key: "issuedUsing", val: "edubadges", eduBadge: true},
        {key: "hosted", val: importedBadge ? new URL(badge.import_url).hostname : "", eduBadge: false },
        {
            key: "issuedTo",
            val:  validatedName ? validatedUserName(validatedName) : I18n.t("publicBadge.validations.noValidatedName"),
            invalid: !validatedName
        },
        {key: "claimedOn", val: formatDate(badge.updatedAt), eduBadge: true},
        {
            key: "expiresOn", val: badge.expires ? formatDate(badge.expires) : I18n.t("publicBadge.validations.never"),
            invalid: badge.expires && new Date(badge.expires) < new Date()
        },
        {key: "verified", val: "", last: true}
    ].filter(item => item.eduBadge === undefined || item.eduBadge === !importedBadge)
     .map(item => ({
        key: item.key,
        last: item.last,
        pre: I18n.t(`publicBadge.validations.${item.key}`, {val: "..."}),
        post: I18n.t(`publicBadge.validations.${item.key}`, {val: item.val}),
        invalid: item.invalid
    }));


    let timeOuts = validations.reduce((acc, validation) => {
        acc[validation.key] = true;
        return acc;
    }, {});

    onMount(() => {
        const promise = importedBadge ? importedAssertionValidate(badge.entityId) : validateBadge(badge.entityId)
        promise.then(res => {
            validationResult = res.report;
            done = true;
        }).catch(() => done = true);
        validations.forEach((validation, i) => {
            setTimeout(() => timeOuts = {...timeOuts, [validation.key]: false}, (i + 1) * timer)
        })
    })

    const handle_keydown = e => {
        if (e.key === "Escape") {
            close();
        }
    };
</script>

<style lang="scss">
  .validation-spinner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 57, 128, 0.8);
    z-index: 999;
    display: flex;
  }

  .content {
    margin: 8vw auto auto auto;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    border-radius: 8px;
    background: white;
  }


  div.close {
    position: absolute;
    right: 17px;
    top: 5px;
    cursor: pointer;
  }

  .header {
    padding: 18px 32px;
    color: var(--purple);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    position: relative;

    h3 {
      font-weight: bold;
      font-size: 28px;
    }
  }

  .body {
    padding: 18px 32px;
    display: flex;
    flex-direction: column;

    section.validation {
      display: flex;
      align-items: center;
      padding: 18px 0;

      div.spinner-container {
        width: 34px;
        height: 34px;
      }

      &:not(:last-child) {
        border-bottom: 4px solid var(--grey-2);
      }

      span.pre {
        display: inline-block;
        margin-left: 15px;
      }
    }
  }

</style>


<svelte:window on:keydown={handle_keydown}/>

<div class="validation-spinner">
  <div class="content">

    <div class="header">
      <div class="close" on:click={close}>
        {@html closeIcon}
      </div>
      <h3>{I18n.t("publicBadge.verification")}</h3>
    </div>
    <div class="body">
      {#each validations as validation}
        <section class="validation">
          {#if timeOuts[validation.key] || (validation.last && !done)}
            <div class="spinner-container">
              <DotSpinner/>
            </div>
          {:else if validation.last && done && (!validationResult.valid || !validatedName)}
            {@html closeIcon}
          {:else if validation.invalid}
            {@html closeIcon}
          {:else}
            {@html checkP}
          {/if}
          <span
            class="pre">{@html timeOuts[validation.key] ? validation.pre : DOMPurify.sanitize(validation.post)}</span>
        </section>
      {/each}
    </div>
  </div>
</div>

