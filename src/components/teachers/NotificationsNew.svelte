<script>
    import {onMount} from "svelte";
    import {CheckBox} from "../../components";
    import {UsersTable} from "../teachers";
    import {sort, sortType} from "../../util/sortData";
    import I18n from "i18n-js";
    import {Modal} from "../forms";
    import Spinner from "../Spinner.svelte";
    import ListLink from "./ListLink.svelte";
    import {staffType} from "../../util/staffTypes";
    import {badgeclassIcon} from "../../icons";
    import {isEmpty, translatePropertiesRawQueries} from "../../util/utils";
    import UserBreadcrumb from "./UserBreadcrumb.svelte";
    import NotificationsHeader from "./NotificationsHeader.svelte";
    import {fetchRawNotifications, updateNotifications} from "../../api";
    import {flash} from "../../stores/flash";
    import {filterBySearch} from "../../stores/filterUsersNew";
    import {addPermissions} from "../../util/users";

    let originalNotificationEntityIDs = [];
    let notifications = [];

    let notificationsSearch = "";

    let checkAllValue = false;
    let showModal = false;

    let loaded;
    let noNotifications;

    const searchAttributes = ["name", "i_name", "f_name"]

    const reload = () => {
        loaded = false;
        fetchRawNotifications().then(res => {
            res.forEach(notification => {
                translatePropertiesRawQueries(notification, ["name"], ["", "i_", "f_"]);
                addPermissions(notification);
                notification.selected = !isEmpty(notification.nbc_badgeclass_id);
            });
            notifications = res;
            originalNotificationEntityIDs = res
                .filter(notification => notification.selected)
                .map(notification => notification.bc_entity_id);
            noNotifications = notifications.length === 0;

            checkAllValue = notifications.every(n => n.selected);
            loaded = true;
        });

    };

    onMount(reload);

    const tableHeaders = [
        {
            name: "",
            width: "5%",
        },
        {
            name: I18n.t("editUsers.badgeclass.header"),
            attribute: "bc_name",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "50%"
        },
        {
            name: I18n.t("editUsers.badgeclass.issuedBy"),
            attribute: "i_name",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "25%"
        },
        {
            name: I18n.t("editUsers.role"),
            attribute: "role",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "20%"
        }
    ];

    $: table = {
        entity: "user",
        subTitle: I18n.t("notifications.info"),
        tableHeaders: tableHeaders
    };

    let notificationsSort = tableHeaders[0];

    const update = showConfirmation => {
        if (showConfirmation) {
            showModal = true;
        } else {
            showModal = false;
            loaded = false;
            //All non-selected notifications that were in the originally selected list
            const deletions = notifications
                .filter(n => !n.selected && originalNotificationEntityIDs.includes(n.bc_entity_id));

            //All selected notifications that were not in the originally selected list
            const creations = notifications
                .filter(n => n.selected &&
                    !originalNotificationEntityIDs.includes(n.bc_entity_id));

            updateNotifications({
                deletions: deletions.map(n => ({entity_id: n.bc_entity_id})),
                creations: creations.map(n => ({entity_id: n.bc_entity_id}))
            }).then(() => {
                reload();
                flash.setValue(I18n.t("notifications.updated"));
            })
        }
    };

    $: buttons = [
        {
            'action': () => update(true),
            'text': I18n.t('notifications.update'),
            'allowed': true,
            'disabled': notifications.every(notification => {
                const found = originalNotificationEntityIDs.some(badgeClassEntityID => badgeClassEntityID === notification.bc_entity_id);
                return notification.selected ? found : !found;
            })
        }
    ];

    $: filteredNotifications = filterBySearch(notifications, notificationsSearch, searchAttributes);
    $: sortedFilteredStaffs = sort(filteredNotifications, notificationsSort.attribute, notificationsSort.reverse, notificationsSort.sortType);
    $: disabledCheckAll = filteredNotifications.length === 0;

    function onCheckOne(val, entityId) {
        notifications = notifications.map(notification => {
            if (notification.bc_entity_id === entityId) {
                notification.selected = val;
            }
            return notification;
        });
        checkAllValue = notifications.every(n => n.selected);
    }

    const onCheckAll = val => {
        notifications = notifications.map(notification => {
            notification.selected = val;
            return notification;
        });
        checkAllValue = val;
    };

