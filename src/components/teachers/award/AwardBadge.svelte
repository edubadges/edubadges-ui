<script>
    import {Field, TextInput} from "../../forms";
    import I18n from "i18n-js";
    import Button from "../../Button.svelte";
    import Warning from "../../forms/Warning.svelte";
    import {link, navigate} from "svelte-routing";
    import trash from "../../../icons/trash.svg";
    import {validEmail, validEppn, validUrl} from "../../../util/forms";
    import Error from "../../forms/Error.svelte";
    import {createDirectAwards, getLTIContext, getMembers} from "../../../api";
    import {flash} from "../../../stores/flash";
    import {onMount} from "svelte";
    import AwardBadgeModal from "./AwardBadgeModal.svelte";
    import {isEmpty} from "../../util/utils";
    import Spinner from "../../Spinner.svelte";
    import {ltiContext} from "../../../stores/lti";
    import {roles} from "../../../util/lti";
    import {en, nl} from 'svelty-picker/i18n';
    import SveltyPicker from 'svelty-picker';
    import CheckBox from "../../CheckBox.svelte";
    import calendarIcon from "../../../icons/calendar-1.svg";

    export let badgeclass;
    export let enrollments;
    export let refresh;
    export let existingDirectAwardsEppns;
    export let ltiContextEnabled = false;

    let errors = {};
    let errorsDuplications = {};
    let errorsAlreadyAwarded = {};

    let directAwards = [];
    let narrativeOrEvidenceRequired = true;
    let showAwardModal = false;
    let selectedDirectAwardForEvidence = null;
    let selectedDirectAwardForEvidenceIndex = null;
    let beforeCommit = true;
    let launchData;
    let users;
    let loaded = false;
    let enableScheduling = false;
    let scheduledAt = null;
    let initialDate = new Date();
    let startDate = null;

    onMount(() => {
        initialDate.setDate(initialDate.getDate() + 1);
        initialDate.setHours(0, 0, 0);
        startDate = initialDate;
        if (ltiContextEnabled) {
            Promise.all([
                getLTIContext($ltiContext.launchId),
                getMembers($ltiContext.launchId),
            ]).then(res => {
                launchData = res[0];
                res[1].forEach(user => user.role = roles(user.roles));
                users = res[1].filter(user => user.role.indexOf("Learner") > -1 && !isEmpty(user.lis_person_sourcedid));
                directAwards = users.map(user => {
                    return (badgeclass.evidenceRequired || badgeclass.narrativeRequired) ?
                        {
                            email: user.email,
                            eppn: user.lis_person_sourcedid,
                            narrative: "",
                            evidence_url: "",
                            name: "",
                            description: ""
                        } :
                        {email: user.email, eppn: user.lis_person_sourcedid}
                });
                loaded = true;
            })
        } else {
            directAwards = (badgeclass.evidenceRequired || badgeclass.narrativeRequired) ?
                [{email: "", eppn: "", narrative: "", evidence_url: "", name: "", description: ""}] :
                [{email: "", eppn: ""}];
            loaded = true;
        }
    });


    const addDirectAward = () => {
        const newDa = (badgeclass.evidenceRequired || badgeclass.narrativeRequired) ?
            {email: "", eppn: "", narrative: "", evidence_url: "", name: "", description: ""} : {email: "", eppn: ""}
        directAwards = [...directAwards, newDa];
    }

    const hasEvidence = directAward => {
        return directAward.narrative || validUrl(directAward.evidence_url);
    }

    const removeDirectAward = index => () => {
        const newDirectAwards = directAwards.filter((item, i) => i !== index);
        invariant(newDirectAwards);
    }

    const addEvidence = i => {
        selectedDirectAwardForEvidence = {...directAwards[i]};
        selectedDirectAwardForEvidenceIndex = i;
        showAwardModal = true;
    }

    const awardModalSubmit = () => {
        const newDirectAwards = [...directAwards];
        newDirectAwards[selectedDirectAwardForEvidenceIndex] = selectedDirectAwardForEvidence;
        invariant(newDirectAwards);
        showAwardModal = false;
    }


    const awardModalCancel = () => {
        showAwardModal = false;
        selectedDirectAwardForEvidence.narrative = ""
        selectedDirectAwardForEvidence.evidence_url = ""
        selectedDirectAwardForEvidence.name = ""
        selectedDirectAwardForEvidence.description = ""
    }

    const init = e => e.focus();

    const emailOnBlur = i => e => {
        const val = e.target.value;
        const isValid = (beforeCommit && isEmpty(val)) || validEmail(val);
        setTimeout(() => errors = {...errors, [`email_${i}`]: !isValid}, 150);
        errorsDuplications = {
            ...errorsDuplications,
            [`email_${i}`]: directAwards.filter(da => da.email === val).length > 1 && val.trim().length > 0
        }
    }

    const eppnOnBlur = i => e => {
        const val = e.target.value;
        const isValid = (beforeCommit && isEmpty(val)) || validEppn(val, badgeclass);

        errors = {...errors, [`eppn_${i}`]: val.trim().length === 0 || !isValid}
        errorsDuplications = {
            ...errorsDuplications,
            [`eppn_${i}`]: directAwards.filter(da => da.eppn === val).length > 1 && val.trim().length > 0
        }
        errorsAlreadyAwarded = {
            ...errorsAlreadyAwarded,
            [`eppn_${i}`]: existingDirectAwardsEppns.some(da => da.eppn === val)
        }
    }

    const doAward = () => {
        beforeCommit = false;
        invariant(directAwards);
        if (Object.values(errors).some(val => val)) {
            return;
        }
        createDirectAwards(directAwards, badgeclass, false, enableScheduling ? new Date(scheduledAt) : null, ltiContextEnabled)
            .then(() => {
                refresh(() => setTimeout(() => navigate(`/badgeclass/${badgeclass.entityId}/awarded`), 75));
                flash.setValue(I18n.t("badgeAward.directAward.flash.created"));
            }).catch(e => {
            refresh(() => setTimeout(() => navigate(`/badgeclass/${badgeclass.entityId}/awarded`), 75));
            flash.error(e.message);
        });
    };

    //Need to rebuild the errors as in-between values might be removed
    const invariant = newDirectAwards => {
        errors = newDirectAwards.reduce((acc, da, i) => {
            acc[`eppn_${i}`] = da.eppn.trim().length === 0 || !validEppn(da.eppn, badgeclass);
            acc[`email_${i}`] = !validEmail(da.email);
            acc[`evidence_${i}`] = badgeclass.evidenceRequired && !da.evidence_url;
            acc[`narrative_${i}`] = badgeclass.narrativeRequired && !da.narrative;
            return acc;
        }, {});
        errorsAlreadyAwarded = newDirectAwards.reduce((acc, da, i) => {
            acc[`eppn_${i}`] = existingDirectAwardsEppns.some(inst => inst.eppn === da.eppn);
            return acc;
        }, {});
        errorsDuplications = newDirectAwards.reduce((acc, da, i) => {
            acc[`eppn_${i}`] = newDirectAwards.filter(other => other.eppn === da.eppn && other.eppn.trim().length > 0).length > 1;
            acc[`email_${i}`] = newDirectAwards.filter(other => other.email === da.email && other.email.trim().length > 0).length > 1;
            return acc;
        }, {});
        directAwards = newDirectAwards;
    }

    $: disableSubmit = !beforeCommit && Object.values(errors).some(val => val) || Object.values(errorsDuplications).some(val => val) ||
        Object.values(errorsAlreadyAwarded).some(val => val);

