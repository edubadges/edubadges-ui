<script>
  import {staffType} from "../../util/staffTypes"
  import {entityType} from "../../util/entityTypes"
  import {CheckBox} from "../index";
  import {UsersTable, InvitationStatusWidget} from "../teachers";
  import {Select, Modal} from "../forms";
  import I18n from "i18n-js";
  import { navigate } from "svelte-routing";
  // import { disinviteUser, removeStaffMembership } from "../../api";
  import { sort, sortType } from "../../util/sortData";
  import { searchMultiple } from "../../util/searchData";

  export let entity;
  export let entityId;
  export let permissions;
  export let targetOptions;
  export let changeUserRole;

  export let table;

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

  let staffSearch = '';
  let staffSort = table.tableHeaders[2];

  // Remove permissions modal
  let showRemoveModal = false;
  export let removeModalTitle;
  export let removeModalQuestion;
  let removeModalAction;

  const removeSelectedPermissions = () => {
    for (const {entityId, _staffType} of selection) {
      removeUserStaffMembership(selected).then(() => {
        reload();
        showRemoveModal = false;
      })
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

  const onCheckAll = val => {
    selection = val ? staffs.map(({entityId, _staffType}) => ({entityId, _staffType})) : [];
    table.checkAllValue = val;
  };

  const onCheckOne = (val, entityId) => {
    if (val) {
      selection = selection.concat(entityId);
      table.checkAllValue = selection.length === staffs.length;
    } else {
      selection = selection.filter(id => id !== entityId);
      table.checkAllValue = false;
    }
  };

  $: searchedStaffIds = searchMultiple(staffs, staffSearch, "entityId", "user.firstName", "email", "user.lastName", "user.email");

  $: sortedFilteredStaffs = sort(
    staffs.filter(el => searchedStaffIds.includes(el.entityId)),
    staffSort.attribute,
    staffSort.reverse,
    staffSort.sortType
  )
</script>

<div class="container">
  <UsersTable
      {...table}
      {onCheckAll}
      withCheckAll={true}
      bind:buttons={buttons}
      bind:search={staffSearch}
      bind:sort={staffSort}
  >
    {#each sortedFilteredStaffs as {_staffType, user, entityId, email, createdAt, rejected, mayAdministrateUsers, mayUpdate, mayAward} (entityId)}
      <tr>
        {#if _staffType === staffType.USER_PROVISIONMENT}
          <td>
            <CheckBox
                value={selection.includes(entityId)}
                name={`select-${entityId}`}
                disabled={false}
                onChange={val => onCheckOne(val, entityId)}/>
          </td>
          <td>{email}</td>
          <td>{I18n.t(['editUsers', 'institution', 'allRights'])}</td>
          <td>
            <InvitationStatusWidget date={createdAt} rejected={rejected}/>
          </td>
        {:else if _staffType === staffType.BADGE_CLASS_STAFF}
          <td>
            <CheckBox
                value={selection.includes(entityId)}
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
                value={selection.includes(entityId)}
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
              {I18n.t(['editUsers', 'issuerGroup', 'allRights'])}
            {/if}
          </td>
          <td>
            <InvitationStatusWidget accepted={true}/>
          </td>
        {:else if _staffType === staffType.ISSUER_GROUP_STAFF}
          <td>
            <CheckBox
                value={selection.includes(entityId)}
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
              {I18n.t(['editUsers', 'issuerGroup', 'allRights'])}
            {/if}
          </td>
          <td>
            <InvitationStatusWidget accepted={true}/>
          </td>
        {:else if _staffType === staffType.INSTITUTION_STAFF}
          <td>
            <CheckBox
                value={selection.includes(entityId)}
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
