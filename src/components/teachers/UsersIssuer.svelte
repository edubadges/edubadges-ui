<script>
  import {entityType} from "../../util/entityTypes";
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {Button, CheckBox} from "../../components";
  import {UsersTable} from "../teachers";
  import {sortType} from "../../util/sortData";
  import I18n from "i18n-js";
  import {
    makeUserIssuerAdmin,
    removeUserIssuerAdmin
  } from "../../api";
  import {AddPermissionsModal, Modal} from "../forms";
  import Spinner from "../Spinner.svelte";
  import {permissionsRole} from "../../util/rolesToPermissions";
  import ListLink from "./ListLink.svelte";
  import {flatten} from "../../util/utils";
  import {userAlreadyHasAdminPermissions} from "../../util/userPermissions";
  import { addStaffType, staffType } from "../../util/staffTypes";

  export let userId;

  let user;
  let currentUser;
  let faculties = [];
  let institutionId;
  let issuerSearch;

  let staffs = [];
  let institutionStaffs = [];
  let issuerGroupStaffs = [];
  let issuerStaffs = [];

  let selection = [];
  let checkAllValue = false;
  let disabledCheckAll;

  let newPermissionOptions = [];
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
        permissions {
          mayAdministrateUsers
        }
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
    }
  },
  user(id: "${userId}") {
    firstName,
    lastName,
    entityId,
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
        entityId,
        issuers {
          name,
          entityId
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
      institutionId = res.currentInstitution.entityId;
      faculties = res.currentInstitution.faculties;
      user = res.user;
      currentUser = res.currentUser;
      institutionStaffs = res.user.institutionStaff ? addStaffType([res.user.institutionStaff], staffType.INSTITUTION_STAFF) : [];
      issuerGroupStaffs = addStaffType(res.user.facultyStaffs, staffType.ISSUER_GROUP_STAFF);
      issuerStaffs = addStaffType(res.user.issuerStaffs, staffType.ISSUER_STAFF);
      let issuers = flatten(faculties.map(fac => fac.issuers));
      newPermissionOptions = issuers.filter(issuer => !userAlreadyHasAdminPermissions(issuer, entityType.ISSUER, institutionStaffs, issuerGroupStaffs, issuerStaffs, []));
      modalSelectedEntity = newPermissionOptions[0];
      isEmpty = user.issuerStaffs.length === 0 &&
      user.facultyStaffs.length === 0 && (!user.institutionStaff || (user.institutionStaff && faculties.length === 0));
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
      name: I18n.t("editUsers.faculty.header"),
      attribute: "faculty.name",
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
    title: `${I18n.t("editUsers.institutionPermissions", {instance: I18n.t("editUsers.issuer.header")})}`,
    tableHeaders: tableHeaders
  };

  const submitPermissions = () => {
    switch (modalChosenRole.value) {
      case permissionsRole.ADMIN:
        makeUserIssuerAdmin(modalSelectedEntity.entityId, userId, modalNotes).then(() => {
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
      removeUserIssuerAdmin(selected).then(() => {
        reload();
        showRemoveModal = false;
      })
    }
    selection.length = 0;
  };

  const addPermissions = () => {
    showAddModal = true;
    addModalTitle = I18n.t(['editUsers', 'permissions', 'addPermissions']);
    selectEntity = 'issuer';
    addModalAction = submitPermissions;
  };

  const removePermissions = () => {
    showRemoveModal = true;
    removeModalTitle = I18n.t(['editUsers', 'permissions', 'removePermissions']);
    removeModalQuestion = I18n.t(['editUsers', 'permissions', 'removeIssuerAdmin']);
    removeModalAction = removeSelectedPermissions;
  };

  const permissionsRoles = [{value: "admin", name: I18n.t("editUsers.issuer.admin")}];

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

  const findFacultyByIssuerEntityId = issuerEntityId => {
    const faculty = faculties.find(faculty => faculty.issuers.find(issuer => issuer.entityId === issuerEntityId));
    return faculty || {};
  };

  $: staffs = [
    ...institutionStaffs,
    ...issuerGroupStaffs,
    ...issuerStaffs
  ];

  function onCheckOne(val, entityId) {
    if (val) {
      selection = selection.concat(entityId);
      table.checkAllValue = selection.length === staffs.filter(({_staffType}) => _staffType === staffType.ISSUER_STAFF).length;
    } else {
      selection = selection.filter(id => id !== entityId);
      table.checkAllValue = false;
    }
  }

  const onCheckAll = val => {
    selection = val ? staffs.filter(({_staffType}) => {
      return _staffType === staffType.ISSUER_STAFF
    }).map(({entityId}) => entityId) : [];
    table.checkAllValue = val;
  };

  $: disabledCheckAll = staffs.filter(({_staffType}) => _staffType === staffType.ISSUER_STAFF).length === 0;
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
        bind:search={issuerSearch}
        withCheckAll={true}
        bind:buttons={buttons}
        {onCheckAll}
        {disabledCheckAll}
    >
      {#each user.issuerStaffs as issuerStaffMembership}
        <tr>
          <td>
            <CheckBox
              value={selection.includes(issuerStaffMembership.entityId)}
              name={`select-${issuerStaffMembership.entityId}`}
              disabled={false}
              onChange={val => onCheckOne(val, issuerStaffMembership.entityId)}/>
          </td>
          <td>
            <ListLink path={`/manage/issuer/${issuerStaffMembership.issuer.entityId}/badgeclasses`}
                      name={issuerStaffMembership.issuer.name}/>
          </td>
          <td>
            <ListLink
              path={`/manage/faculty/${findFacultyByIssuerEntityId(issuerStaffMembership.issuer.entityId).entityId}/issuers`}
              name={findFacultyByIssuerEntityId(issuerStaffMembership.issuer.entityId).name}/>
          </td>
          <td>
            {I18n.t(['editUsers', 'issuer', 'allRights'])}
          </td>
        </tr>
      {/each}
      {#each user.facultyStaffs as facultyStaffMembership}
        {#each facultyStaffMembership.faculty.issuers as issuer}
          <tr>
            <td>
              <CheckBox
                value={selection.includes(facultyStaffMembership.entityId)}
                name={`select-${facultyStaffMembership.entityId}`}
                disabled={true}/>
            </td>
            <td>
              <ListLink path={`/manage/issuer/${issuer.entityId}/badgeclasses`} name={issuer.name}/>
            </td>
            <td>
              <ListLink path={`/manage/faculty/${findFacultyByIssuerEntityId(issuer.entityId).entityId}/issuers`}
                        name={findFacultyByIssuerEntityId(issuer.entityId).name}/>
            </td>
            <td>
              {I18n.t(['editUsers', 'permissions', 'allRights'])}
              <br/>
              {I18n.t(['editUsers', 'permissions', 'issuerGroupAllRights'])}
            </td>
          </tr>
        {/each}
      {/each}
      {#if user.institutionStaff}
        {#each faculties as faculty}
          {#each faculty.issuers as issuer}
            <tr>
              <td>
                <CheckBox
                  value={''}
                  name={''}
                  disabled={true}/>
              </td>
              <td>
                <ListLink path={`/manage/issuer/${issuer.entityId}/badgeclasses`} name={issuer.name}/>
              </td>
              <td>
                <ListLink path={`/manage/faculty/${findFacultyByIssuerEntityId(issuer.entityId).entityId}/issuers`}
                          name={findFacultyByIssuerEntityId(issuer.entityId).name}/>
              </td>
              <td>
                {I18n.t(['editUsers', 'permissions', 'allRights'])}
                <br/>
                <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'institutionAllRights'])}</span>
              </td>
            </tr>
          {/each}
        {/each}
      {/if}
      {#if isEmpty}
        <tr>
          <td colspan="4">{I18n.t("zeroState.permissions",{name: I18n.t("userManagement.issuer_staff")})}</td>
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
  <AddPermissionsModal
      submit={addModalAction}
      cancel={() => showAddModal = false}
      selectEntity={selectEntity}
      permissionsRoles={permissionsRoles}
      title={addModalTitle}
      targetOptions={newPermissionOptions}
      bind:target={modalSelectedEntity}
      bind:chosenRole={modalChosenRole}
      bind:notes={modalNotes}
  />
{/if}
