<script>
  import {entityType} from "../../util/entityTypes";
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {Button, CheckBox} from "../../components";
  import {UsersTable} from "../teachers";
  import {sortType} from "../../util/sortData";
  import I18n from "i18n-js";
  import {
    makeUserBadgeclassOwner,
    makeUserBadgeclassEditor,
    makeUserBadgeclassAwarder,
    removeUserBadgeclassPermission,
    changeUserToBadgeclassOwner,
    changeUserToBadgeclassEditor,
    changeUserToBadgeclassAwarder
  } from "../../api";
  import {AddPermissionsModal, Modal, Select} from "../forms";
  import Spinner from "../Spinner.svelte";
  import {permissionsRole} from "../../util/rolesToPermissions";

  export let userId;

  let user;
  let currentUser;
  let faculties;
  let issuerSearch;

  let selection = [];
  let checkAllValue = false;

  let badgeclasses = [];
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
          entityId
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
          name
        }
      },
      mayAdministrateUsers,
      mayUpdate,
      mayAward
    }
    issuerStaffs {
      entityId,
      issuer {
        badgeclasses {
          name,
          issuer {
            name
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
          badgeclasses {
            name,
            issuer {
              name
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
      faculties.forEach(faculty => {
        faculty.issuers.forEach(issuer => {
          issuer.badgeclasses.forEach(badgeclass => {
            badgeclasses = [badgeclass, ...badgeclasses];
          })
        })
      });
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
      name: I18n.t("editUsers.issuer.header"),
      attribute: "name",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("editUsers.badgeclass.header"),
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
  let selectEntity;
  let addModalAction;
  let modalSelectedBadgeClass;
  let modalChosenRole;
  let modalNotes;

  // Remove permissions modal
  let showRemoveModal = false;
  let removeModalTitle;
  let removeModalQuestion;
  let removeModalAction;

  const submitPermissions = () => {
    switch (modalChosenRole.value) {
      case permissionsRole.OWNER:
        makeUserBadgeclassOwner(modalSelectedBadgeClass.entityId, userId, modalNotes).then(() => {
          reload();
          showAddModal = false;
        });
        break;
      case permissionsRole.EDITOR:
        makeUserBadgeclassEditor(modalSelectedBadgeClass.entityId, userId, modalNotes).then(() => {
          reload();
          showAddModal = false;
        });
        break;
      case permissionsRole.AWARDER:
        makeUserBadgeclassAwarder(modalSelectedBadgeClass.entityId, userId, modalNotes).then(() => {
          reload();
          showAddModal = false;
        });
        break;
      default:
        console.error('error: invalid role');
    }
  };

  const removeSelectedPermissions = () => {
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
    selectEntity = 'badgeclass';
    addModalAction = submitPermissions;
  };

  const removePermissions = () => {
    showRemoveModal = true;
    removeModalTitle = I18n.t(['editUsers', 'permissions', 'removePermissions']);
    removeModalQuestion = I18n.t(['editUsers', 'permissions', 'removeBadgeClassUser']);
    removeModalAction = removeSelectedPermissions;
  };

  const permissionsRoles = [
    {value: permissionsRole.ADMIN, name: I18n.t("editUsers.badgeclass.owner")},
    {value: permissionsRole.EDITOR, name: I18n.t("editUsers.badgeclass.editor")},
    {value: permissionsRole.AWARDER, name: I18n.t("editUsers.badgeclass.awarder")}
  ];

  $: buttons = [
    {
      'action': removePermissions,
      'text': I18n.t(['editUsers', 'permissions', 'removePermissions']),
      'allowed': (currentUser && currentUser.institutionStaff && selection.length > 0),
    },
    {
      'action': addPermissions,
      'text': I18n.t(['editUsers', 'permissions', 'addPermissions']),
      'allowed': (currentUser && currentUser.institutionStaff),
    }
  ];

  function onCheckOne(val, entityId) {
    if (val) {
      selection = selection.concat(entityId);
    } else {
      selection = selection.filter(id => id !== entityId);
      checkAllValue = false;
    }
  }

  const checkedAll = () => {

  };

  let targetOptions = [
    {name: I18n.t(['editUsers', 'badgeclass', 'badgeclassOwner']), value: 'badgeclassOwner'},
    {name: I18n.t(['editUsers', 'badgeclass', 'badgeclassEditor']), value: 'badgeclassEditor'},
    {name: I18n.t(['editUsers', 'badgeclass', 'badgeclassAwarder']), value: 'badgeclassAwarder'},
  ];
  let target = targetOptions[0];

  const changeUserRole = (role, id) => {
    switch (role.value) {
      case 'badgeclassOwner':
        changeUserToBadgeclassOwner(id).then(() => {
          reload()
        });
        break;
      case 'badgeclassEditor':
        changeUserToBadgeclassEditor(id).then(() => {
          reload()
        });
        break;
      case 'badgeclassAwarder':
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
      onCheckAll={checkedAll}
    >
      {#each user.badgeclassStaffs as badgeclassStaffMembership}
        <tr>
          <td>
            <CheckBox
              value={selection.includes(badgeclassStaffMembership.entityId)}
              name={`select-${badgeclassStaffMembership.badgeclass.entityId}`}
              disabled={false}
              onChange={val => onCheckOne(val, badgeclassStaffMembership.entityId)}/>
          </td>
          <td>{badgeclassStaffMembership.badgeclass.issuer.name}</td>
          <td>{badgeclassStaffMembership.badgeclass.name}</td>
          <td>
            <div class="badgeclass-role-select">
              <Select
                handleSelect={item => changeUserRole(item, badgeclassStaffMembership.entityId)}
                value={
                badgeclassStaffMembership.mayAdministrateUsers ? targetOptions[0] :
                (badgeclassStaffMembership.mayUpdate ? targetOptions[1] :
                (badgeclassStaffMembership.mayAward ? targetOptions[2] : 'error'))
                }
                  items={targetOptions}
                  clearable={false}
                  optionIdentifier="name"
              />
            </div>
          </td>
        </tr>
      {/each}
      {#each user.issuerStaffs as issuerStaffMembership}
        {#each issuerStaffMembership.issuer.badgeclasses as badgeclass}
          <tr>
            <td>
              <CheckBox
                value={selection.includes(badgeclass.entityId)}
                name={`select-${badgeclass.entityId}`}
                disabled={true}/>
            </td>
            <td>{badgeclass.issuer.name}</td>
            <td>{badgeclass.name}</td>
          <td>
            {I18n.t(['editUsers', 'permissions', 'allRights'])}
            <br />
            <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'issuerAllRights'])}</span>
          </td>
          </tr>
        {/each}
      {/each}
      {#each user.facultyStaffs as facultyStaffMembership}
        {#each facultyStaffMembership.faculty.issuers as issuer}
          {#each issuer.badgeclasses as badgeclass}
            <tr>
              <td>
                <CheckBox
                  value={selection.includes(badgeclass.entityId)}
                  name={`select-${badgeclass.entityId}`}
                  disabled={true}
                />
              </td>
              <td>{badgeclass.issuer.name}</td>
              <td>{badgeclass.name}</td>
              <td>
                {I18n.t(['editUsers', 'permissions', 'allRights'])}
                <br />
                <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'issuerGroupAllRights'])}</span>
              </td>
            </tr>
          {/each}
        {/each}
      {/each}
      {#if user.institutionStaff}
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
                <td>{issuer.name}</td>
                <td>{badgeclass.name}</td>
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
  <AddPermissionsModal
    submit={addModalAction}
    cancel={() => showAddModal = false}
    selectEntity={selectEntity}
      permissionsRoles={permissionsRoles}
      title={addModalTitle}
      targetOptions={badgeclasses}
      bind:target={modalSelectedBadgeClass}
      bind:chosenRole={modalChosenRole}
      bind:notes={modalNotes}
  >
  </AddPermissionsModal>
{/if}
