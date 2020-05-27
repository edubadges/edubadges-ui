<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { Button, CheckBox } from "../../components";
  import { UsersTable } from "../teachers";
  import { sortType } from "../../util/sortData";
  import I18n from "i18n-js";
  import {
      makeUserIssuerGroupAdmin,
      removeUserIssuerGroupAdmin
  } from "../../api";
  import { AddPermissionsModal, Modal} from "../forms";

  export let userId;

  let user;
  let currentUser;
  let faculties;
  let institutionId;
  let issuerGroupSearch;

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
      }
    }
  },
  currentUser {
    institutionStaff {
      mayAdministrateUsers
    },
    facultyStaffs {
      mayAdministrateUsers
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
        name,
        entityId,
      },
      mayAdministrateUsers
    }
    facultyStaffs {
      entityId,
      faculty {
        name,
        entityId
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
      institutionId = res.currentInstitution.entityId;
      faculties = res.currentInstitution.faculties;
      user = res.user;
      currentUser = res.currentUser;
    });
  });

  const tableHeaders = [
    {
      name: I18n.t("editUsers.issuerGroup.header"),
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

  $: table = {
    entity: "user",
    title: `${I18n.t("editUsers.institutionPermissions")}`,
    tableHeaders: tableHeaders
  };

  const reload = () => {
      queryData(query).then(res => {
          faculties = res.currentInstitution.faculties;
          user = res.user;
          currentUser = res.currentUser;
      });
  };

  const submitPermissions = () => {
      switch (modalChosenRole.name) {
          case 'admin':
              makeUserIssuerGroupAdmin(modalSelectedBadgeClass, userId).then(() => {
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
        removeUserIssuerGroupAdmin(selected).then(() => {
            reload();
            showRemoveModal = false;
        })
    }
    selection.length = 0;
  };

  const addPermissions = () => {
    showAddModal = true;
    addModalTitle = I18n.t(['editUsers', 'permissions', 'addPermissions']);
    selectEntity = 'issuerGroup';
    addModalAction = submitPermissions;
  };

  const removePermissions = () => {
    showRemoveModal = true;
    removeModalTitle = I18n.t(['editUsers', 'permissions', 'removePermissions']);
    removeModalQuestion = 'issuerGroup';
    removeModalAction = removeSelectedPermissions;
  };

  const permissionsRoles = [
    {name: 'admin'}
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
        bind:search={issuerGroupSearch}
        withCheckAll={true}
        bind:buttons={buttons}
    >
      {#each user.facultyStaffs as facultyStaffMembership}
        <tr>
          <td>
            <CheckBox
                value={selection.includes(facultyStaffMembership.entityId)}
                name={`select-${facultyStaffMembership.entityId}`}
                disabled={false}
                onChange={val => (console.log(val))}/>
          </td>
          <td>{facultyStaffMembership.faculty.name}</td>
          <td>
            {I18n.t(['editUsers', 'faculty', 'allRights'])}
          </td>
        </tr>
      {/each}
      {#if user.institutionStaff.mayAdministrateUsers}
        {#each faculties as faculty}
          <tr>
            <td>
              <CheckBox
                  value={''}
                  name={''}
                  disabled={true}
                  onChange={val => (console.log(val))}/>
            </td>
            <td>{faculty.name}</td>
            <td>{I18n.t(['editUsers', 'institution', 'allRights'])}</td>
          </tr>
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
                    entity={'issuerGroup'}
                    bind:target={modalSelectedBadgeClass}
                    bind:chosenRole={modalChosenRole}
                    bind:notes={modalNotes}
    >
    </AddPermissionsModal>
{/if}
