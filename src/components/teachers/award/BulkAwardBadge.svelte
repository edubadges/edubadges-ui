<script>
    import I18n from "i18n-js";
    import Button from "../../Button.svelte";
    import {config} from "../../../util/config";
    import {link, navigate} from "svelte-routing";
    import {validEmail, validEppn, validUrl} from "../../../util/forms";
    import {createDirectAwards} from "../../../api";
    import {flash, msgLevel} from "../../../stores/flash";
    import Dropzone from "svelte-file-dropzone";
    import upload from "../../../icons/cloud-upload.svg";
    import Warning from "../../forms/Warning.svelte";
    import DotSpinner from "../../DotSpinner.svelte";
    import BulkAwardResult from "./BulkAwardResult.svelte";
    import CheckBox from "../../CheckBox.svelte";
    import {onMount} from "svelte";
    import {isEmpty} from "../../../util/utils";

    export let badgeclass;
    export let enrollments;
    export let refresh;
    export let existingDirectAwardsEppns;

    let directAwards = [];
    let errorAwards = [];
    let duplicateAwards = [];
    let alreadyEppnDirectAwards = [];
    let missingEvidenceOrNarrative = [];
    let missingGrades = [];
    let processing = false;
    let serverProcessing = false;
    let enableScheduling = false;
    let scheduledAt = null;
    let initialDate = new Date();
    let startDate = null;
    let enableAwardOnEmail = false;

    onMount(() => {
        initialDate.setDate(initialDate.getDate() + 1);
        initialDate.setHours(0, 0, 0);
        startDate = initialDate;
    });

    const alreadyInList = (newDirectAwards, email, eppn) =>
        newDirectAwards.some(da => da.email === email || (da.eppn === eppn && !isEmpty(eppn)));

    const displayEPPN = directAward => enableAwardOnEmail ? "" : `- ${directAward.eppn}`;

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
                    const newMissingEvidenceOrNarrative = [];
                    const newMissingGrades = [];
                    const requiredCels = enableAwardOnEmail ? 1 : 2;
                    const celAdjustment = enableAwardOnEmail ? 1 : 0;
                    rows.forEach(row => {
                        const cells = row.split(/[,;\t]/);
                        const cellString = cells.join(" - ").trim();

                        if (cells.length > 0 && cells[0].indexOf('Recipient') > -1) {
                            //Header line, simply ignore
                        } else if (cells.length < requiredCels && cellString.length > 0) {
                            newErrorAwards.push(cellString);
                        } else {
                            const email = cells[0];
                            const eppn = enableAwardOnEmail ? null : cells[1];
                            const narrative = cells[2 - celAdjustment] || null;
                            const evidence_url = cells[3 - celAdjustment] || null;
                            const name = cells[4 - celAdjustment] || null;
                            const description = cells[5 - celAdjustment] || null;
                            const grade_achieved = cells[6 - celAdjustment] || null;
                            if (existingDirectAwardsEppns.some(da => da.eppn === eppn && !isEmpty(eppn))) {
                                newAlreadyEppnDirectAwards.push(eppn);
                            } else if (alreadyInList(newDirectAwards, email, eppn)) {
                                newDuplicateAwards.push(cellString)
                            } else if ((badgeclass.evidenceRequired && !evidence_url) || (badgeclass.narrativeRequired && !narrative)) {
                                //ignore empty line at the end
                                if (cellString.length > 0) {
                                    newMissingEvidenceOrNarrative.push(cellString);
                                }
                            } else if (badgeclass.gradeAchievedRequired && isEmpty(grade_achieved)) {
                                //ignore empty line at the end
                                if (cellString.length > 0) {
                                    newMissingGrades.push(cellString);
                                }
                            } else if (validEmail(email) && ((!isEmpty(eppn) && validEppn(eppn, badgeclass)) || enableAwardOnEmail)
                                && (!evidence_url || validUrl(evidence_url))) {
                                newDirectAwards.push({
                                    email,
                                    eppn,
                                    evidence_url,
                                    narrative,
                                    name,
                                    description,
                                    grade_achieved
                                });
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
                    missingEvidenceOrNarrative = newMissingEvidenceOrNarrative;
                    missingGrades = newMissingGrades;
                    processing = false;
                };
                reader.readAsText(files[0])
            }
        }, 150);
    }

    const doAward = () => {
        serverProcessing = true;
        createDirectAwards(directAwards, badgeclass, true, enableScheduling ? new Date(scheduledAt) : null, false, enableAwardOnEmail)
            .then(() => {
                refresh();
                navigate(`/badgeclass/${badgeclass.entityId}/awarded`);
                flash.setValue(I18n.t("badgeAward.bulkAward.flash.created"));
                serverProcessing = false;
            })
            .catch(() => {
                refresh();
                navigate(`/badgeclass/${badgeclass.entityId}/awarded`);
                flash.setValue(I18n.t("badgeAward.bulkAward.flash.created"));
                flash.error(I18n.t("error.unexpected"));
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
            margin-bottom: 16px;
            max-width: 50%;
        }

        ul {
            list-style: disc;
            margin: 5px 0 0 20px;
        }

        div.warning-container {
            margin: 10px 0 20px 0;
        }

        .award-on-email {
            display: flex;
            align-items: center;
            margin: 0 0 22px 0;
        }

        .scheduled-at {
            display: flex;
            align-items: center;
            margin: 0 0 8px 0;

            &.disable-scheduling {
                margin: 24px 0 17px 0;
            }

            :global(input.input-field) {
                max-width: 180px;
                margin-left: 40px;
            }

            .svelte-picker {
                position: relative;

                span.calendar {
                    cursor: pointer;
                }

                :global(svg.calendar-1) {
                    position: absolute;
                    right: 0;
                    top: 8px;
                    color: var(--purple);
                    width: 24px;
                    height: auto;
                }
            }
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
        <p class="sub-title">{@html I18n.t("badgeAward.bulkAward.subtitle",
            {
                sample: enableAwardOnEmail ? `${config.serverUrl}/static/sample_direct_award_email_only.csv`
                    : `${config.serverUrl}/static/sample_direct_award.csv`
            })}
            {#if badgeclass.evidenceRequired || badgeclass.narrativeRequired || badgeclass.gradeAchievedRequired}
                <span>{I18n.t("badgeAward.bulkAward.additionalRequirements")}</span>
                <ul>
                    {#if badgeclass.evidenceRequired}
                        <li>{I18n.t("badgeAward.bulkAward.evidenceRequired")}</li>
                    {/if}
                    {#if badgeclass.narrativeRequired}
                        <li>{I18n.t("badgeAward.bulkAward.narrativeRequired")}</li>
                    {/if}
                    {#if badgeclass.gradeAchievedRequired}
                        <li>{I18n.t("badgeAward.bulkAward.gradeRequired")}</li>
                    {/if}
                </ul>
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
        <div class="award-on-email">
            <CheckBox
                    value={enableAwardOnEmail}
                    name={"enableAwardOnEmail"}
                    tipKey="enableAwardOnEmail"
                    inForm={false}
                    adjustTop={true}
                    boldLabel={false}
                    label={I18n.t("badgeAward.directAward.enableAwardOnEmail")}
                    onChange={val => enableAwardOnEmail = val}
            />
        </div>
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
        <BulkAwardResult warning={true} localeName="duplicate" results={duplicateAwards}/>
        <BulkAwardResult warning={true} localeName="missingEvidenceOrNarrative" results={missingEvidenceOrNarrative}/>
        <BulkAwardResult warning={false} localeName="good"
                         results={directAwards.map(da => `${da.email} - ${displayEPPN(da)} ${(da.evidence_url || da.narrative) ? I18n.t("badgeAward.bulkAward.evidenceIncluded") :""}`)}/>

        <div class="actions">
            <Button action={() => history.back()} text={I18n.t("badgeAward.directAward.cancel")} secondary={true}
                    marginRight={true}/>
            <Button action={doAward} text={I18n.t("badgeAward.bulkAward.award")} disabled={!maySubmit}/>
        </div>
    </div>

</div>





