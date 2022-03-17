<script>
    import {entityType} from "../../util/entityTypes";
    import {onMount} from "svelte";
    import {queryData} from "../../api/graphql";
    import {CheckBox} from "../../components";
    import {UsersTable} from "../teachers";
    import {sort, sortType} from "../../util/sortData";
    import I18n from "i18n-js";
    import {
        changeUserToBadgeclassAwarder,
        changeUserToBadgeclassEditor,
        changeUserToBadgeclassOwner,
        removeUserBadgeclassPermission
    } from "../../api";
    import {AddPermissionsBadgeClassesModal, Modal, Select} from "../forms";
    import Spinner from "../Spinner.svelte";
    import {permissionsRole} from "../../util/rolesToPermissions";
    import ListLink from "./ListLink.svelte";
    import {addStaffType, expandStaffsBadgeClass, staffType} from "../../util/staffTypes";
    import {userHasPermissions} from "../../util/userPermissions";
    import {flash} from "../../stores/flash";
    import {badgeclassIcon} from "../../icons";
    import {translateProperties} from "../../util/utils";

    let currentUser;
    let userNameDict;
    let badgeClassSearch = '';
    let badgeClasses = [];

    let selection = [];
    let checkAllValue = false;

    let showModal = false;

    let loaded;
    let isEmpty;

    const query = `query {
        currentInstitution {
            nameDutch,
            nameEnglish,
            entityId,
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
                    }
                }
            }
        },
        currentUser {
            institutionStaff {
                mayAdministrateUsers
            },
            facultyStaffs {
                mayAdministrateUsers,
                mayUpdate,
                faculty {
                    entityId,
                }
            },
            issuerStaffs {
                mayAdministrateUsers,
                mayUpdate,
                issuer {
                    entityId
                }
            },
            badgeclassStaffs {
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
            loaded = true;
            debugger
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
            width: "25%"
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
        },
        {
            name: "",
            width: "25%"
        }
    ];

    $: table = {
        entity: "user",
        title: `${I18n.t("editUsers.institutionPermissions", {instance: I18n.t("editUsers.badgeclass.header")})}`,
        tableHeaders: tableHeaders
    };

    let badgeClassSort = tableHeaders[0];

    const update = showConfirmation => {
        if (showConfirmation) {
            showModal = true;
        } else {
            //Update everything
        }
    };

    $: buttons = [
        {
            'action': update,
            'text': I18n.t('notifications.update'),
            'allowed': true,
        }
    ];

    $: filteredBadgeClasses = badgeClasses.filter(badgeClass => badgeClass.name.toLowerCase().includes(badgeClassSearch.toLowerCase()));
    $: disabledCheckAll = filteredBadgeClasses.length === 0;

        function onCheckOne(val, entityId) {
        if (val) {
            selection = selection.concat(entityId);
            checkAllValue = selection.length === filteredBadgeClasses.length;
        } else {
            selection = selection.filter(id => id !== entityId);
            checkAllValue = false;
        }
    }

    const onCheckAll = val => {
        selection = val ? filteredBadgeClasses.map(badgeClass => badgeClass.entityId) : [];
        checkAllValue = val;
    };

</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
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
            {#each sortedFilteredStaffs as {_staffType, badgeClass, staffId, mayAdministrateUsers, mayUpdate, mayAward}}
                <tr>
                    {#if _staffType === staffType.BADGE_CLASS_STAFF}
                        <td>
                            <CheckBox
                                    value={selection.includes(staffId)}
                                    disabled={!userHasPermissions(
                    badgeClass, entityType.BADGE_CLASS,
                    currentUser.institutionStaff,
                    currentUser.facultyStaffs,
                    currentUser.issuerStaffs,
                    currentUser.badgeclassStaffs,
                  )}
                                    onChange={val => onCheckOne(val, staffId)}/>
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
                            <div class="badgeclass-role-select">
                                <Select
                                        nonEditable={!userHasPermissions(
                      badgeClass, entityType.BADGE_CLASS,
                      currentUser.institutionStaff,
                      currentUser.facultyStaffs,
                      currentUser.issuerStaffs,
                      currentUser.badgeclassStaffs,
                    )}
                                        handleSelect={item => changeUserRole(item, staffId)}
                                        value={
                      mayAdministrateUsers ? permissionsRoles[0] :
                      mayUpdate ? permissionsRoles[1] :
                      mayAward ? permissionsRoles[2] : 'error'
                    }
                                        items={permissionsRoles}
                                        clearable={false}
                                        optionIdentifier="name"
                                />
                            </div>
                        </td>
                    {:else if _staffType === staffType.ISSUER_STAFF}
                        <td>
                            <CheckBox
                                    disabled={true}/>
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
                                <br/>
                                <span class="sub-text">{I18n.t('editUsers.permissions.issuerAllRights')}</span>
                            {:else}
                                {I18n.t('editUsers.permissions.awarderRights')}
                                <br/>
                                <span class="sub-text">{I18n.t('editUsers.permissions.issuerAwarderRights')}</span>
                            {/if}
                        </td>
                    {:else if _staffType === staffType.ISSUER_GROUP_STAFF}
                        <td>
                            <CheckBox
                                    disabled={true}
                            />
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
                                <br/>
                                <span class="sub-text">{I18n.t('editUsers.permissions.issuerGroupAllRights')}</span>
                            {:else}
                                {I18n.t('editUsers.permissions.awarderRights')}
                                <br/>
                                <span class="sub-text">{I18n.t('editUsers.permissions.issuerGroupAwarderRights')}</span>
                            {/if}
                        </td>
                    {:else if _staffType === staffType.INSTITUTION_STAFF}
                        <td>
                            <CheckBox
                                    disabled={true}
                            />
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
                            {I18n.t(['editUsers', 'permissions', 'allRights'])}
                            <br/>
                            <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'institutionAllRights'])}</span>
                        </td>
                    {/if}
                    <td></td>
                </tr>
            {/each}
            {#if isEmpty}
                <tr>
                    <td colspan="4">{I18n.t("zeroState.permissions", {entity: I18n.t("userManagement.badge_class_staff")})}</td>
                </tr>
            {/if}
        </UsersTable>
    </div>
{:else}
    <Spinner/>
{/if}

{#if showRemoveModal}
    <Modal
            submit={removeModalAction}
            cancel={() => showRemoveModal = false}
            question={removeModalQuestion}
            title={removeModalTitle}/>
{/if}

{#if showAddModal}
    <AddPermissionsBadgeClassesModal
            bind:userNameDict={userNameDict}
            busy={() => {
                loaded = false;
                showAddModal = false;
            }}
            bind:targetOptions={newPermissionOptions}
            cancel={() => showAddModal = false}
            title={addModalTitle}
            {badgeClassStaffs}
            {userId}
            on:permissionAdded={handlePermissionAdded}/>
{/if}
