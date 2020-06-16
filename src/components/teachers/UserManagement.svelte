<script>
  import {staffType} from "../../util/staffTypes"
  import {entityType} from "../../util/entityTypes"
  import { CheckBox } from "../index";
  import { UsersTable, InvitationStatusWidget } from "../teachers";
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

  const onCheckAll = () => {};
  const onCheckOne = () => {};
</script>

<div class="container">
  <UsersTable
      {...table}
      withCheckAll={true}
      bind:buttons={buttons}
  >
    {#each staffs as {staffType, user, entityId, email, createdAt, mayAdministrateUsers, mayUpdate, mayAward}}
      <tr>
        {#if staffType === staffType.USER_PROVISIONMENT}
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
            <InvitationStatusWidget
                date={createdAt}
            />
          </td>
        {:else if staffType === staffType.BADGE_CLASS_STAFF}
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
        {:else if staffType === staffType.ISSUER_STAFF}
        {:else if staffType === staffType.ISSUER_GROUP_STAFF}
        {:else if staffType === staffType.INSTITUTION_STAFF}

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
            {I18n.t(['editUsers', 'institution', mayAdministrateUsers ? 'allRights' : 'noRights'])}
          </td>
          <td>
            <InvitationStatusWidget accepted={true}/>
          </td>
        {/if}
      </tr>
    {/each}
  </UsersTable>
</div>