</script>

<style lang="scss">
  div.award-badge {

    h2 {
      background: var(--purple-1);
      padding: var(--ver-padding-l) var(--hor-padding-l);
    }

    p.sub-title {
      margin-bottom: 16px;
      max-width: 50%;
    }

    .scheduled-at {
      display: flex;
      align-items: center;
      margin: 15px 0 16px 0;

      &.disable-scheduling {
        margin: 23px 0 25px 0;
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

    div.warning-container {
      margin: 10px 0 20px 0;
    }

    .grouped {
      display: grid;
      grid-template-columns: 50% 50%;
      grid-row: auto;
      grid-column-gap: 40px;
      grid-row-gap: 16px;
      padding-right: 40px;
    }

    div.add-email {
      margin: 15px 5px 30px 0;
    }

    div.imported {
      margin-top: 15px;
    }

    div.deletable-row {
      display: flex;
    }

    .rm-icon-container {
      color: purple;
      border: none;
      background-color: white;
      height: 30px;
      width: 30px;
      align-self: center;
      cursor: pointer;
      margin-left: 5px;
    }

    div.actions {
      display: flex;

    }

    div.evidence-container {
      display: flex;
      flex-direction: column;
      padding: 27px 0 0 10px;

      div.evidence-subcontainer {
        display: flex;
        margin: 0 auto;
        max-width: 180px;
      }
    }

  }
</style>
{#if loaded}
    <div class="award-badge">
        <h2>{I18n.t(`badgeAward.${ltiContextEnabled ? "ltiAward" : "directAward"}.title`)}</h2>
        <div class="main-content-margin">
            <p class="sub-title">{I18n.t("badgeAward.directAward.subtitle")}
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
                    <Warning msg={I18n.t("badgeAward.directAward.waringEnrollments", {count: enrollments.length})}>
                        <a use:link
                           href={`/badgeclass/${badgeclass.entityId}/enrollments`}>{I18n.t("badgeAward.directAward.toToEnrollments")}</a>
                    </Warning>
                </div>
            {/if}
            <div class="scheduled-at" class:disable-scheduling={!enableScheduling}>
                <CheckBox
                        value={enableScheduling}
                        name={"enableScheduling"}
                        tipKey="awardScheduling"
                        inForm={false}
                        adjustTop={true}
                        boldLabel={false}
                        label={I18n.t("badgeAward.directAward.schedulingDate")}
                        onChange={val => {
                            enableScheduling = val;
                        }}/>
                {#if enableScheduling}
                    <div class="svelte-picker">
                        <SveltyPicker
                                inputClasses="input-field"
                                inputId="svelty-picker-id"
                                format="yyyy-mm-dd hh:ii"
                                startDate={startDate}
                                clearBtn={false}
                                disabled={!enableScheduling}
                                minuteIncrement={30}
                                i18n={I18n.locale === "en" ? en : nl}
                                todayBtn={false}
                                bind:value={scheduledAt}
                                bind:initialDate={initialDate}/>
                        <span class="calendar" on:click={() => document.getElementById("svelty-picker-id").focus()}>
                            {@html calendarIcon}
                        </span>

                    </div>
                {/if}
            </div>
            <div class="grouped">
                {#each directAwards as da, i}
                    <Field entity="badgeAward" attribute="email">
                        <TextInput bind:value={da.email} error={errors[`email_${i}`]} {init} onBlur={emailOnBlur(i)}/>
                        {#if errors[`email_${i}`]}
                            <Error standAlone={true} error_code={927}/>
                        {/if}
                        {#if errorsDuplications[`email_${i}`]}
                            <Error standAlone={true} error_code={929}/>
                        {/if}
                        {#if errorsAlreadyAwarded[`email_${i}`]}
                            <Error standAlone={true} error_code={940}/>
                        {/if}

                    </Field>
                    <div class="deletable-row">
                        <Field entity="badgeAward" attribute="eppn" full={true}>
                            <TextInput bind:value={da.eppn} error={errors[`eppn_${i}`]} onBlur={eppnOnBlur(i)}>
                                {#if i !== 0}
                                    <button class="rm-icon-container"
                                            on:click={removeDirectAward(i)}>{@html trash}</button>
                                {/if}
                            </TextInput>
                            {#if errors[`eppn_${i}`]}
                                {#if isEmpty(da.eppn)}
                                    <Error standAlone={true} error_code={928}/>
                                {:else}
                                    <Error standAlone={true} error_code={942}/>
                                {/if}
                            {/if}
                            {#if errorsDuplications[`eppn_${i}`]}
                                <Error standAlone={true} error_code={930}/>
                            {/if}
                            {#if errorsAlreadyAwarded[`eppn_${i}`]}
                                <Error standAlone={true}
                                       error_code={(existingDirectAwardsEppns.find(ex => ex.eppn === da.eppn) || {}).isAssertion ? 943 : 931}/>
                            {/if}
                        </Field>
                        <div class="evidence-container">
                            <div class="evidence-subcontainer">
                                <Button text={hasEvidence(da) ? I18n.t("badgeAward.directAward.editEvidence") :
                              I18n.t("badgeAward.directAward.addEvidence")}
                                        action={() => addEvidence(i)}/>
                            </div>
                            {#if errors[`narrative_${i}`]}
                                <Error standAlone={true} error_code={932}/>
                            {/if}
                            {#if errors[`evidence_${i}`]}
                                <Error standAlone={true} error_code={933}/>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
            {#if ltiContextEnabled}
                <div class="imported">
                    <p>
                        {@html I18n.t(`badgeAward.ltiAward.${users.length === 0 ? "noUsers" : "usersImported"}`, {
                            nbr: users.length, name: launchData["iss"]
                        })}
                        <a use:link href={"/lti/participants"}>
                            {I18n.t("badgeAward.ltiAward.checkContext")}
                        </a>
                    </p>

                </div>
            {/if}
            <div class="add-email">
                <a on:click|preventDefault|stopPropagation={addDirectAward}
                   href="/add">{I18n.t("badgeAward.directAward.addAnother")}</a>
            </div>
            <div class="actions">
                <Button action={() => history.back()} text={I18n.t("badgeAward.directAward.cancel")} secondary={true}
                        marginRight={true}/>
                <Button action={doAward} text={I18n.t("badgeAward.directAward.award")} disabled={disableSubmit}/>
            </div>
        </div>
    </div>
{:else}
    <Spinner/>
{/if}
{#if showAwardModal}
    <AwardBadgeModal
            bind:narrative={selectedDirectAwardForEvidence.narrative}
            bind:url={selectedDirectAwardForEvidence.evidence_url}
            bind:useEvidence={narrativeOrEvidenceRequired}
            bind:name={selectedDirectAwardForEvidence.name}
            bind:description={selectedDirectAwardForEvidence.description}
            narrativeRequired={badgeclass.narrativeRequired}
            evidenceRequired={badgeclass.evidenceRequired}
            submit={awardModalSubmit}
            awardMode={false}
            cancel={awardModalCancel}/>
{/if}
