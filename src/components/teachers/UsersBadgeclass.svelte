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
  import {AddPermissionsBadgeClassesModal, Modal, Select} from "../forms";
  import Spinner from "../Spinner.svelte";
  import {permissionsRole} from "../../util/rolesToPermissions";
  import ListLink from "./ListLink.svelte";
  import {flatten} from "../../util/utils";

  export let userId;

  let user;
  let currentUser;
  let faculties;
  let issuerSearch;

  let selection = [];
  let checkAllValue = false;

  let badgeClasses = [];

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
            mayAdministrateUsers,
            mayUpdate,
            mayAward
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
          faculty {
            name
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
          name,
          entityId,
          badgeclasses {
            name,
            entityId,
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
      badgeClasses = flatten(faculties.map(fac => fac.issuers.map(iss => iss.badgeclasses)));
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
        throw new Error(`error: invalid role ${modalChosenRole.value}`);
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
    {value: permissionsRole.OWNER, name: I18n.t("editUsers.badgeclass.owner")},
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
          <td>
            <ListLink path={`/manage/badgeclass/${badgeclassStaffMembership.badgeclass.entityId}/overview`}
                      name={badgeclassStaffMembership.badgeclass.name}/>
          </td>
          <td>
            <ListLink path={`/manage/issuer/${badgeclassStaffMembership.badgeclass.issuer.entityId}/badgeclasses`}
                      name={badgeclassStaffMembership.badgeclass.issuer.name}/>
            <br />
            <span class="sub-text">{badgeclassStaffMembership.badgeclass.issuer.faculty.name}</span>
          </td>
          <td>
            <div class="badgeclass-role-select">
              <Select
                  handleSelect={item => changeUserRole(item, badgeclassStaffMembership.entityId)}
                  value={
                    badgeclassStaffMembership.mayAdministrateUsers ? permissionsRoles[0] :
                    (badgeclassStaffMembership.mayUpdate ? permissionsRoles[1] :
                    (badgeclassStaffMembership.mayAward ? permissionsRoles[2] : 'error'))
                  }
                  items={permissionsRoles}
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
            <td>
              <ListLink path={`/manage/badgeclass/${badgeclass.entityId}/overview`} name={badgeclass.name}/>
            </td>
            <td>
              <ListLink path={`/manage/issuer/${issuerStaffMembership.issuer.entityId}/badgeclasses`} name={issuerStaffMembership.issuer.name}/>
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
              <td>
                <ListLink path={`/manage/badgeclass/${badgeclass.entityId}/overview`} name={badgeclass.name}/>
              </td>
              <td>
                <ListLink path={`/manage/issuer/${issuer.entityId}/badgeclasses`} name={issuer.name}/>
                <br />
                <span class="sub-text">{badgeclass.issuer.faculty.name}</span>
              </td>
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
      bind:badgeClasses={badgeClasses}
      cancel={() => showAddModal = false}
      selectEntity={selectEntity}
      title={addModalTitle}
  />
{/if}
