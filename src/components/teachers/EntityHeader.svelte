<script>
    import I18n from "i18n-js";
    import {EntityHeaderTabs, HeaderList} from "../teachers";
    import {Button} from "../../components";
    import {role} from "../../util/role";
    import {entityType} from "../../util/entityTypes"
    import {facultyIcon, institutionIcon, issuerIcon} from "../../icons";
    import {link} from "svelte-routing";
    import placeholder from "../../icons/forms/image-placeholder.svg";

    export let entity;
    export let object = {};
    export let mayUpdate;

    export let tabs;
    export let headerItems;
    export let visitorRole = role.TEACHER;


</script>

<style lang="scss">
    .entity {
        padding: var(--ver-padding-m) var(--hor-padding-m) 0;
        background: var(--purple-1);

        .title {
            display: flex;
            margin-bottom: 20px;

            .logo {
                display: block;
                max-height: 36px;
                max-width: 36px;
                margin-right: 20px;
            }
        }

        .logo-colour {
            color: var(--purple-8);
        }

        .content {
            display: flex;
            margin-left: 56px;
            margin-bottom: var(--ver-padding-m);
            flex-wrap: wrap;

            .img-container {
                flex-shrink: 0;
                height: 100px;
                width: 100px;
                background: white;
                margin-right: var(--hor-padding-m);
                display: flex;
                justify-content: space-around;
            }

            .img-icon {
                height: 90px;
                width: 90px;
                background-color: white;
                align-self: center;
                display: flex;
                justify-content: space-around;
            }

            .icn-container {
                flex-shrink: 0;
                height: 100px;
                width: 100px;
                margin-right: var(--hor-padding-m);
                display: flex;
                justify-content: space-around;
                background-color: white;
            }

            .icn-icon {
                height: 90px;
                width: 90px;
                align-self: center;
                display: flex;
                justify-content: space-around;
                background-color: white;
                color: var(--grey-5);
            }

            .info {
                flex: 1;
                display: flex;
                flex-direction: column;
                min-width: 600px;
            }

            .list {
                margin: var(--ver-padding-m) 0;
            }
        }
    }

    .actions {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: auto 0 auto calc(var(--hor-padding-xl) / 2);

        .button-container:first-child {
            margin-bottom: 15px;
        }
    }

    .slots {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto 0 auto calc(var(--hor-padding-xl) / 2);
    }

</style>

<div class="entity">
    <div class="title">
    <span class="logo logo-colour">{@html
        entity === entityType.INSTITUTION ? institutionIcon :
            entity === entityType.ISSUER_GROUP ? facultyIcon :
                entity === entityType.ISSUER ? issuerIcon : ''
    }</span>
        <span><h2>{object.name}</h2></span>
    </div>
    <div class="content">
        {#if object.image}
            <div class="img-container">
                <div class="img-icon">
                    <img src={object.image} alt=""/>
                </div>
            </div>
        {:else if entity === entityType.ISSUER}
            <div class="img-container">
                <div class="img-icon">
                    {#if object?.faculty?.image}
                        <img src={object.faculty.image} alt=""/>
                    {:else if object?.faculty?.institution?.image}
                        <img src={object.faculty.institution.image} alt=""/>
                    {:else}
                        {@html placeholder}
                    {/if}
                </div>
            </div>
        {/if}
        <div class="info">
            {#if entity !== entityType.BADGE_CLASS}
                <p>{object.description}</p>
            {/if}
            {#if entity === entityType.ISSUER}
                <span>{I18n.t("catalog.issuer.institution")}
                    {#if object.faculty?.onBehalfOf}
                        <a use:link
                           href={`/manage/faculty/${object.faculty?.entityId}/issuers`}>{object.faculty?.name}</a>
                    {:else}
                        <a use:link href={`/manage/institution/issuers`}>{object.faculty?.institution?.name}</a>
                    {/if}
                    <span class="country-code">({object.faculty?.institution?.countryCode})</span>
                </span>
            {/if}
            <div class="list">
                <HeaderList {entity} {headerItems}/>
            </div>
        </div>
        {#if visitorRole === role.TEACHER && mayUpdate}
            <div class="actions">
                <div class="button-container">
                    <Button fill={true}
                            disabled={!mayUpdate}
                            secondary href="edit"
                            text={I18n.t(['manage', 'edit', entity])}/>
                </div>
                <slot name="additional-actions"/>
            </div>
        {/if}
        <div class="slots">
            <slot/>
        </div>
    </div>
    <EntityHeaderTabs {tabs}/>
</div>
