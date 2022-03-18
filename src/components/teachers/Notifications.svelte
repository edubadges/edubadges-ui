<script>
    import {onMount} from "svelte";
    import {queryData} from "../../api/graphql";
    import {CheckBox} from "../../components";
    import {UsersTable} from "../teachers";
    import {sort, sortType} from "../../util/sortData";
    import I18n from "i18n-js";
    import {Modal} from "../forms";
    import Spinner from "../Spinner.svelte";
    import ListLink from "./ListLink.svelte";
    import {addStaffType, expandStaffsBadgeClass, staffType} from "../../util/staffTypes";
    import {badgeclassIcon} from "../../icons";
    import {translateProperties} from "../../util/utils";
    import UserBreadcrumb from "./UserBreadcrumb.svelte";
    import NotificationsHeader from "./NotificationsHeader.svelte";
    import {updateNotifications} from "../../api";
    import {flash} from "../../stores/flash";

    let originalNotifications = [];
    let notifications = [];

    let currentUser;
    let badgeClassSearch = '';
    let badgeClasses = [];

    let staffs = [];
    let filteredStaffs = [];
    let sortedFilteredStaffs = [];

    let checkAllValue = false;

    let showModal = false;

    let loaded;
    let isEmpty;

    const query = `query {
    notifications {
      badgeclass {
        entityId
      }
    },
    currentInstitution {
      id,
      entityId,
      nameDutch,
      nameEnglish,
      faculties {
        nameDutch,
        nameEnglish,
        entityId,
        issuers {
          nameDutch,
          nameEnglish,
          entityId,
          badgeclasses {
            name,
            entityId,
            image
          },
        }
      }
    },
    currentUser {
      entityId,
      firstName,
      lastName,
      email,
      institutionStaff {
        entityId,
        mayAdministrateUsers
      },
      facultyStaffs {
        entityId,
        mayUpdate,
        faculty {
          entityId
        }
      }
      issuerStaffs {
        entityId,
        mayAdministrateUsers,
        mayUpdate,
        mayAward,
        issuer {
          entityId
        }
      }
      badgeclassStaffs {
        entityId,
        mayAdministrateUsers,
        mayUpdate,
        mayAward,
        badgeclass {
          entityId
        }
      },
    }
  }`;

    const reload = () => {
        loaded = false;
        queryData(query).then(res => {
            const currentInstitution = res.currentInstitution;
            translateProperties(currentInstitution);

            const facultyMap = {};
            const issuerMap = {};
            const badgeClassMap = {};

            currentInstitution.faculties.forEach(faculty => {
                translateProperties(faculty);
                faculty.institution = currentInstitution;
                facultyMap[faculty.entityId] = faculty;
                faculty.issuers.forEach(issuer => {
                    translateProperties(issuer);
                    issuerMap[issuer.entityId] = issuer;
                    issuer.faculty = faculty;
                    issuer.badgeclasses.forEach(badgeclass => {
                        badgeclass.issuer = issuer
                        badgeClassMap[badgeclass.entityId] = badgeclass;
                    })
                })
            });
            currentUser = res.currentUser;
            const institutionStaffs = currentUser.institutionStaff ? addStaffType([currentUser.institutionStaff], staffType.INSTITUTION_STAFF) : [];
            const issuerGroupStaffs = addStaffType(currentUser.facultyStaffs, staffType.ISSUER_GROUP_STAFF);
            const issuerStaffs = addStaffType(currentUser.issuerStaffs, staffType.ISSUER_STAFF);
            const badgeClassStaffs = addStaffType(currentUser.badgeclassStaffs, staffType.BADGE_CLASS_STAFF);

            institutionStaffs.forEach(staff => staff.institution = currentInstitution);
            issuerGroupStaffs.forEach(staff => staff.faculty = facultyMap[staff.faculty.entityId]);
            issuerStaffs.forEach(staff => staff.issuer = issuerMap[staff.issuer.entityId]);
            badgeClassStaffs.forEach(staff => staff.badgeclass = badgeClassMap[staff.badgeclass.entityId]);

            staffs = expandStaffsBadgeClass(institutionStaffs, issuerGroupStaffs, issuerStaffs, badgeClassStaffs);
            staffs.forEach(staff => staff.entityId = staff.badgeClass.entityId);
            notifications = staffs.map(staff => ({
                selected: res.notifications.some(notification => notification.badgeclass.entityId === staff.entityId),
                entityId: staff.entityId
            }));
            originalNotifications = res.notifications;
            isEmpty = staffs.length === 0;
            checkAllValue = notifications.filter(n => n.selected).length === staffs.length;
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
            attribute: "badgeClass.name",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "50%"
        },
        {
            name: I18n.t("editUsers.badgeclass.issuedBy"),
            attribute: "badgeClass.issuer.name",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "25%"
        },
        {
            name: I18n.t("editUsers.role"),
            attribute: "role",
            reverse: false,
            sortType: sortType.ROLES,
            width: "20%"
        }
    ];

    $: table = {
        entity: "user",
        subTitle: I18n.t("notifications.info"),
        tableHeaders: tableHeaders
    };

    let badgeClassSort = tableHeaders[0];

    const update = showConfirmation => {
        if (showConfirmation) {
            showModal = true;
        } else {
            showModal = false;
            loaded = false;
            const deletions = originalNotifications.filter(notification => !notifications.find(n => n.entityId === notification.badgeclass.entityId).selected);
            const creations = notifications.filter(notification => notification.selected && originalNotifications.every(n => n.badgeclass.entityId !== notification.entityId));
            updateNotifications({
                deletions: deletions.map(notification => ({entity_id: notification.badgeclass.entityId})),
                creations: creations.map(notification => ({entity_id: notification.entityId}))
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
                const found = originalNotifications.some(n => n.badgeclass.entityId === notification.entityId);
                return notification.selected ? found : !found;
            })
        }
    ];

    $: filteredStaffs = staffs.filter(({badgeClass}) => badgeClass.name.toLowerCase().includes(badgeClassSearch.toLowerCase()));
    $: sortedFilteredStaffs = sort(filteredStaffs, badgeClassSort.attribute, badgeClassSort.reverse, badgeClassSort.sortType);
    $: disabledCheckAll = filteredStaffs.length === 0;

    function onCheckOne(val, entityId) {
        notifications = notifications.map(notification => {
            if (notification.entityId === entityId) {
                notification.selected = val;
            }
            return notification;
        });
        checkAllValue = notifications.filter(n => n.selected).length === filteredStaffs.length;
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
        {#if isEmpty}
            <p class="zero-state">{I18n.t("zeroState.notifications")}</p>
        {:else}
            <UsersTable
                    {...table}
                    isEmpty={isEmpty}
                    bind:search={badgeClassSearch}
                    bind:sort={badgeClassSort}
                    withCheckAll={true}
                    bind:checkAllValue={checkAllValue}
                    bind:buttons={buttons}
                    {onCheckAll}
                    {disabledCheckAll}
            >
                {#each sortedFilteredStaffs as {
                    _staffType,
                    badgeClass,
                    entityId,
                    mayAdministrateUsers,
                    mayUpdate,
                    role
                }}
                    <tr>
                        <td>
                            <CheckBox
                                    value={notifications.find(notification => notification.entityId === entityId).selected}
                                    onChange={val => onCheckOne(val, entityId)}/>
                        </td>
                        <td>
                            {#if badgeClass.image}
                                <div class="img-container">
                                    <div class="img-icon">
                                        <img src={badgeClass.image} alt=""/>
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
                            <ListLink path={`/manage/badgeclass/${badgeClass.entityId}/overview`}
                                      name={badgeClass.name}/>
                        </td>
                        <td>
                            <ListLink path={`/manage/issuer/${badgeClass.issuer.entityId}/badgeclasses`}
                                      name={badgeClass.issuer.name}/>
                            <br/>
                            <span class="sub-text">{badgeClass.issuer.faculty.name}</span>
                        </td>
                        <td>
                            {#if mayUpdate}
                                {I18n.t('editUsers.permissions.allRights')}
                            {:else}
                                {I18n.t('editUsers.permissions.awarderRights')}
                            {/if}
                            {#if role === staffType.INSTITUTION_STAFF}
                                <br/>
                                <span class="sub-text">{I18n.t('editUsers.permissions.institutionAllRights')}</span>
                            {:else if role === staffType.ISSUER_GROUP_ADMIN}
                                <br/>
                                <span class="sub-text">{I18n.t('editUsers.permissions.issuerGroupAllRights')}</span>
                            {:else if role === staffType.ISSUER_GROUP_AWARDER}
                                <br/>
                                <span class="sub-text">{I18n.t('editUsers.permissions.issuerGroupAwarderRights')}</span>
                            {:else if role === staffType.ISSUER_ADMIN}
                                <br/>
                                <span class="sub-text">{I18n.t('editUsers.permissions.issuerAllRights')}</span>
                            {:else if role === staffType.ISSUER_AWARDER}
                                <br/>
                                <span class="sub-text">{I18n.t('editUsers.permissions.issuerAwarderRights')}</span>
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
