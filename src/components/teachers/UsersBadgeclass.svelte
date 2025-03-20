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

    export let userId;

    let user;
    let currentUser;
    let userNameDict;
    let faculties = [];
    let badgeClassSearch = '';

    let staffs = [];
    let filteredStaffs = [];
    let sortedFilteredStaffs = [];

    let institutionStaffs = [];
    let issuerGroupStaffs = [];
    let issuerStaffs = [];
    let badgeClassStaffs = [];

    let selection = [];
    let checkAllValue = false;
    let disabledCheckAll;

    let badgeClasses = [];

    let newPermissionOptions = [];
    let removePermissionOptions = [];

    let loaded;
    let isEmpty;

    const query = `query ($userId: String){
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
          image,
          permissions {
            mayAdministrateUsers
          }
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
        issuers {
          entityId,
          badgeclasses {
            name,
            entityId
          }
        }
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
      mayUpdate
      badgeclass {
        entityId
      }
    },
  },
  user(id: $userId) {
    firstName,
    lastName,
    fullName,
    badgeclassStaffs {
      entityId,
      mayAdministrateUsers,
      mayUpdate,
      mayAward,
      badgeclass {
        name,
        entityId,
        image,
        issuer {
          nameDutch,
          nameEnglish,
          entityId,
          faculty {
            nameDutch,
            nameEnglish,
            entityId
          }
        }
      }
    }
    issuerStaffs {
      entityId,
      mayUpdate,
      mayAdministrateUsers,
      issuer {
        nameDutch,
        nameEnglish,
        entityId,
        badgeclasses {
          entityId,
          name,
          image,
          issuer {
            nameDutch,
            nameEnglish,
            entityId,
            faculty {
              nameDutch,
              nameEnglish,
              entityId
            }
          }
        }
      }
    }
    facultyStaffs {
      entityId,
      mayAdministrateUsers,
      mayUpdate,
      faculty {
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
            image,
            issuer {
              nameDutch,
              nameEnglish,
              entityId
              faculty {
                nameDutch,
                nameEnglish,
                entityId
              }
            }
          }
        }
      }
    }
    institutionStaff {
      entityId,
      mayAdministrateUsers,
      institution {
        nameDutch,
        nameEnglish,
        entityId,
        faculties {
          nameDutch,
          nameEnglish,
          entityId
          issuers {
            nameDutch,
            nameEnglish,
            entityId,
            badgeclasses {
              name,
              entityId,
              image,
              issuer {
                nameDutch,
                nameEnglish,
                entityId,
                faculty {
                  nameDutch,
                  nameEnglish,
                  entityId,
                }
              },
            }
          }
        }
      }
    }
  }
 }`;

    const reload = callback => {
        loaded = false;
        queryData(query, {userId}).then(res => {
            const institution = res.currentInstitution;
            faculties = institution.faculties;
            user = res.user;

            translateProperties(institution);
            faculties.forEach(faculty => {
                translateProperties(faculty);
                faculty.issuers.forEach(issuer => translateProperties(issuer))
            });
            user.badgeclassStaffs.forEach(staff => {
                translateProperties(staff.badgeclass.issuer);
                translateProperties(staff.badgeclass.issuer.faculty);
            });
            user.facultyStaffs.forEach(staff => {
                translateProperties(staff.faculty);
                staff.faculty.issuers.forEach(issuer => {
                    issuer.badgeclasses.forEach(badgeClass => {
                        translateProperties(badgeClass.issuer);
                        translateProperties(badgeClass.issuer.faculty);
                    })
                })
            });
            user.issuerStaffs.forEach(staff => {
                translateProperties(staff.issuer);
                staff.issuer.badgeclasses.forEach(badgeClass => {
                    translateProperties(badgeClass.issuer);
                    translateProperties(badgeClass.issuer.faculty);
                });
            });
            if (user.institutionStaff) {
                const userInstitution = user.institutionStaff.institution;
                translateProperties(userInstitution);
                if (userInstitution) {
                    userInstitution.faculties.forEach(faculty => {
                        translateProperties(faculty);
                        faculty.issuers.forEach(issuer => {
                            translateProperties(issuer);
                            issuer.badgeclasses.forEach(badgeClass => {
                                translateProperties(badgeClass.issuer);
                                translateProperties(badgeClass.issuer.faculty);
                            })
                        });
                    });
                }
            }

            userNameDict = {name: `${user.firstName} ${user.lastName}`};
            currentUser = res.currentUser;
            institutionStaffs = res.user.institutionStaff ? addStaffType([res.user.institutionStaff], staffType.INSTITUTION_STAFF) : [];
            issuerGroupStaffs = addStaffType(res.user.facultyStaffs, staffType.ISSUER_GROUP_STAFF);
            issuerStaffs = addStaffType(res.user.issuerStaffs, staffType.ISSUER_STAFF);
            badgeClassStaffs = addStaffType(res.user.badgeclassStaffs, staffType.BADGE_CLASS_STAFF);
            badgeClasses = [];
            for (const faculty of faculties) {
                for (const issuer of faculty.issuers) {
                    for (const badgeClass of issuer.badgeclasses) {
                        if (badgeClass.permissions.mayAdministrateUsers) {
                            badgeClasses = [...badgeClasses, badgeClass];
                        }
                    }
                }
            }
            newPermissionOptions = badgeClasses.filter(badgeClass => !userHasPermissions(badgeClass, entityType.BADGE_CLASS, institutionStaffs, issuerGroupStaffs, issuerStaffs, badgeClassStaffs, true));
            removePermissionOptions = badgeClasses.filter(badgeClass => userHasPermissions(badgeClass, entityType.BADGE_CLASS, currentUser.institutionStaff, currentUser.facultyStaffs, currentUser.issuerStaffs, currentUser.badgeclassStaffs));
            isEmpty = user.badgeclassStaffs.length === 0 &&
                user.issuerStaffs.length === 0 &&
                user.facultyStaffs.length === 0 &&
                (!user.institutionStaff || (user.institutionStaff && faculties.length === 0));
            loaded = true;
            callback && callback();
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

    // Add permissions modal
    let showAddModal = false;
    let addModalTitle;
    let addModalAction;
    let modalSelectedBadgeClass;
    let modalChosenRole;
    let modalNotes;

    // Remove permissions modal
    let showRemoveModal = false;
    let removeModalTitle;
    let removeModalQuestion;
    let removeModalAction;

    const removeSelectedPermissions = () => {
        checkAllValue = false;
        loaded = false;
        showRemoveModal = false;
        const promises = selection.map(selected => removeUserBadgeclassPermission(selected));
        Promise.all(promises).then(() => {
            reload(() => {
                selection.length = 0;
                flash.setValue(I18n.t("editUsers.flash.removeUserBadgeClassRole", userNameDict));
            });
        });
    };

    const addPermissions = () => {
        showAddModal = true;
        addModalTitle = I18n.t(['editUsers', 'permissions', 'addPermissions']);
    };

    const removePermissions = () => {
        showRemoveModal = true;
        removeModalTitle = I18n.t(['editUsers', 'permissions', 'removePermissions']);
        removeModalQuestion = I18n.t(['editUsers', 'permissions', 'remove', entityType.BADGE_CLASS]);
        removeModalAction = removeSelectedPermissions;
    };

    const permissionsRoles = [
        {value: permissionsRole.OWNER, name: I18n.t("editUsers.badgeclass.owner")},
        {value: permissionsRole.EDITOR, name: I18n.t("editUsers.badgeclass.editor")},
        {value: permissionsRole.AWARDER, name: I18n.t("editUsers.badgeclass.awarder")}
    ];

    $: buttons = [
        {
            'action': removePermissions,
            'text': I18n.t(['editUsers', 'permissions', 'removePermissions']),
            'allowed': removePermissionOptions.length > 0 && selection.length > 0,
        },
        {
            'action': addPermissions,
            'text': I18n.t(['editUsers', 'permissions', 'addPermissions']),
            'allowed': faculties.some(faculty => faculty.issuers.some(issuer => issuer.badgeclasses.some(badgeClass => badgeClass.permissions.mayAdministrateUsers))),
            'disabled': newPermissionOptions.length === 0
        }
    ];

    $: staffs = expandStaffsBadgeClass(institutionStaffs, issuerGroupStaffs, issuerStaffs, badgeClassStaffs);
    $: filteredStaffs = staffs.filter(({badgeClass}) => badgeClass.name.toLowerCase().includes(badgeClassSearch.toLowerCase()));
    $: sortedFilteredStaffs = sort(filteredStaffs, badgeClassSort.attribute, badgeClassSort.reverse, badgeClassSort.sortType);

    function onCheckOne(val, entityId) {
        if (val) {
            selection = selection.concat(entityId);
            checkAllValue = selection.length === filteredStaffs.filter(({_staffType, badgeClass}) =>
                _staffType === staffType.BADGE_CLASS_STAFF && userHasPermissions(
                    badgeClass, entityType.BADGE_CLASS,
                    currentUser.institutionStaff,
                    currentUser.facultyStaffs,
                    currentUser.issuerStaffs,
                    currentUser.badgeclassStaffs
                )).length;
        } else {
            selection = selection.filter(id => id !== entityId);
            checkAllValue = false;
        }
    }

    const onCheckAll = val => {
        selection = val ? filteredStaffs.filter(({_staffType, badgeClass}) =>
            _staffType === staffType.BADGE_CLASS_STAFF && userHasPermissions(
                badgeClass, entityType.BADGE_CLASS,
                currentUser.institutionStaff,
                currentUser.facultyStaffs,
                currentUser.issuerStaffs,
                currentUser.badgeclassStaffs
            )).map(({staffId}) => staffId) : [];
        checkAllValue = val;
    };

    $: disabledCheckAll = filteredStaffs.filter(({_staffType, badgeClass}) =>
        _staffType === staffType.BADGE_CLASS_STAFF && userHasPermissions(
            badgeClass, entityType.BADGE_CLASS,
            currentUser.institutionStaff,
            currentUser.facultyStaffs,
            currentUser.issuerStaffs,
            currentUser.badgeclassStaffs
        )).length === 0;

    const handlePermissionAdded = () => {
        showAddModal = false;
        reload();
    };

    const changeUserRole = (role, id) => {
        loaded = false;
        switch (role.value) {
            case permissionsRole.OWNER:
                changeUserToBadgeclassOwner(id).then(() => {
                    reload(() => flash.setValue(I18n.t("editUsers.flash.makeUserBadgeClassAdmin", userNameDict)));
                });
                break;
            case permissionsRole.EDITOR:
                changeUserToBadgeclassEditor(id).then(() => {
                    reload(() => flash.setValue(I18n.t("editUsers.flash.makeUserBadgeClassEditor", userNameDict)));
                });
                break;
            case permissionsRole.AWARDER:
                changeUserToBadgeclassAwarder(id).then(() => {
                    reload(() => flash.setValue(I18n.t("editUsers.flash.makeUserBadgeClassAwarder", userNameDict)));
                });
                break;
        }
    };
</script>

<style>
    .badgeclass-role-select {
        width: 170px;
    }

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
