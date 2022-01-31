<script>
    import {Field, TextInput} from "../../forms";
    import I18n from "i18n-js";
    import Button from "../../Button.svelte";
    import Warning from "../../forms/Warning.svelte";
    import {link, navigate} from "svelte-routing";
    import trash from "../../../icons/trash.svg";
    import {validEmail, validUrl} from "../../../util/forms";
    import Error from "../../forms/Error.svelte";
    import {createDirectAwards, getLTIContext, getMembers} from "../../../api";
    import {flash} from "../../../stores/flash";
    import {onMount} from "svelte";
    import AwardBadgeModal from "./AwardBadgeModal.svelte";
    import {isEmpty} from "lodash";
    import Spinner from "../../Spinner.svelte";
    import {ltiContext} from "../../../stores/lti";
    import {roles} from "../../../util/lti";

    export let badgeclass;
    export let enrollments;
    export let refresh;
    export let existingDirectAwardsEppns;

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

    onMount(() => {
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
        errors = {...errors, [`eppn_${i}`]: val.trim().length === 0}
        errorsDuplications = {
            ...errorsDuplications,
            [`eppn_${i}`]: directAwards.filter(da => da.eppn === val).length > 1 && val.trim().length > 0
        }
        errorsAlreadyAwarded = {
            ...errorsAlreadyAwarded,
            [`eppn_${i}`]: existingDirectAwardsEppns.some(eppn => eppn === val)
        }
    }

    const doAward = () => {
        beforeCommit = false;
        invariant(directAwards);
        if (Object.values(errors).some(val => val)) {
            return;
        }
        createDirectAwards(directAwards, badgeclass, false, true)
            .then(() => {
                refresh(() => setTimeout(() => navigate(`/badgeclass/${badgeclass.entityId}/awarded`), 75));
                flash.setValue(I18n.t("badgeAward.directAward.flash.created"));
            }).catch(() => {
            refresh(() => setTimeout(() => navigate(`/badgeclass/${badgeclass.entityId}/awarded`), 75));
            flash.setValue(I18n.t("badgeAward.directAward.flash.created"));
        });
    };

    //Need to rebuild the errors as in-between values might be removed
    const invariant = newDirectAwards => {
        errors = newDirectAwards.reduce((acc, da, i) => {
            acc[`eppn_${i}`] = da.eppn.trim().length === 0;
            acc[`email_${i}`] = !validEmail(da.email);
            acc[`evidence_${i}`] = badgeclass.evidenceRequired && !da.evidence_url;
            acc[`narrative_${i}`] = badgeclass.narrativeRequired && !da.narrative;
            return acc;
        }, {});
        errorsAlreadyAwarded = newDirectAwards.reduce((acc, da, i) => {
            acc[`eppn_${i}`] = existingDirectAwardsEppns.some(eppn => eppn === da.eppn);
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
      margin-bottom: 20px;
      max-width: 50%;
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
        <h2>{I18n.t("badgeAward.ltiAward.title")}</h2>
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
                                <Error standAlone={true} error_code={928}/>
                            {/if}
                            {#if errorsDuplications[`eppn_${i}`]}
                                <Error standAlone={true} error_code={930}/>
                            {/if}
                            {#if errorsAlreadyAwarded[`eppn_${i}`]}
                                <Error standAlone={true} error_code={931}/>
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
            {#if users.length === 0}
                <div class="imported">
                    <p>
                        {@html I18n.t("badgeAward.ltiAward.noUsers", {
                            nbr: users.length, name: launchData["iss"]
                        })}
                        <a use:link href={"/lti/participants"}>
                            {I18n.t("badgeAward.ltiAward.checkContext")}
                        </a>
                    </p>
                </div>
            {:else}
                <div class="imported">
                    <p>{@html I18n.t("badgeAward.ltiAward.usersImported", {
                        nbr: users.length, name: launchData["iss"]
                    })}</p>
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
            badgeClass={badgeclass}
            submit={awardModalSubmit}
            awardMode={false}
            cancel={awardModalCancel}/>
{/if}
