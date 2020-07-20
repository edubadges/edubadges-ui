<script>
  import {entityType} from "../../util/entityTypes";
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {Button, CheckBox} from "../../components";
  import {UsersTable} from "../teachers";
  import {sortType} from "../../util/sortData";
  import I18n from "i18n-js";
  import {
    makeUserIssuerGroupAdmin,
    removeUserIssuerGroupAdmin
  } from "../../api";
  import {AddPermissionsModal, Modal} from "../forms";
  import Spinner from "../Spinner.svelte";
  import {permissionsRole} from "../../util/rolesToPermissions";
  import ListLink from "./ListLink.svelte";
  import {userAlreadyHasPermissions} from "../../util/userPermissions";

  export let userId;

  let user;
  let currentUser;
  let faculties;
  let newPermissionOptions = [];
  let institutionId;
  let issuerGroupSearch;

  let selection = [];
  let checkAllValue = false;

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

  const reload = () => {
    loaded = false;
    queryData(query).then(res => {
      institutionId = res.currentInstitution.entityId;
      faculties = res.currentInstitution.faculties;
      const institutionStaffs = res.user.institutionStaff;
      const issuerGroupStaffs = res.user.facultyStaffs;
      const issuerStaffs = res.user.issuerStaffs;
      const badgeClassStaffs = res.user.badgeclassStaffs;
      newPermissionOptions = faculties.filter(faculty => !userAlreadyHasPermissions(faculty, entityType.ISSUER_GROUP, institutionStaffs, issuerGroupStaffs, issuerStaffs, badgeClassStaffs));
      modalSelectedEntity = newPermissionOptions[0];
      user = res.user;
      currentUser = res.currentUser;
      isEmpty = user.facultyStaffs.length === 0 &&
        (!user.institutionStaff || (user.institutionStaff && faculties.length === 0));
      loaded = true;
    });
  };

  onMount(reload);

  const tableHeaders = [
    {
      name: I18n.t("editUsers.faculty.header"),
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
  let modalSelectedEntity;
  let modalChosenRole;
  let modalNotes;

  // Remove permissions modal
  let showRemoveModal = false;
  let removeModalTitle;
  let removeModalQuestion;
  let removeModalAction;

  $: table = {
    entity: "user",
    title: `${I18n.t("editUsers.institutionPermissions", {instance: I18n.t("editUsers.faculty.header")})}`,
    tableHeaders: tableHeaders
  };

  const submitPermissions = () => {
    switch (modalChosenRole.value) {
      case permissionsRole.ADMIN:
        makeUserIssuerGroupAdmin(modalSelectedEntity.entityId, userId, modalNotes).then(() => {
          reload();
          showAddModal = false;
        });
        break;
      default:
        throw new Error(`Invalid role ${modalChosenRole.value}`)
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
    removeModalQuestion = I18n.t(['editUsers', 'permissions', 'removeIssuerGroupAdmin']);
    removeModalAction = removeSelectedPermissions;
  };

  const permissionsRoles = [{value: permissionsRole.ADMIN, name: I18n.t("editUsers.faculty.admin")}];

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
      'disabled': newPermissionOptions.length === 0
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

{#if loaded}
  <div class="container">
    <UsersTable
      {...table}
      isEmpty={isEmpty}
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
              onChange={val => onCheckOne(val, facultyStaffMembership.entityId)}/>
          </td>
          <td><ListLink path={`/manage/faculty/${facultyStaffMembership.faculty.entityId}/issuers`} name={facultyStaffMembership.faculty.name}/></td>
          <td>
            {I18n.t(['editUsers', 'faculty', 'allRights'])}
          </td>
        </tr>
      {/each}
      {#if user.institutionStaff}
        {#each faculties as faculty}
          <tr>
            <td>
              <CheckBox
                value={''}
                name={''}
                disabled={true}}/>
            </td>
            <td><ListLink path={`/manage/faculty/${faculty.entityId}/issuers`} name={faculty.name}/></td>
            <td>
              {I18n.t(['editUsers', 'permissions', 'allRights'])}
              <br/>
              <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'institutionAllRights'])}</span>
            </td>
          </tr>
        {/each}
      {/if}
      {#if isEmpty}
        <tr>
          <td colspan="4">{I18n.t("zeroState.permissions",{name: I18n.t("userManagement.issuer_group_staff")})}</td>
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
  >
  </Modal>
{/if}

{#if showAddModal}
  <AddPermissionsModal
      submit={addModalAction}
      cancel={() => showAddModal = false}
      selectEntity={selectEntity}
      permissionsRoles={permissionsRoles}
      title={addModalTitle}
      bind:targetOptions={newPermissionOptions}
      bind:target={modalSelectedEntity}
      bind:chosenRole={modalChosenRole}
      bind:notes={modalNotes}
  >
  </AddPermissionsModal>
{/if}
