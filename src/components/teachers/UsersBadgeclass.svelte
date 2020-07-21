<script>
  import {entityType} from "../../util/entityTypes";
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {Button, CheckBox} from "../../components";
  import {UsersTable} from "../teachers";
  import {sortType} from "../../util/sortData";
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
  import {addStaffType, staffType} from "../../util/staffTypes";
  import { userAlreadyHasAdminPermissions, userAlreadyHasAnyPermissions } from "../../util/userPermissions";

  export let userId;

  let user;
  let currentUser;
  let faculties = [];
  let issuerSearch;

  let staffs = [];
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
        entityId
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
      attribute: "name",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("editUsers.badgeclass.issuedBy"),
      attribute: "name",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("editUsers.role"),
      attribute: "roles",
      reverse: false,
      sortType: sortType.COLLECTION
    }
  ];

  $: table = {
    entity: "user",
    title: `${I18n.t("editUsers.institutionPermissions", {instance: I18n.t("editUsers.badgeclass.header")})}`,
    tableHeaders: tableHeaders
  };

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

  $: staffs = [
    ...institutionStaffs,
    ...issuerGroupStaffs,
    ...issuerStaffs,
    ...badgeClassStaffs
  ];

  function onCheckOne(val, entityId) {
    if (val) {
      selection = selection.concat(entityId);
      checkAllValue = selection.length === staffs.filter(({_staffType}) => _staffType === staffType.BADGE_CLASS_STAFF).length;
    } else {
      selection = selection.filter(id => id !== entityId);
      checkAllValue = false;
    }
  }

  const onCheckAll = val => {
    selection = val ? staffs.filter(({_staffType}) => {
      return _staffType === staffType.BADGE_CLASS_STAFF
    }).map(({entityId}) => entityId) : [];
    checkAllValue = val;
  };

  $: disabledCheckAll = staffs.filter(({_staffType}) => _staffType === staffType.BADGE_CLASS_STAFF).length === 0;

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
  }
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
        bind:search={issuerSearch}
        withCheckAll={true}
        bind:checkAllValue={checkAllValue}
        bind:buttons={buttons}
        {onCheckAll}
        {disabledCheckAll}
    >
      {#each staffs as staff}
        {#if staff._staffType === staffType.BADGE_CLASS_STAFF}
          <tr>
            <td>
              <CheckBox
                value={selection.includes(staff.entityId)}
                name={`select-${staff.badgeclass.entityId}`}
                disabled={false}
                onChange={val => onCheckOne(val, staff.entityId)}/>
            </td>
            <td>
              <ListLink path={`/manage/badgeclass/${staff.badgeclass.entityId}/overview`}
                        name={staff.badgeclass.name}/>
            </td>
            <td>
              <ListLink path={`/manage/issuer/${staff.badgeclass.issuer.entityId}/badgeclasses`}
                        name={staff.badgeclass.issuer.name}/>
              <br />
              <span class="sub-text">{staff.badgeclass.issuer.faculty.name}</span>
            </td>
            <td>
              <div class="badgeclass-role-select">
                <Select
                    handleSelect={item => changeUserRole(item, staff.entityId)}
                    value={
                      staff.mayAdministrateUsers ? permissionsRoles[0] :
                      (staff.mayUpdate ? permissionsRoles[1] :
                      (staff.mayAward ? permissionsRoles[2] : 'error'))
                    }
                    items={permissionsRoles}
                    clearable={false}
                    optionIdentifier="name"
                />
              </div>
            </td>
          </tr>
        {:else if staff._staffType === staffType.ISSUER_STAFF}
          {#each staff.issuer.badgeclasses as badgeclass}
            <tr>
              <td>
                <CheckBox
                  value={selection.includes(badgeclass.entityId)}
                  name={`select-${badgeclass.entityId}`}
                  disabled={true}/>
              </td>
              <td>
                <ListLink path={`/manage/badgeclass/${badgeclass.entityId}/overview`} name={badgeclass.name}/>
              </td>
              <td>
                <ListLink path={`/manage/issuer/${staff.issuer.entityId}/badgeclasses`} name={staff.issuer.name}/>
                <br />
                <span class="sub-text">{badgeclass.issuer.faculty.name}</span>
              </td>
            <td>
              {I18n.t(['editUsers', 'permissions', 'allRights'])}
              <br />
              <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'issuerAllRights'])}</span>
            </td>
            </tr>
          {/each}
        {:else if staff._staffType === staffType.ISSUER_GROUP_STAFF}
          {#each staff.faculty.issuers as issuer}
            {#each issuer.badgeclasses as badgeclass}
              <tr>
                <td>
                  <CheckBox
                    value={selection.includes(badgeclass.entityId)}
                    name={`select-${badgeclass.entityId}`}
                    disabled={true}
                  />
                </td>
                <td>
                  <ListLink path={`/manage/badgeclass/${badgeclass.entityId}/overview`} name={badgeclass.name}/>
                </td>
                <td>
                  <ListLink path={`/manage/issuer/${issuer.entityId}/badgeclasses`} name={issuer.name}/>
                  <br />
                  <span class="sub-text">{staff.faculty.name}</span>
                </td>
                <td>
                  {I18n.t(['editUsers', 'permissions', 'allRights'])}
                  <br />
                  <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'issuerGroupAllRights'])}</span>
                </td>
              </tr>
            {/each}
          {/each}
        {:else if staff._staffType === staffType.INSTITUTION_STAFF}
          {#each faculties as faculty}
            {#each faculty.issuers as issuer}
              {#each issuer.badgeclasses as badgeclass}
                <tr>
                  <td>
                    <CheckBox
                      value={selection.includes(badgeclass.entityId)}
                      name={`select-${badgeclass.entityId}`}
                      disabled={true}
                    />
                  </td>
                  <td>
                    <ListLink path={`/manage/badgeclass/${badgeclass.entityId}/overview`} name={badgeclass.name}/>
                  </td>
                  <td>
                    <ListLink path={`/manage/issuer/${issuer.entityId}/badgeclasses`} name={issuer.name}/>
                    <br />
                    <span class="sub-text">{faculty.name}</span>
                  </td>
                  <td>
                    {I18n.t(['editUsers', 'permissions', 'allRights'])}
                    <br/>
                    <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'institutionAllRights'])}</span>
                  </td>
                </tr>
              {/each}
            {/each}
          {/each}
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
  <Modal submit={removeModalAction}
      cancel={() => showRemoveModal = false}
      question={removeModalQuestion}
      title={removeModalTitle}>
  </Modal>
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
