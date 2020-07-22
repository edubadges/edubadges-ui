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
  import {userAlreadyHasAdminPermissions} from "../../util/userPermissions";
  import {addStaffType, staffType} from "../../util/staffTypes";

  export let userId;

  let user;
  let currentUser;
  let faculties = [];
  let newPermissionOptions = [];
  let removePermissionOptions = [];

  let institutionId;
  let issuerGroupSearch;

  let staffs = [];
  let institutionStaffs = [];
  let issuerGroupStaffs = [];

  let selection = [];
  let checkAllValue = false;
  let disabledCheckAll;

  let loaded;
  let isEmpty;

  const query = `{
  currentInstitution {
    name,
    entityId,
    faculties {
      name,
      entityId,
      permissions {
        mayAdministrateUsers
      },
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
    checkAllValue = false;
    queryData(query).then(res => {
      institutionId = res.currentInstitution.entityId;
      for (const faculty of res.currentInstitution.faculties) {
        if (faculty.permissions.mayAdministrateUsers) {
          faculties = [...faculties, faculty];
        }
      }
      institutionStaffs = res.user.institutionStaff ? addStaffType([res.user.institutionStaff], staffType.INSTITUTION_STAFF) : [];
      issuerGroupStaffs = addStaffType(res.user.facultyStaffs, staffType.ISSUER_GROUP_STAFF);
      newPermissionOptions = faculties.filter(faculty => !userAlreadyHasAdminPermissions(faculty, entityType.ISSUER_GROUP, institutionStaffs, issuerGroupStaffs, [], []));
      removePermissionOptions = faculties.filter(faculty => userAlreadyHasAdminPermissions(faculty, entityType.ISSUER_GROUP, institutionStaffs, issuerGroupStaffs, [], []));
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
      sortType: sortType.ALPHA,
      width: "75%"
    },
    {
      name: I18n.t("editUsers.role"),
      attribute: "roles",
      reverse: false,
      sortType: sortType.COLLECTION,
      width: "25%"
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
      'allowed': (removePermissionOptions.length > 0 && selection.length > 0),
    },
    {
      'action': addPermissions,
      'text': I18n.t(['editUsers', 'permissions', 'addPermissions']),
      'allowed': faculties.some(faculty => faculty.permissions.mayAdministrateUsers),
      'disabled': newPermissionOptions.length === 0
    }
  ];

  $: staffs = [
    ...institutionStaffs,
    ...issuerGroupStaffs,
  ];

  function onCheckOne(val, entityId) {
    if (val) {
      selection = selection.concat(entityId);
      checkAllValue = selection.length === staffs.filter(({_staffType}) => _staffType === staffType.ISSUER_GROUP_STAFF).length;
    } else {
      selection = selection.filter(id => id !== entityId);
      checkAllValue = false;
    }
  }

  const onCheckAll = val => {
    selection = val ? staffs.filter(({_staffType}) => {
      return _staffType === staffType.ISSUER_GROUP_STAFF
    }).map(({entityId}) => entityId) : [];
    checkAllValue = val;
  };

  $: disabledCheckAll = staffs.filter(({_staffType}) => _staffType === staffType.ISSUER_GROUP_STAFF).length === 0;
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
        {onCheckAll}
        {checkAllValue}
        {disabledCheckAll}
    >
      {#each staffs as staff}
        {#if staff._staffType === staffType.ISSUER_GROUP_STAFF}
          <tr>
            <td>
              <CheckBox
                  value={selection.includes(staff.entityId)}
                  name={`select-${staff.entityId}`}
                  disabled={false}
                  onChange={val => onCheckOne(val, staff.entityId)}/>
            </td>
            <td><ListLink path={`/manage/faculty/${staff.faculty.entityId}/issuers`} name={staff.faculty.name}/></td>
            <td>
              {I18n.t(['editUsers', 'faculty', 'allRights'])}
            </td>
          </tr>
        {:else if staff._staffType === staffType.INSTITUTION_STAFF}
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
      {/each}
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
