<script>
  import I18n from "i18n-js";
  import Button from "../../Button.svelte";
  import {config} from "../../../util/config";
  import {link, navigate} from "svelte-routing";
  import {validEmail} from "../../../util/forms";
  import {createDirectAwards} from "../../../api";
  import {flash} from "../../../stores/flash";
  import Dropzone from "svelte-file-dropzone";
  import upload from "../../../icons/cloud-upload.svg";
  import check from "../../../icons/check-green.svg";
  import Warning from "../../forms/Warning.svelte";
  import Error from "../../forms/Error.svelte";

  export let badgeclass;
  export let enrollments;
  export let refresh;

  let directAwards = [];
  let errorAwards = [];

  const handleFilesSelect = e => {
    const files = e.detail.acceptedFiles;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result;
        const rows = data.split("\n");
        const newDirectAwards = [];
        const newErrorAwards = [];
        rows.forEach(row => {
          const cells = row.split(/[, \t]/);
          if (cells.length >= 2 && validEmail(cells[0]) && cells[1].trim().length > 0) {
            newDirectAwards.push({email: cells[0], eppn: cells[1]});
          } else {
            //ignore empty line at the end
            const str = cells.join(" ").trim();
            if (str.length > 0) {
              newErrorAwards.push(cells.join(" "));
            }
          }

        });
        directAwards = newDirectAwards;
        errorAwards = newErrorAwards;
      };
      reader.readAsText(files[0])
    }
  }

  const doAward = () => {
    createDirectAwards(directAwards, badgeclass)
      .then(() => {
        refresh();
        navigate(`/badgeclass/${badgeclass.entityId}/awarded`);
        flash.setValue(I18n.t("badgeAward.bulkAward.flash.created"));
      });
  };

  $: maySubmit = directAwards.length > 0;

</script>

<style lang="scss">
  div.bulk-award-badge {

    h2 {
      background: var(--purple-1);
      padding: var(--ver-padding-l) var(--hor-padding-l);
    }

    p.sub-title {
      margin-bottom: 20px;
    }

    div.warning-container {
      margin: 10px 0 20px 0;
    }

    :global(.dropzone) {
      max-width: 50%;
      @media (max-width: 996px) {
        max-width: 100%;
      }


      &:focus {
        border-color: var(--purple-5) !important;
      }

    }

    div.dropzone-slot {
      display: flex;
      flex-direction: column;
      text-align: center;

      :global(.cloud-upload-svg svg) {
        width: 42px;
        height: auto;

      }

      span.cloud-upload-or {
        margin: 25px 0;
        color: var(--text-grey-dark);
      }

      span.cloud-upload-link {
        margin-top: 5px;
        font-weight: bold;
        cursor: pointer;
        color: var(--green-medium);
        text-decoration: underline;
      }
    }

    ul.error {
      margin-left: 30px;
      color: var(--red-dark);
    }

    div.good {
      display: flex;
      align-items: center;
      margin: 10px 0;

      :global(svg) {
        width: 24px;
      }

      span {
        margin-left: 10px;
      }
    }

    div.actions {
      display: flex;
      margin-top: 25px;

    }

  }
</style>
<div class="bulk-award-badge">
  <h2>{I18n.t("badgeAward.bulkAward.title")}</h2>
  <div class="main-content-margin">
    <p
      class="sub-title">{@html I18n.t("badgeAward.bulkAward.subtitle", {sample: `${config.serverUrl}/static/sample_direct_award.csv`})}</p>
    {#if enrollments.length > 0}
      <div class="warning-container">
        <Warning msg={I18n.t("badgeAward.directAward.waringEnrollments", {count: enrollments.length})}>
          <a use:link
             href={`/badgeclass/${badgeclass.entityId}/enrollments`}>{I18n.t("badgeAward.directAward.toToEnrollments")}</a>
        </Warning>
      </div>
    {/if}
    <Dropzone on:drop={handleFilesSelect} multiple={false} accept=".csv">
      <div class="dropzone-slot">
        <span class="cloud-upload-svg">{@html upload}</span>
        <span class="cloud-upload-or">{I18n.t("badgeAward.bulkAward.or")}</span>
        <span class="cloud-upload-link">{I18n.t("badgeAward.bulkAward.browse")}</span>
      </div>
    </Dropzone>
    {#if errorAwards.length > 0}
      <Error standAlone={true} error_message={I18n.t("badgeAward.bulkAward.wrong")}/>
      <ul class="error">
        {#each errorAwards as err}
          <li>{err}</li>
        {/each}
      </ul>
    {/if}
    {#if directAwards.length > 0}
      <div class="good">
        {@html check}
        <span>{I18n.t("badgeAward.bulkAward.good", {count: directAwards.length})}</span>
      </div>
    {/if}
    <div class="actions">
      <Button action={() => history.back()} text={I18n.t("badgeAward.directAward.cancel")} secondary={true}
              marginRight={true}/>
      <Button action={doAward} text={I18n.t("badgeAward.bulkAward.award")} disabled={!maySubmit}/>
    </div>
  </div>
</div>





