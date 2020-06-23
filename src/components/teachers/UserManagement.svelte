<script>
  import {staffType} from "../../util/staffTypes"
  import {entityType} from "../../util/entityTypes"
  import {CheckBox} from "../index";
  import {UsersTable, InvitationStatusWidget} from "../teachers";
  import {Select, Modal} from "../forms";

  export let entity;
  export let inviteUserURL;
  export let permissions;
  export let handleSelect;
  export let targetOptions;
  export let changeUserRole;

  export let table;
  export let buttons;

  export let institutionStaffs = [];
  export let issuerGroupStaffs = [];
  export let issuerStaffs = [];
  export let badgeClassStaffs = [];
  export let userProvisionments = [];

  let selection = [];
  $: staffs = [
    ...institutionStaffs.forEach(staff => staff.staffType = staffType.INSTITUTION_STAFF),
    ...issuerGroupStaffs.forEach(staff => staff.staffType = staffType.ISSUER_GROUP_STAFF),
    ...issuerStaffs.forEach(staff => staff.staffType = staffType.ISSUER_STAFF),
    ...badgeClassStaffs.forEach(staff => staff.staffType = staffType.BADGE_CLASS_STAFF),
    ...userProvisionments.forEach(staff => staff.staffType = staffType.USER_PROVISIONMENT)
  ];

  // Remove permissions modal
  let showRemoveModal = false;
  let removeModalTitle;
  let removeModalQuestion;
  let removeModalAction;

  const onCheckAll = val => {
    selection = val ? staffs.map(({entityId}) => entityId) : [];
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
</script>

<div class="container">
  <UsersTable
      {...table}
      withCheckAll={true}
      bind:buttons={buttons}
  >
    {#each staffs as {_staffType, user, entityId, email, createdAt, rejected, mayAdministrateUsers, mayUpdate, mayAward}}
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
                disabled={entity === entityType.BADGE_CLASS}
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
                disabled={entity === entityType.ISSUER}
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
                disabled={entity === entityType.ISSUER_GROUP}
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
                disabled={entity === entityType.INSTITUTION}
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
