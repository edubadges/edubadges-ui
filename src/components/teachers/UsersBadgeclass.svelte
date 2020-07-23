<script>
  import {entityType} from "../../util/entityTypes";
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {Button, CheckBox} from "../../components";
  import {UsersTable} from "../teachers";
  import {sort, sortType} from "../../util/sortData";
  import I18n from "i18n-js";
  import {
    removeUserBadgeclassPermission,
    changeUserToBadgeclassOwner,
    changeUserToBadgeclassEditor,
    changeUserToBadgeclassAwarder
  } from "../../api";
  import {AddPermissionsBadgeClassesModal, Modal, Select} from "../forms";
  import Spinner from "../Spinner.svelte";
  import {permissionsRole} from "../../util/rolesToPermissions";
  import ListLink from "./ListLink.svelte";
  import {addStaffType, staffType, expandStaffsBadgeClass} from "../../util/staffTypes";
  import { userAlreadyHasAdminPermissions, userAlreadyHasAnyPermissions } from "../../util/userPermissions";

  export let userId;

  let user;
  let currentUser;
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

  const query = `{
  currentInstitution {
    name,
    entityId,
    faculties {
      name,
      entityId,
      issuers {
        name,
        entityId,
        badgeclasses {
          name,
          entityId,
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
      faculty {
        issuers {
          badgeclasses {
            name,
            entityId
          }
        }
      }
    },
    issuerStaffs {
      mayAdministrateUsers
    },
    badgeclassStaffs {
      mayAdministrateUsers
    },
  },
  user(id: "${userId}") {
    firstName,
    lastName,
    badgeclassStaffs {
      entityId,
      badgeclass {
        name,
        entityId,
        issuer {
          name,
          entityId,
          faculty {
            name,
            entityId
          }
        }
      },
      mayAdministrateUsers,
      mayUpdate,
      mayAward
    }
    issuerStaffs {
      entityId,
      issuer {
        name,
        entityId,
        badgeclasses {
          entityId,
          name,
          issuer {
            name,
            entityId,
            faculty {
              name,
              entityId
            }
          }
        }
      },
      mayAdministrateUsers
    }
    facultyStaffs {
      entityId,
      faculty {
        name,
        entityId,
        issuers {
          name,
          entityId,
          badgeclasses {
            name,
            entityId,
            issuer {
              name,
              entityId
              faculty {
                name,
                entityId
              }
            }
          }
        }
      },
      mayAdministrateUsers
    }
    institutionStaff {
      entityId,
      mayAdministrateUsers,
      institution {
        name,
        entityId,
        faculties {
          name,
          entityId
          issuers {
            name,
            entityId,
            badgeclasses {
              name,
              entityId,
              issuer {
                name,
                entityId,
                faculty {
                  name,
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

  const reload = () => {
    loaded = false;
    queryData(query).then(res => {
      faculties = res.currentInstitution.faculties;
      user = res.user;
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
      newPermissionOptions = badgeClasses.filter(badgeClass => !userAlreadyHasAdminPermissions(badgeClass, entityType.BADGE_CLASS, institutionStaffs, issuerGroupStaffs, issuerStaffs, badgeClassStaffs));
      removePermissionOptions = badgeClasses.filter(badgeClass => userAlreadyHasAnyPermissions(badgeClass, entityType.BADGE_CLASS, institutionStaffs, issuerGroupStaffs, issuerStaffs, badgeClassStaffs));
      isEmpty = user.badgeclassStaffs.length === 0 &&
        user.issuerStaffs.length === 0 &&
        user.facultyStaffs.length === 0 &&
        (!user.institutionStaff || (user.institutionStaff && faculties.length === 0));
      loaded = true;
    });
  };

  onMount(reload);

  const tableHeaders = [
    {
      name: I18n.t("editUsers.badgeclass.header"),
      attribute: "badgeClass.name",
      reverse: false,
      sortType: sortType.ALPHA,
      width: "38%"
    },
    {
      name: I18n.t("editUsers.badgeclass.issuedBy"),
      attribute: "badgeClass.issuer.name",
      reverse: false,
      sortType: sortType.ALPHA,
      width: "38%"
    },
    {
      name: I18n.t("editUsers.role"),
      attribute: "role",
      reverse: false,
      sortType: sortType.ROLES,
      width: "24%"
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
    for (const selected of selection) {
      removeUserBadgeclassPermission(selected).then(() => {
        reload();
        showRemoveModal = false;
      })
    }
    selection.length = 0;
  };

  const addPermissions = () => {
    showAddModal = true;
    addModalTitle = I18n.t(['editUsers', 'permissions', 'addPermissions']);
  };

  const removePermissions = () => {
    showRemoveModal = true;
    removeModalTitle = I18n.t(['editUsers', 'permissions', 'removePermissions']);
    removeModalQuestion = I18n.t(['editUsers', 'permissions', 'removeBadgeClassUser']);
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
      checkAllValue = selection.length === filteredStaffs.filter(({_staffType}) => _staffType === staffType.BADGE_CLASS_STAFF).length;
    } else {
      selection = selection.filter(id => id !== entityId);
      checkAllValue = false;
    }
  }

  const onCheckAll = val => {
    selection = val ? filteredStaffs.filter(({_staffType}) => {
      return _staffType === staffType.BADGE_CLASS_STAFF
    }).map(({staffId}) => staffId) : [];
    checkAllValue = val;
  };

  $: disabledCheckAll = filteredStaffs.filter(({_staffType}) => _staffType === staffType.BADGE_CLASS_STAFF).length === 0;

  const handlePermissionAdded = () => {
    reload();
    showAddModal = false;
  };

  const changeUserRole = (role, id) => {
    loaded = false;
    switch (role.value) {
      case permissionsRole.OWNER:
        changeUserToBadgeclassOwner(id).then(() => {
          reload()
        });
        break;
      case permissionsRole.EDITOR:
        changeUserToBadgeclassEditor(id).then(() => {
          reload()
        });
        break;
      case permissionsRole.AWARDER:
        changeUserToBadgeclassAwarder(id).then(() => {
          reload()
        });
        break;
    }
  };
</script>

<style>
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .badgeclass-role-select {
    width: 170px;
  }

  .container {
    display: flex;
    flex-direction: column;
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
        {#if _staffType === staffType.BADGE_CLASS_STAFF}
          <tr>
            <td>
              <CheckBox
                  value={selection.includes(staffId)}
                  disabled={false}
                  onChange={val => onCheckOne(val, staffId)}/>
            </td>
            <td>
              <ListLink path={`/manage/badgeclass/${badgeClass.entityId}/overview`}
                  name={badgeClass.name}/>
            </td>
            <td>
              <ListLink path={`/manage/issuer/${badgeClass.issuer.entityId}/badgeclasses`}
                  name={badgeClass.issuer.name}/>
              <br />
              <span class="sub-text">{badgeClass.issuer.faculty.name}</span>
            </td>
            <td>
              <div class="badgeclass-role-select">
                <Select
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
          </tr>
        {:else if _staffType === staffType.ISSUER_STAFF}
          <tr>
            <td>
              <CheckBox
                  name={`select-${badgeClass.entityId}`}
                  disabled={true}/>
            </td>
            <td>
              <ListLink path={`/manage/badgeclass/${badgeClass.entityId}/overview`} name={badgeClass.name}/>
            </td>
            <td>
              <ListLink path={`/manage/issuer/${badgeClass.issuer.entityId}/badgeclasses`} name={badgeClass.issuer.name}/>
              <br />
              <span class="sub-text">{badgeClass.issuer.faculty.name}</span>
            </td>
            <td>
              {I18n.t(['editUsers', 'permissions', 'allRights'])}
              <br />
              <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'issuerAllRights'])}</span>
            </td>
          </tr>
        {:else if _staffType === staffType.ISSUER_GROUP_STAFF}
          <tr>
            <td>
              <CheckBox
                  name={`select-${badgeClass.entityId}`}
                  disabled={true}
              />
            </td>
            <td>
              <ListLink path={`/manage/badgeclass/${badgeClass.entityId}/overview`} name={badgeClass.name}/>
            </td>
            <td>
              <ListLink path={`/manage/issuer/${badgeClass.issuer.entityId}/badgeclasses`} name={badgeClass.issuer.name}/>
              <br />
              <span class="sub-text">{badgeClass.issuer.faculty.name}</span>
            </td>
            <td>
              {I18n.t(['editUsers', 'permissions', 'allRights'])}
              <br />
              <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'issuerGroupAllRights'])}</span>
            </td>
          </tr>
        {:else if _staffType === staffType.INSTITUTION_STAFF}
          <tr>
            <td>
              <CheckBox
                  name={`select-${badgeClass.entityId}`}
                  disabled={true}
              />
            </td>
            <td>
              <ListLink path={`/manage/badgeclass/${badgeClass.entityId}/overview`} name={badgeClass.name}/>
            </td>
            <td>
              <ListLink path={`/manage/issuer/${badgeClass.issuer.entityId}/badgeclasses`} name={badgeClass.issuer.name}/>
              <br />
              <span class="sub-text">{badgeClass.issuer.faculty.name}</span>
            </td>
            <td>
              {I18n.t(['editUsers', 'permissions', 'allRights'])}
              <br/>
              <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'institutionAllRights'])}</span>
            </td>
          </tr>
        {/if}
      {/each}
      {#if isEmpty}
        <tr>
          <td colspan="4">{I18n.t("zeroState.permissions",{name: I18n.t("userManagement.badge_class_staff")})}</td>
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
      title={removeModalTitle}
  />
{/if}

{#if showAddModal}
  <AddPermissionsBadgeClassesModal
      submit={addModalAction}
      bind:targetOptions={newPermissionOptions}
      cancel={() => showAddModal = false}
      title={addModalTitle}
      {badgeClassStaffs}
      {userId}
      on:permissionAdded={handlePermissionAdded}
  />
{/if}
