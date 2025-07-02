<script>
    import {onMount} from "svelte";
    import I18n from "i18n-js";
    import {isEmpty} from "../../../util/utils";
    import Button from "../../Button.svelte";
    import RequestEndorsementModal from "./RequestEndorsementModal.svelte";
    import loader from "../../../icons/loader.svg"
    import {createEndorsement, fetchRawEndorsementsBadgeClasses} from "../../../api";
    import {flash} from "../../../stores/flash";
    import {config} from "../../../util/config";

    export let badgeClass = {issuer: {faculty: {institution}}};
    let showModal = false;
    let badgeClasses = [];

    let claim = "";
    let description = "";
    let selectedBadgeClass;

    let loaded = false;
    let otherInstitution = false;

    const reload = entityIdentifiers => {
        fetchRawEndorsementsBadgeClasses().then(res => {
            const serverMediaUrl = `${config.serverUrl}/media`;
            if (isEmpty(res)) {
                loaded = true;
                return;
            }

            otherInstitution = badgeClass.issuer.faculty.institution.entityId !== res[0].institution_entity_id;
            claim = "";
            description = "";
            selectedBadgeClass = null;
            res.forEach(bc => bc.image = `${serverMediaUrl}/${bc.image}`)
            badgeClasses = res.filter(bc => !entityIdentifiers.includes(bc.entityId) && !(badgeClass.endorsed || []).some(s => s === bc.entityId));
            loaded = true;
        })

    }

    onMount(() => reload([]));

    const endorse = () => showModal = true;
    const cancel = () => showModal = false;
    const submit = () => {
        showModal = false;
        loaded = false;
        createEndorsement({
            endorsee: selectedBadgeClass.entityId,
            endorser: badgeClass.entityId,
            claim: claim,
            description: description
        }).then(() => {
            //cache is emptied async, soo we need to exclude manually
            reload([selectedBadgeClass.entityId]);
            flash.setValue(I18n.t("endorsements.flash.created"))
        })

    }

</script>

<style>
    .endorsement-view {
        display: flex;
    }

    :global(.endorsement-view span.svg svg) {
        width: 48px;
        height: auto;
    }
</style>

<div class="endorsement-view">
    {#if !loaded}
        <span class="svg">{@html loader}</span>
    {:else}
        {#if !isEmpty(badgeClasses) && otherInstitution}
            <Button action={() => endorse()}
                    text={I18n.t("endorsements.request")}
                    secondary={true}/>
        {/if}
        {#if showModal}
            <RequestEndorsementModal badgeClass={badgeClass}
                                     badgeClasses={badgeClasses}
                                     submit={submit}
                                     bind:claim={claim}
                                     bind:description={description}
                                     bind:selectedBadgeClass={selectedBadgeClass}
                                     cancel={cancel}/>
        {/if}

    {/if}
</div>