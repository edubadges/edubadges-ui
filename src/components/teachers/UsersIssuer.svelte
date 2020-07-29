<script>
  import {entityType} from "../../util/entityTypes";
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {Button, CheckBox} from "../../components";
  import {UsersTable} from "../teachers";
  import {sort, sortType} from "../../util/sortData";
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
  import { addStaffType, expandStaffsIssuer, staffType } from "../../util/staffTypes";

  export let userId;

  let user;
  let currentUser;
  let faculties = [];
  let institutionId;
  let issuerSearch = '';

  let staffs = [];
  let filteredStaffs = [];
  let sortedFilteredStaffs = [];

  let institutionStaffs = [];
  let issuerGroupStaffs = [];
  let issuerStaffs = [];

  let selection = [];
  let checkAllValue = false;
  let disabledCheckAll;

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
        faculty {
          name,
          entityId
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
          faculty {
            name,
            entityId
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
          issuers {
            name,
            entityId,
            faculty {
              name,
              entityId
            }
          }
        }
      }
    }
  }
 }`;
  const reload = () => {
    loaded = false;
    checkAllValue = false;
    queryData(query).then(res => {
      institutionId = res.currentInstitution.entityId;
      faculties = res.currentInstitution.faculties;
      user = res.user;
      currentUser = res.currentUser;
      institutionStaffs = res.user.institutionStaff ? addStaffType([res.user.institutionStaff], staffType.INSTITUTION_STAFF) : [];
      issuerGroupStaffs = addStaffType(res.user.facultyStaffs, staffType.ISSUER_GROUP_STAFF);
      issuerStaffs = addStaffType(res.user.issuerStaffs, staffType.ISSUER_STAFF);
      let issuers = [];
      for (const faculty of faculties) {
        for (const issuer of faculty.issuers) {
          if (issuer.permissions.mayAdministrateUsers) {
            issuers = [...issuers, issuer];
          }
        }
      }
      newPermissionOptions = issuers.filter(issuer => !userAlreadyHasAdminPermissions(issuer, entityType.ISSUER, institutionStaffs, issuerGroupStaffs, issuerStaffs, []));
      removePermissionOptions = issuers.filter(issuer => userAlreadyHasAdminPermissions(issuer, entityType.ISSUER, institutionStaffs, issuerGroupStaffs, issuerStaffs, []));
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
      attribute: "issuer.name",
      reverse: false,
      sortType: sortType.ALPHA,
      width: "38%"
    },
    {
      name: I18n.t("editUsers.faculty.header"),
      attribute: "issuer.faculty.name",
      reverse: false,
      sortType: sortType.ALPHA,
      width: "38%"
    },
    {
      name: I18n.t("editUsers.role"),
      attribute: "role",
      reverse: false,
      sortType: sortType.COLLECTION,
      width: "24%"
    }
  ];

  let issuerSort = tableHeaders[0];

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
    removeModalQuestion = I18n.t(['editUsers', 'permissions', 'remove', entityType.ISSUER]);
    removeModalAction = removeSelectedPermissions;
  };

  const permissionsRoles = [{value: "admin", name: I18n.t("editUsers.issuer.admin")}];

  $: buttons = [
    {
      'action': removePermissions,
      'text': I18n.t(['editUsers', 'permissions', 'removePermissions']),
      'allowed': removePermissionOptions.length > 0 && selection.length > 0,
    },
    {
      'action': addPermissions,
      'text': I18n.t(['editUsers', 'permissions', 'addPermissions']),
      'allowed': faculties.some(faculty => faculty.issuers.some(issuer => issuer.permissions.mayAdministrateUsers)),
      'disabled': newPermissionOptions.length === 0
    }
  ];

  const findFacultyByIssuerEntityId = issuerEntityId => {
    const faculty = faculties.find(faculty => faculty.issuers.find(issuer => issuer.entityId === issuerEntityId));
    return faculty || {};
  };

  $: staffs = expandStaffsIssuer(institutionStaffs, issuerGroupStaffs, issuerStaffs);
  $: filteredStaffs = staffs.filter(({issuer}) => issuer.name.toLowerCase().includes(issuerSearch.toLowerCase()));
  $: sortedFilteredStaffs = sort(filteredStaffs, issuerSort.attribute, issuerSort.reverse, issuerSort.sortType);

  function onCheckOne(val, entityId) {
    if (val) {
      selection = selection.concat(entityId);
      checkAllValue = selection.length === filteredStaffs.filter(({_staffType}) => _staffType === staffType.ISSUER_STAFF).length;
    } else {
      selection = selection.filter(id => id !== entityId);
      checkAllValue = false;
    }
  }

  const onCheckAll = val => {
    selection = val ? filteredStaffs.filter(({_staffType}) => {
      return _staffType === staffType.ISSUER_STAFF
    }).map(({staffId}) => staffId) : [];
    checkAllValue = val;
  };

  $: disabledCheckAll = filteredStaffs.filter(({_staffType}) => _staffType === staffType.ISSUER_STAFF).length === 0;
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
        bind:sort={issuerSort}
        withCheckAll={true}
        bind:buttons={buttons}
        {onCheckAll}
        {disabledCheckAll}
        {checkAllValue}
    >
      {#each sortedFilteredStaffs as {_staffType, issuer, staffId}}
        {#if _staffType === staffType.ISSUER_STAFF}
          <tr>
            <td>
              <CheckBox
                  value={selection.includes(staffId)}
                  disabled={false}
                  onChange={val => onCheckOne(val, staffId)}/>
            </td>
            <td>
              <ListLink
                  path={`/manage/issuer/${issuer.entityId}/badgeclasses`}
                  name={issuer.name}
              />
            </td>
            <td>
              <ListLink
                  path={`/manage/faculty/${findFacultyByIssuerEntityId(issuer.entityId).entityId}/issuers`}
                  name={findFacultyByIssuerEntityId(issuer.entityId).name}/>
            </td>
            <td>
              {I18n.t(['editUsers', 'issuer', 'allRights'])}
            </td>
          </tr>
        {:else if _staffType === staffType.ISSUER_GROUP_STAFF}
          <tr>
            <td>
              <CheckBox
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
              <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'issuerGroupAllRights'])}</span>
            </td>
          </tr>
        {:else if _staffType === staffType.INSTITUTION_STAFF}
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
        {/if}
      {/each}
      {#if isEmpty}
        <tr>
          <td colspan="4">{I18n.t("zeroState.permissions",{entity: I18n.t("userManagement.issuer_staff")})}</td>
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
