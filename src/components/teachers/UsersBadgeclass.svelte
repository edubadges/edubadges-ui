<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { Button, CheckBox } from "../../components";
  import { UsersTable } from "../teachers";
  import { sortType } from "../../util/sortData";
  import I18n from "i18n-js";
  import {
      makeUserBadgeclassOwner,
      makeUserBadgeclassEditor,
      makeUserBadgeclassAwarder,
      removeUserBadgeclassPermission
  } from "../../api";
  import { AddPermissionsModal, Modal} from "../forms";

  export let userId;

  let user;
  let currentUser;
  let faculties;
  let issuerSearch;

  let selection = [];
  let checkAllValue = false;

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
          name
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
        entityId
      },
      mayAdministrateUsers,
      mayAward
    }
    issuerStaffs {
      entityId,
      issuer {
        badgeclasses {
          name
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
            name
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

  onMount(() => {
    queryData(query).then(res => {
      faculties = res.currentInstitution.faculties;
      user = res.user;
      currentUser = res.currentUser;
    });
  });

  const tableHeaders = [
    {
      name: I18n.t("editUsers.badgeClass.header"),
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
    title: `${I18n.t("editUsers.institutionPermissions")}`,
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

  const reload = () => {
    queryData(query).then(res => {
      faculties = res.currentInstitution.faculties;
      user = res.user;
      currentUser = res.currentUser;
    });
  };

  const submitPermissions = () => {
    switch (modalChosenRole.name) {
      case 'owner':
        makeUserBadgeclassOwner(modalSelectedBadgeClass, userId).then(() => {
          reload();
          showAddModal = false;
        });
        break;
      case 'editor':
        makeUserBadgeclassEditor(modalSelectedBadgeClass, userId).then(() => {
          reload();
          showAddModal = false;
        });
        break;
      case 'awarder':
        makeUserBadgeclassAwarder(modalSelectedBadgeClass, userId).then(() => {
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
    selectEntity = 'badgeClass';
    addModalAction = submitPermissions;
  };

  const removePermissions = () => {
    showRemoveModal = true;
    removeModalTitle = I18n.t(['editUsers', 'permissions', 'removePermissions']);
    removeModalQuestion = 'badgeClass';
    removeModalAction = removeSelectedPermissions;
  };

  const permissionsRoles = [
    {name: 'editor'},
    {name: 'awarder'},
    {name: 'owner'}
  ];

  $: buttons = [
    {
      'action': removePermissions,
      'text': I18n.t(['editUsers', 'permissions', 'removePermissions']),
      'allowed': (currentUser && currentUser.institutionStaff.mayAdministrateUsers && selection.length > 0),
    },
    {
      'action': addPermissions,
      'text': I18n.t(['editUsers', 'permissions', 'addPermissions']),
      'allowed': (currentUser && currentUser.institutionStaff.mayAdministrateUsers),
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

  }
</script>

<style>
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .container {
    display: flex;
    flex-direction: column;
  }
</style>

{#if user}
  <div class="container">
    <UsersTable
        {...table}
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
        <td>{badgeclassStaffMembership.badgeclass.name}</td>
        <td>
          {#if badgeclassStaffMembership.mayAdministrateUsers}
            {I18n.t(['editUsers', 'badgeClass', 'owner'])}
          {:else if badgeclassStaffMembership.mayUpdate}
            {I18n.t(['editUsers', 'badgeClass', 'editor'])}
          {:else if badgeclassStaffMembership.mayAward}
            {I18n.t(['editUsers', 'badgeClass', 'awarder'])}
          {/if}
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
                disabled={true}
                onChange={val => (console.log(val))}/>
          </td>
          <td>{badgeclass.name}</td>
          <td>
            {I18n.t(['editUsers', 'issuer', 'allRights'])}
          </td>
        </tr>
      {/each}
    {/each}
      {#each user.facultyStaffs as facultyStaffMembership}
        {#each facultyStaffMembership.issuers as issuer}
          {#each issuer.badgeclasses as badgeclass}
            <tr>
              <td>
                <CheckBox
                    value={selection.includes(badgeclass.entityId)}
                    name={`select-${badgeclass.entityId}`}
                    disabled={true}
                    onChange={val => (console.log(val))}/>
              </td>
              <td>{badgeclass.name}</td>
              <td>
                {I18n.t(['editUsers', 'issuerGroup', 'allRights'])}
              </td>
            </tr>
          {/each}
        {/each}
      {/each}
      {#if user.institutionStaff.mayAdministrateUsers}
        {#each faculties as faculty}
          {#each faculty.issuers as issuer}
            {#each issuer.badgeclasses as badgeclass}
                <tr>
                  <td>
                    <CheckBox
                        value={selection.includes(badgeclass.entityId)}
                        name={`select-${badgeclass.entityId}`}
                        disabled={true}
                        onChange={val => (console.log(val))}/>
                  </td>
                  <td>{badgeclass.name}</td>
                  <td>
                    {I18n.t(['editUsers', 'institution', 'allRights'])}
                  </td>
                </tr>
            {/each}
          {/each}
        {/each}
      {/if}
    </UsersTable>
  </div>
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
    entity={'badgeclass'}
    bind:target={modalSelectedBadgeClass}
    bind:chosenRole={modalChosenRole}
    bind:notes={modalNotes}
  >
  </AddPermissionsModal>
{/if}
