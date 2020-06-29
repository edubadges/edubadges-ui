<script>
  import {staffType} from "../../util/staffTypes"
  import {entityType} from "../../util/entityTypes"
  import {CheckBox} from "../index";
  import {UsersTable, InvitationStatusWidget} from "../teachers";
  import {Select, Modal} from "../forms";
  import I18n from "i18n-js";
  import { navigate } from "svelte-routing";
  import {
      changeProvisionmentToBadgeclassAwarder,
      changeProvisionmentToBadgeclassEditor,
      changeProvisionmentToBadgeclassOwner,
      changeUserToBadgeclassAwarder,
      changeUserToBadgeclassEditor,
      changeUserToBadgeclassOwner,
      disinviteUser,
      removeStaffMembership
  } from "../../api";
  import { sort, sortType } from "../../util/sortData";
  import { searchMultiple } from "../../util/searchData";
  import {flash} from "../../stores/flash";

  export let entity;
  export let entityId;
  export let permissions;
  export let reload;

  export let institutionStaffs = [];
  export let issuerGroupStaffs = [];
  export let issuerStaffs = [];
  export let badgeClassStaffs = [];
  export let userProvisionments = [];
  let staffs = [];

  let selection = [];
  $: staffs = [
    ...institutionStaffs,
    ...issuerGroupStaffs,
    ...issuerStaffs,
    ...badgeClassStaffs,
    ...userProvisionments
  ];

  // Remove permissions modal
  let showRemoveModal = false;
  export let removeModalTitle;
  export let removeModalQuestion;
  let removeModalAction;

  let targetOptions = [
    {name: I18n.t(['editUsers', 'badgeClass', 'badgeclassOwner']), value: 'badgeclassOwner'},
    {name: I18n.t(['editUsers', 'badgeClass', 'badgeclassEditor']), value: 'badgeclassEditor'},
    {name: I18n.t(['editUsers', 'badgeClass', 'badgeclassAwarder']), value: 'badgeclassAwarder'},
  ];

  const changeUserRole = (role, id) => {
    switch(role.value) {
      case 'badgeclassOwner':
        changeUserToBadgeclassOwner(id).then(() => {
          reload();
          flash.setValue(I18n.t('editUsers.badgeClass.switchToOwner'))
        });
        break;
      case 'badgeclassEditor':
        changeUserToBadgeclassEditor(id).then(() => {
          reload();
          flash.setValue(I18n.t('editUsers.badgeClass.switchToEditor'))
        });
        break;
      case 'badgeclassAwarder':
        changeUserToBadgeclassAwarder(id).then(() => {
          reload();
          flash.setValue(I18n.t('editUsers.badgeClass.switchToAwarder'))
        });
        break;
    }
  };

  const changeProvisionmentRole = (role, id) => {
    switch(role.value) {
      case 'badgeclassOwner':
        changeProvisionmentToBadgeclassOwner(id).then(() => {
          reload();
          flash.setValue(I18n.t('editUsers.badgeClass.switchToOwner'))
        });
        break;
      case 'badgeclassEditor':
        changeProvisionmentToBadgeclassEditor(id).then(() => {
          reload();
          flash.setValue(I18n.t('editUsers.badgeClass.switchToEditor'))
        });
        break;
      case 'badgeclassAwarder':
        changeProvisionmentToBadgeclassAwarder(id).then(() => {
          reload();
          flash.setValue(I18n.t('editUsers.badgeClass.switchToAwarder'))
        });
        break;
    }
  };

  const removeSelectedPermissions = () => {
    for (const {entityId, _staffType} of selection) {
      if (_staffType === staffType.USER_PROVISIONMENT) {
        disinviteUser(entityId).then(() => {
          reload();
          showRemoveModal = false;
        });
      } else {
        removeStaffMembership(entity, entityId).then(() => {
          reload();
          showRemoveModal = false;
        })
      }
    }
  };

  const removePermissions = () => {
    showRemoveModal = true;
    removeModalAction = removeSelectedPermissions;
  };

  const inviteNewUser = () => {
      navigate(`/manage/${entity}${entity !== entityType.INSTITUTION ? '/' + entityId : ''}/user-management/invite-new-user`, {replace: false});
  };

  $: buttons = [
    {
      'action': removePermissions,
      'text': I18n.t(['editUsers', 'permissions', 'removePermissions']),
      'allowed': (permissions && permissions.mayAdministrateUsers && selection.length > 0),
    },
    {
      'action': inviteNewUser,
      'text': I18n.t(['editUsers', 'permissions', 'inviteNewUser']),
      'allowed': (permissions && permissions.mayAdministrateUsers),
    }
  ];

  const tableHeaders = [
    {
      name: I18n.t(["teacher", "nameEmail"]),
      attribute: "name",
      reverse: false,
      sortType: sortType.PERSONAL_DATA
    },
    {
      name: I18n.t("editUsers.role"),
      attribute: "roles",
      reverse: false,
      sortType: sortType.ROLES
    },
    {
      name: I18n.t(["inviteUsers", "inviteStatus"]),
      attribute: "invitation",
      reverse: false,
      sortType: sortType.INVITATION_STATUS
    }
  ];

  $: table = {
    entity: "user",
    title: `${I18n.t("editUsers.usersPermissions")}`,
    tableHeaders: tableHeaders,
    withCheckAll: true,
  };

  const onCheckAll = val => {
    selection = val ? staffs.map(({entityId, _staffType}) => ({entityId, _staffType})) : []; // TODO: filter
    table.checkAllValue = val;
  };

  const onCheckOne = (val, _entityId, _staffType) => {
    if (val) {
      selection = selection.concat({entityId: _entityId, _staffType});
      table.checkAllValue = selection.length === staffs.length;
    } else {
      selection = selection.filter(({entityId}) => entityId !== _entityId);
      table.checkAllValue = false;
    }
  };

  let staffSearch = '';
  let staffSort = tableHeaders[2];

  $: searchedStaffIds = searchMultiple(staffs, staffSearch, "entityId", "user.firstName", "email", "user.lastName", "user.email");

  $: sortedFilteredStaffs = sort(
    staffs.filter(el => searchedStaffIds.includes(el.entityId)),
    staffSort.attribute,
    staffSort.reverse,
    staffSort.sortType
  )
