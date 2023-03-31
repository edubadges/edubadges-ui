<script>
    import I18n from "i18n-js";
    import Button from "../../Button.svelte";
    import {config} from "../../../util/config";
    import {link, navigate} from "svelte-routing";
    import {validEmail, validUrl} from "../../../util/forms";
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
    export let existingAssertionsEmails;
    export let existingDirectAwardsEppns;

    let directAwards = [];
    let errorAwards = [];
    let duplicateAwards = [];
    let alreadyEppnDirectAwards = [];
    let alreadyEmailAssertion = [];
    let missingEvidenceOrNarrative = [];
    let processing = false;
    let serverProcessing = false;

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
                    const newAlreadyEmailAssertion = [];
                    const newMissingEvidenceOrNarrative = [];
                    rows.forEach(row => {
                        const cells = row.split(/[,;\t]/);
                        const cellString = cells.join(" - ").trim();
                        if (cells.length > 0 && cells[0].indexOf('Recipient') > -1) {
                            //Header line, simply ignore
                        } else if (cells.length < 2 && cellString.length > 0) {
                            newErrorAwards.push(cellString);
                        } else {
                            const email = cells[0];
                            const eppn = cells[1];
                            const narrative = cells[2] || null;
                            const evidence_url = cells[3] || null;
                            const name = cells[4] || null;
                            const description = cells[5] || null;
                            if (existingDirectAwardsEppns.some(da => da.eppn === eppn)) {
                                newAlreadyEppnDirectAwards.push(eppn);
                            } else if (existingAssertionsEmails.includes(email)) {
                                newAlreadyEmailAssertion.push(email);
                            } else if (existingDirectAwardsEppns.some(da => da.recipientEmail === email)) {
                                newAlreadyEmailAssertion.push(email);
                            } else if (alreadyInList(newDirectAwards, email, eppn)) {
                                newDuplicateAwards.push(cellString)
                            } else if ((badgeclass.evidenceRequired && !evidence_url) || (badgeclass.narrativeRequired && !narrative)) {
                                //ignore empty line at the end
                                if (cellString.length > 0) {
                                    newMissingEvidenceOrNarrative.push(cellString);
                                }
                            } else if (validEmail(email) && eppn.trim().length > 0 && (!evidence_url || validUrl(evidence_url))) {
                                newDirectAwards.push({email, eppn, evidence_url, narrative, name, description});
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
                    alreadyEmailAssertion = newAlreadyEmailAssertion;
                    missingEvidenceOrNarrative = newMissingEvidenceOrNarrative;
                    processing = false;
                };
                reader.readAsText(files[0])
            }
        }, 150);
    }

    const doAward = () => {
        serverProcessing = true;
        createDirectAwards(directAwards, badgeclass, true, null, false)
            .then(() => {
                refresh();
                navigate(`/badgeclass/${badgeclass.entityId}/awarded`);
                flash.setValue(I18n.t("badgeAward.bulkAward.flash.created"));
                serverProcessing = false;
            }).catch(() => {
            refresh();
            navigate(`/badgeclass/${badgeclass.entityId}/awarded`);
            flash.setValue(I18n.t("badgeAward.bulkAward.flash.created"));
            serverProcessing = false;
        });
    };

    $: maySubmit = directAwards.length > 0 && !processing && !serverProcessing;

</script>

<style lang="scss">
  div.bulk-award-badge {

    h2 {
      background: var(--purple-1);
      padding: var(--ver-padding-l) var(--hor-padding-l);
    }

    p.sub-title {
      margin-bottom: 20px;
      max-width: 50%;
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

    div.server-processing {
      display: flex;
      align-items: center;
      margin: 45px 0;

      span {
        font-weight: bold;
        margin-left: 15px;
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
                class="sub-title">{@html I18n.t("badgeAward.bulkAward.subtitle", {sample: `${config.serverUrl}/static/sample_direct_award.csv`})}
            {#if badgeclass.evidenceRequired && badgeclass.narrativeRequired}
                <span>{I18n.t("badgeAward.bulkAward.evidenceAndNarrativeRequired")}</span>
            {:else if badgeclass.evidenceRequired}
                <span>{I18n.t("badgeAward.bulkAward.evidenceRequired")}</span>
            {:else if badgeclass.narrativeRequired}
                <span>{I18n.t("badgeAward.bulkAward.narrativeRequired")}</span>
            {/if}
        </p>
        {#if enrollments.filter(enrollment => !enrollment.denied).length > 0}
            <div class="warning-container">
                <Warning
                        msg={I18n.t("badgeAward.directAward.waringEnrollments", {count: enrollments.filter(enrollment => !enrollment.denied).length})}>
                    <a use:link
                       href={`/badgeclass/${badgeclass.entityId}/enrollments`}>{I18n.t("badgeAward.directAward.toToEnrollments")}</a>
                </Warning>
            </div>
        {/if}
        {#if processing}
            <DotSpinner/>
        {:else if serverProcessing}
            <div class="server-processing">
                <DotSpinner/>
                <span>{I18n.t("badgeAward.directAward.processing", {count: directAwards.length})}</span>
            </div>
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
        <BulkAwardResult warning={true} localeName="emailExisting" results={alreadyEmailAssertion}/>
        <BulkAwardResult warning={true} localeName="duplicate" results={duplicateAwards}/>
        <BulkAwardResult warning={true} localeName="missingEvidenceOrNarrative" results={missingEvidenceOrNarrative}/>
        <BulkAwardResult warning={false} localeName="good"
                         results={directAwards.map(da => `${da.email} - ${da.eppn} ${(da.evidence_url || da.narrative) ? I18n.t("badgeAward.bulkAward.evidenceIncluded") :""}`)}/>

        <div class="actions">
            <Button action={() => history.back()} text={I18n.t("badgeAward.directAward.cancel")} secondary={true}
                    marginRight={true}/>
            <Button action={doAward} text={I18n.t("badgeAward.bulkAward.award")} disabled={!maySubmit}/>
        </div>
    </div>

</div>





