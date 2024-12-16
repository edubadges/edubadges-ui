<script>
    import I18n from "i18n-js";
    import {EntityHeaderTabs, HeaderList} from "../teachers";
    import {Button} from "../../components";
    import {role} from "../../util/role";
    import {entityType} from "../../util/entityTypes"
    import BadgeClassIssuerGroupLink from "./BadgeClassIssuerGroupLink.svelte";

    export let entity;
    export let object = {};
    export let mayUpdate;
    export let hasDescription = false;
    export let isPublic = true;

    export let tabs;
    export let headerItems;
    export let visitorRole = role.TEACHER;

</script>

<style lang="scss">
    .entity {
        padding: var(--ver-padding-m) var(--hor-padding-m) 0;
        background: var(--purple-1);

        .content {
            display: flex;
            margin-bottom: var(--ver-padding-m);

            .img-container {
                flex-shrink: 0;
                height: 120px;
                width: 120px;
                background: white;
                margin-right: var(--hor-padding-m);
                display: flex;
                justify-content: space-around;
            }

            .img-icon {
                height: 100px;
                width: 100px;
                background-color: white;
                align-self: center;
                display: flex;
                justify-content: space-around;
            }

            .info {
                flex: 1;
                display: flex;
                flex-direction: column;
            }

            .badge-class-sub-info {
                display: flex;
                align-items: center;

                div.sub-img-container {
                    width: 50px;
                    height: auto;
                }

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
            }

            .list {
                margin: var(--ver-padding-m) 0;
            }
        }

        @media (max-width: 1120px) {
            .content {
                flex-direction: column;
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
    <div class="content">
        {#if object.image}
            <div class="img-container">
                <div class="img-icon">
                    <img src={object.image} alt=""/>
                </div>
            </div>
        {/if}
        <div class="info">
            <h2>{object.name}</h2>
            {#if hasDescription}
                <h4>{object.description}</h4>
            {/if}
            <slot name="institution"/>
            {#if entity === entityType.BADGE_CLASS && object.issuer && object.issuer.faculty && object.issuer.faculty.institution}
                <div class="badge-class-sub-info">
                    <div class="sub-img-container">
                        {#if object.issuer.image}
                            <img src={object.issuer.image} alt=""/>
                        {:else if object.issuer.faculty.image}
                            <img src={object.issuer.faculty.image} alt=""/>
                        {:else}
                            <img src={object.issuer.faculty.institution.image} alt=""/>
                        {/if}
                    </div>
                    <BadgeClassIssuerGroupLink isPublic={isPublic} badgeClass={object}/>
                </div>
            {/if}
            <div class="list">
                <HeaderList {entity} {headerItems}/>
            </div>
        </div>
        {#if visitorRole === role.TEACHER}
            <div class="actions">
                <div class="button-container">
                    {#if mayUpdate}
                        <Button fill={true} secondary href="edit" text={I18n.t(['manage', 'edit', entity])}/>
                    {/if}
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
