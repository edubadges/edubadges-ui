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
  import Warning from "../../forms/Warning.svelte";
  import DotSpinner from "../../DotSpinner.svelte";
  import BulkAwardResult from "./BulkAwardResult.svelte";

  export let badgeclass;
  export let enrollments;
  export let refresh;
  export let existingDirectAwardsEppns;

  let directAwards = [];
  let errorAwards = [];
  let duplicateAwards = [];
  let alreadyEppnDirectAwards = [];
  let processing = false;

  const alreadyInList = (newDirectAwards, email, eppn) =>
    newDirectAwards.some(da => da.email === email || da.eppn === eppn);

  const handleFilesSelect = e => {
    processing = true;
    setTimeout(() => {
      const files = e.detail.acceptedFiles;
      if (files && files.length > 0) {
        const reader = new FileReader();
        reader.onload = () => {
          const data = reader.result;
          const rows = data.split("\n");
          const newDirectAwards = [];
          const newErrorAwards = [];
          const newDuplicateAwards = [];
          const newAlreadyEppnDirectAwards = [];
          rows.forEach(row => {
            const cells = row.split(/[, \t]/);
            const cellString = cells.join(" - ").trim();
            if (cells.length < 2 && cellString.length > 0) {
              newErrorAwards.push(cellString);
            } else {
              const email = cells[0];
              const eppn = cells[1];
              if (existingDirectAwardsEppns.includes(eppn)) {
                newAlreadyEppnDirectAwards.push(eppn);
              } else if (alreadyInList(newDirectAwards, email, eppn)) {
                newDuplicateAwards.push(cellString)
              } else if (validEmail(email) && eppn.trim().length > 0) {
                newDirectAwards.push({email: email, eppn: eppn});
              } else {
                //ignore empty line at the end
                if (cellString.length > 0) {
                  newErrorAwards.push(cellString);
                }
              }
            }

          });
          directAwards = newDirectAwards;
          errorAwards = newErrorAwards;
          duplicateAwards = newDuplicateAwards;
          alreadyEppnDirectAwards = newAlreadyEppnDirectAwards;
          processing = false;
        };
        reader.readAsText(files[0])
      }
    }, 150);
  }

  const doAward = () => {
    processing = true;
    createDirectAwards(directAwards, badgeclass, true)
      .then(() => {
        refresh();
        navigate(`/badgeclass/${badgeclass.entityId}/awarded`);
        flash.setValue(I18n.t("badgeAward.bulkAward.flash.created"));
        processing = false;
      });
  };

  $: maySubmit = directAwards.length > 0 && !processing;

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
    {#if processing}
      <DotSpinner/>
    {:else}
      <Dropzone on:drop={handleFilesSelect} multiple={false} accept=".csv">
        <div class="dropzone-slot">
          <span class="cloud-upload-svg">{@html upload}</span>
          <span class="cloud-upload-or">{I18n.t("badgeAward.bulkAward.or")}</span>
          <span class="cloud-upload-link">{I18n.t("badgeAward.bulkAward.browse")}</span>
        </div>
      </Dropzone>
    {/if}
    <BulkAwardResult warning={true} localeName="wrong" results={errorAwards}/>
    <BulkAwardResult warning={true} localeName="eppnExisting" results={alreadyEppnDirectAwards}/>
    <BulkAwardResult warning={true} localeName="duplicate" results={duplicateAwards}/>
    <BulkAwardResult warning={false} localeName="good" results={directAwards.map(da => `${da.email} - ${da.eppn} `)}/>

    <div class="actions">
      <Button action={() => history.back()} text={I18n.t("badgeAward.directAward.cancel")} secondary={true}
              marginRight={true}/>
      <Button action={doAward} text={I18n.t("badgeAward.bulkAward.award")} disabled={!maySubmit}/>
    </div>
  </div>

</div>





