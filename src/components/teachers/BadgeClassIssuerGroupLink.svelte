<script>
    import I18n from "i18n-js";
    import {link} from "svelte-routing";
    import {onMount} from "svelte";
    import {translateProperties} from "../../util/utils";

    export let isPublic;
    export let badgeClass = {};

    let faculty = {institution:{}};
    let facultyName;
    let onBehalfOf;

    onMount(() => {
        faculty = translateProperties(badgeClass.issuer.faculty);
        facultyName = faculty.name || faculty.on_behalf_of_display_name || faculty.onBehalfOfDisplayName;
        onBehalfOf = faculty.onBehalfOf || faculty.on_behalf_of;
    })

</script>

<style lang="scss">
    div.right {
        margin-left: 15px;
        display: flex;
        flex-direction: column;

        span.top {
            font-weight: bold;
            display: inline-block;
            margin-bottom: 5px;
        }

    }
</style>

<div class="right">
    <span class="top">{I18n.t("models.badgeclass.issuedBy")}</span>
    <span class="composed-url">
        {#if isPublic}
            <a use:link href={`/public/issuers/${badgeClass.issuer.entityId}`}>{badgeClass.issuer.name}</a>
        {:else}
            <a use:link href={`/manage/issuer/${badgeClass.issuer.entityId}`}>{badgeClass.issuer.name}</a>
        {/if}
        <span>{I18n.t("models.badgeclass.of")}</span>
        {#if onBehalfOf}
            {#if isPublic}
                <a use:link href={`/public/faculties/${faculty.entityId}`}>{facultyName}</a>
            {:else}
                <a use:link
                   href={`/manage/faculty/${faculty.entityId}/issuers`}>{facultyName}</a>
            {/if}
        {:else}
            {#if isPublic}
                <a use:link href={`/public/institutions/${faculty.institution.entityId}`}>{faculty.institution.name}</a>
            {:else}
                <a use:link href={`/manage/institution/issuers`}>{faculty.institution.name}</a>
            {/if}
        {/if}
    </span>
</div>