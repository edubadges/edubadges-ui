<script>
  import I18n from "i18n-js";
  import Button from "../../Button.svelte";
  import {config} from "../../../util/config";
  import {navigate} from "svelte-routing";
  import {validEmail} from "../../../util/forms";
  import {createDirectAwards} from "../../../api";
  import {flash} from "../../../stores/flash";
  import Dropzone from "svelte-file-dropzone";
  import upload from "../../../icons/cloud-upload.svg";

  export let badgeclass;
  //export let enrollments;
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
          const cells = row.split("[,\t ]");
          if (cells.length >= 2 && validEmail(cells[0]) && cells[1].trim().length > 0) {
            newDirectAwards.push({email: cells[0], eppn: cells[1]});
          } else {
            newErrorAwards.push(cells.join(" "));
          }

        })
        directAwards = newDirectAwards;
        errorAwards = newErrorAwards;
      };
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

    //div.warning-container {
    //  margin: 10px 0 20px 0;
    //}

    div.dropzone-slot {
      display: flex;
      flex-direction: column;
      text-align: center;

      :global(.cloud-upload-svg svg) {
        width: 56px;
        height: auto;

      }

      span.cloud-upload-link {
        margin-top: 25px;
        font-weight: bold;
        font-size: larger;
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
    <!--{#if enrollments.length > 0}-->
    <!--  <div class="warning-container">-->
    <!--    <Warning msg={I18n.t("badgeAward.directAward.waringEnrollments", {count: enrollments.length})}>-->
    <!--      <a use:link-->
    <!--         href={`/badgeclass/${badgeclass.entityId}/enrollments`}>{I18n.t("badgeAward.directAward.toToEnrollments")}</a>-->
    <!--    </Warning>-->
    <!--  </div>-->
    <!--{/if}-->
    <Dropzone on:drop={handleFilesSelect} multiple={false} accept=".csv">
      <div class="dropzone-slot">
        <span class="cloud-upload-svg">{@html upload}</span>
        <span class="cloud-upload-link">{I18n.t("badgeAward.bulkAward.browse")}</span>
      </div>
    </Dropzone>
    <div class="actions">
      <Button action={() => history.back()} text={I18n.t("badgeAward.directAward.cancel")} secondary={true}
              marginRight={true}/>
      <Button action={doAward} text={I18n.t("badgeAward.bulkAward.award")} disabled={!maySubmit}/>
    </div>
  </div>
</div>