</script>

<style>
    div.container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    div {
        flex: 1;
    }

    .icon {
        display: block;
        height: 30px;
    }

    .img-container {
        flex-shrink: 0;
        height: 55px;
        width: 55px;
        background: white;
        display: flex;
        justify-content: space-around;
    }

    p.zero-state {
        margin: 25px 50px;
    }

    .img-icon {
        height: 50px;
        width: 50px;
        background-color: white;
        align-self: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

</style>

{#if loaded}
    <div class="container">
        <UserBreadcrumb path={I18n.t("user.notifications")}/>

        <NotificationsHeader/>
        {#if noNotifications}
            <p class="zero-state">{I18n.t("zeroState.notifications")}</p>
        {:else}
            <UsersTable
                    {...table}
                    isEmpty={noNotifications}
                    bind:search={notificationsSearch}
                    bind:sort={notificationsSort}
                    withCheckAll={true}
                    bind:checkAllValue={checkAllValue}
                    bind:buttons={buttons}
                    {onCheckAll}
                    {disabledCheckAll}>
                {#each sortedFilteredStaffs as notification}
                    <tr>
                        <td>
                            <CheckBox
                                    value={notifications.find(n => n.bc_entity_id === notification.bc_entity_id).selected}
                                    onChange={val => onCheckOne(val, notification.bc_entity_id)}/>
                        </td>
                        <td>
                            {#if notification.image}
                                <div class="img-container">
                                    <div class="img-icon">
                                        <img src={notification.image} alt=""/>
                                    </div>
                                </div>
                            {:else}
                                <div class="img-container">
                                    <div class="img-icon">
                                        <span class="icon">{@html badgeclassIcon}</span>
                                    </div>
                                </div>
                            {/if}
                        </td>
                        <td>
                            <ListLink path={`/manage/badgeclass/${notification.bc_entity_id}/overview`}
                                      name={notification.name}/>
                        </td>
                        <td>
                            <ListLink path={`/manage/issuer/${notification.i_entity_id}/badgeclasses`}
                                      name={notification.i_name}/>
                            <br/>
                            <span class="sub-text">{notification.f_name}</span>
                        </td>
                        <td>
                            {#if notification.level !== "awarder"}
                                {I18n.t('editUsers.permissions.allRights')}
                            {:else}
                                {I18n.t('editUsers.permissions.awarderRights')}
                            {/if}
                            {#if notification.role === staffType.INSTITUTION_STAFF}
                                <br/>
                                <span class="sub-text">{I18n.t('editUsers.permissions.institutionAllRights')}</span>
                            {:else if notification.role === staffType.ISSUER_GROUP_ADMIN}
                                <br/>
                                <span class="sub-text">{I18n.t('editUsers.permissions.issuerGroupAllRights')}</span>
                            {:else if notification.role === staffType.ISSUER_GROUP_AWARDER}
                                <br/>
                                <span class="sub-text">{I18n.t('editUsers.permissions.issuerGroupAwarderRights')}</span>
                            {:else if notification.role === staffType.ISSUER_ADMIN}
                                <br/>
                                <span class="sub-text">{I18n.t('editUsers.permissions.issuerAllRights')}</span>
                            {:else if notification.role === staffType.ISSUER_AWARDER}
                                <br/>
                                <span class="sub-text">{I18n.t('editUsers.permissions.issuerAwarderRights')}</span>
                            {:else if notification.role === staffType.BADGE_CLASS_OWNER || notification.role === staffType.BADGE_CLASS_EDITOR}
                                <br/>
                                <span class="sub-text">{I18n.t('editUsers.permissions.badgeClassAllRights')}</span>
                            {:else if notification.role === staffType.BADGE_CLASS_AWARDER}
                                <br/>
                                <span class="sub-text">{I18n.t('editUsers.permissions.badgeClassAwarderRights')}</span>
                            {/if}
                        </td>
                    </tr>
                {/each}
            </UsersTable>
        {/if}
    </div>
{:else}
    <Spinner/>
{/if}

{#if showModal}
    <Modal
            submit={() => update(false)}
            cancel={() => showModal = false}
            question={I18n.t("notifications.confirmationQuestion")}
            title={I18n.t("notifications.confirmationTitle")}/>
{/if}