</script>

<style>
  .container {
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

  tr {
    height: 53px;
  }
</style>

<div class="container">
  <UsersTable
      {...table}
      {onCheckAll}
      bind:buttons={buttons}
      bind:search={staffSearch}
      bind:sort={staffSort}
  >
    {#each sortedFilteredStaffs as {_staffType, user, entityId, email, createdAt, rejected, mayAdministrateUsers, mayUpdate, mayAward, data} (entityId)}
      <tr>
        {#if _staffType === staffType.USER_PROVISIONMENT}
          <td>
            <CheckBox
                value={selection.some(el => el.entityId === entityId)}
                name={`select-${entityId}`}
                disabled={false}
                onChange={val => onCheckOne(val, entityId, _staffType)}/>
          </td>
          <td>{email}</td>
          {#if entity === entityType.BADGE_CLASS}
            <td>
              <div class="badgeclass-role-select">
                <Select
                    handleSelect={item => changeProvisionmentRole(item, entityId)}
                    value = {
                      data.may_administrate_users ? targetOptions[0] :
                      (data.may_update ? targetOptions[1] :
                      (data.may_award ? targetOptions[2] : 'error'))
                    }
                    items={targetOptions}
                    clearable={false}
                    optionIdentifier="name"
                />
              </div>
            </td>
          {:else}
            <td>{I18n.t(['editUsers', entity, 'allRights'])}</td>
          {/if}
          <td>
            <InvitationStatusWidget date={createdAt} rejected={rejected}/>
          </td>
        {:else if _staffType === staffType.BADGE_CLASS_STAFF}
          <td>
            <CheckBox
                value={selection.some(el => el.entityId === entityId)}
                name={`select-${entityId}`}
                disabled={false}
                onChange={val => onCheckOne(val, entityId)}/>
          </td>
          <td>
            {user.firstName} {user.lastName}
            <br />
            <span class="sub-text">{user.email}</span>
          </td>
          <td>
            <div class="badgeclass-role-select">
              <Select
                  handleSelect={item => changeUserRole(item, entityId)}
                  value = {
                    mayAdministrateUsers ? targetOptions[0] :
                    (mayUpdate ? targetOptions[1] :
                    (mayAward ? targetOptions[2] : 'error'))
                  }
                  items={targetOptions}
                  clearable={false}
                  optionIdentifier="name"
              />
            </div>
          </td>
          <td>
            <InvitationStatusWidget accepted={true}/>
          </td>
        {:else if _staffType === staffType.ISSUER_STAFF}
          <td>
            <CheckBox
                value={selection.some(el => el.entityId === entityId)}
                name={`select-${entityId}`}
                disabled={entity !== entityType.ISSUER}
                onChange={val => onCheckOne(val, entityId)}/>
          </td>
          <td>
            {user.firstName} {user.lastName}
            <br />
            <span class="sub-text">{user.email}</span>
          </td>
          <td>
            {#if entity !== entityType.ISSUER}
              {I18n.t(['editUsers', 'permissions', 'allRights'])}
              <br />
              {I18n.t(['editUsers', 'permissions', 'issuerGroupAllRights'])}
            {:else}
              {I18n.t(['editUsers', 'faculty', 'allRights'])}
            {/if}
          </td>
          <td>
            <InvitationStatusWidget accepted={true}/>
          </td>
        {:else if _staffType === staffType.ISSUER_GROUP_STAFF}
          <td>
            <CheckBox
                value={selection.some(el => el.entityId === entityId)}
                name={`select-${entityId}`}
                disabled={entity !== entityType.ISSUER_GROUP}
                onChange={val => onCheckOne(val, entityId)}/>
          </td>
          <td>
            {user.firstName} {user.lastName}
            <br />
            <span class="sub-text">{user.email}</span>
          </td>
          <td>
            {#if entity !== entityType.ISSUER_GROUP}
              {I18n.t(['editUsers', 'permissions', 'allRights'])}
              <br />
              {I18n.t(['editUsers', 'permissions', 'issuerGroupAllRights'])}
            {:else}
              {I18n.t(['editUsers', 'faculty', 'allRights'])}
            {/if}
          </td>
          <td>
            <InvitationStatusWidget accepted={true}/>
          </td>
        {:else if _staffType === staffType.INSTITUTION_STAFF}
          <td>
            <CheckBox
                value={selection.some(el => el.entityId === entityId)}
                name={`select-${entityId}`}
                disabled={entity !== entityType.INSTITUTION}
                onChange={val => onCheckOne(val, entityId)}/>
          </td>
          <td>
            {user.firstName} {user.lastName}
            <br />
            <span class="sub-text">{user.email}</span>
          </td>
          <td>
            {#if entity !== entityType.INSTITUTION}
              {I18n.t(['editUsers', 'permissions', 'allRights'])}
              <br />
              {I18n.t(['editUsers', 'permissions', 'institutionAllRights'])}
            {:else}
              {I18n.t(['editUsers', 'institution', 'allRights'])}
            {/if}
          </td>
          <td>
            <InvitationStatusWidget accepted={true}/>
          </td>
        {/if}
      </tr>
    {/each}
  </UsersTable>
</div>

{#if showRemoveModal}
  <Modal
    submit={removeModalAction}
    cancel={() => showRemoveModal = false}
    question={removeModalQuestion}
    title={removeModalTitle}
  />
{/if}
