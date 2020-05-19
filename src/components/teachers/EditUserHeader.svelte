<script>
    import I18n from "i18n-js";
    import {EntityHeaderTabs, HeaderList} from "../teachers";
    import {Button} from "../../components";
    import {requestBadge} from "../../api";
    import {role} from "../../util/role";
    import {flash} from "../../stores/flash";
    import {onMount} from "svelte";
    import RemoteImage from "../RemoteImage.svelte";

    export let entity;
    export let user = {};
    export let mayUpdate;
    export let entityId;

    const tabs = [
      {
        entity: "institution",
        href: `/users/${entityId}/institution`,
      },
      {
        entity: "faculties",
        href: `/users/${entityId}/issuerGroups`,
      },
      {
        entity: "issuers",
        href: `/users/${entityId}/issuers`,
      },
      {
        entity: "badgeclasses",
        href: `/users/${entityId}/badgeclasses`,
      },
    ];
    let headerItems = [
      {
        'attr': 'memberSince',
        'type': 'link',
        '':''
      },
    ];
    export let visitorRole;
    export let enrolled;

    let imageId = "";

    const enrollStudent = () => {
        requestBadge(entityId)
                .then(() => {
                    enrolled = true;
                    flash.setValue(I18n.t('student.flash.enrolled', {name: user.name}));
                })
                .catch(err => {
                    err.then(details => {
                        flash.error(details);
                    })
                });
    };

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
                height: 100px;
                width: 100px;
                background: white;
                margin-right: var(--hor-padding-m);
            }

            .info {
                flex: 1;
                display: flex;
                flex-direction: column;
            }

            .list {
                margin: var(--ver-padding-m) 0;
            }
        }
    }
</style>

<div class="entity">
    <div class="content">
        <div class="info">
            <h2>Permissions for {user.firstName} {user.lastName}</h2>

            <div class="list">
                <HeaderList {entity} {headerItems}/>
            </div>
        </div>

      {#if visitorRole === role.STUDENT}
        {#if !enrolled}
            <Button secondary action={enrollStudent} text={I18n.t('student.enroll')} class="btn"/>
        {:else}
            <Button label="alreadyEnrolled" disabled={true} text={I18n.t('student.enrolled')}/>
        {/if}
      {/if}
      {#if mayUpdate}
        <Button secondary href="edit" text={I18n.t(['manage', 'edit', entity])}/>
      {/if}
    </div>

    <EntityHeaderTabs {tabs}/>
</div>
