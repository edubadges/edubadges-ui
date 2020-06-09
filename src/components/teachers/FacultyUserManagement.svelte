<script>
  import {queryData} from "../../api/graphql";
  import { onMount } from "svelte";
  import { UsersTable } from "./index";
  import { sortType } from "../../util/sortData";
  import I18n from "i18n-js";
  import { CheckBox } from "../index";
  import { removeUserIssuerGroupAdmin } from "../../api";
  import {navigate} from "svelte-routing";

  export let entity;
  export let entityId;

  let institutionStaffMembers = [];
  let issuerGroupStaffMembers = [];
  let selection = [];
  let permissions;

  const query = `{
    faculty(id: "${entityId}") {
      name,
      staff {
        entityId,
        mayAdministrateUsers,
        user {
          firstName,
          lastName,
          email
        }
      },
      institution {
        name,
        staff {
          entityId,
          mayAdministrateUsers,
          user {
            firstName,
            lastName,
            email
          }
        }
      },
      permissions {
        mayAdministrateUsers
      }
		}
  }`;

  onMount(() => {
    queryData(query).then(res => {
      institutionStaffMembers = res.faculty.institution.staff;
      issuerGroupStaffMembers = res.faculty.staff;
      permissions = res.faculty.permissions;
    })
  });

  const tableHeaders = [
    {
      name: I18n.t(["teacher", "nameEmail"]),
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

  // Remove permissions modal
  let showRemoveModal = false;
  let removeModalTitle;
  let removeModalQuestion;
  let removeModalAction;

  const onCheckAll = val => {
    selection = val ? issuerGroupStaffMembers.map(({entityId}) => entityId) : [];
    table.checkAllValue = val;
  };


  const onCheckOne = (val, entityId) => {
    if (val) {
      selection = selection.concat(entityId);
      table.checkAllValue = selection.length === issuerGroupStaffMembers.length;
    } else {
      selection = selection.filter(id => id !== entityId);
      table.checkAllValue = false;
    }
  };

  $: table = {
    entity: "user",
    title: `${I18n.t("editUsers.usersPermissions")}`,
    tableHeaders: tableHeaders,
    onCheckAll
  };

  const reload = () => {
    queryData(query).then(res => {
      issuerGroupStaffMembers = res.faculty.staff;
    });
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

  const removePermissions = () => {
    showRemoveModal = true;
    removeModalTitle = I18n.t(['editUsers', 'permissions', 'removePermissions']);
    removeModalQuestion = I18n.t(['editUsers', 'permissions', 'removeAdmin']);
    removeModalAction = removeSelectedPermissions;
  };

  const inviteNewUser = () => {
    navigate(`/manage/faculty/${entityId}/user-management/invite-new-user`, {replace: false});
  };

  $: buttons = [
    {
      'action': removePermissions,
      'text': I18n.t(['editUsers', 'permissions', 'removePermissions']),
      'allowed': (permissions && permissions.mayAdministrateUsers && selection.length > 0),
    },
    {
      'action': inviteNewUser,
      'text': I18n.t(['editUsers', 'permissions', 'addPermissions']),
      'allowed': (permissions && permissions.mayAdministrateUsers),
    }
  ];
</script>

<div class="container">
  <UsersTable
      {...table}
      withCheckAll={true}
      bind:buttons={buttons}
  >
    {#each issuerGroupStaffMembers as {user}}
      <tr>
        <td>
          <CheckBox
              value={selection.includes(entityId)}
              name={`select-${entityId}`}
              disabled={true}
              onChange={val => onCheckOne(val, entityId)}/>
        </td>
        <td>
          {user.firstName} {user.lastName}
          <br />
          <span class="sub-text">{user.email}</span>
        </td>
        <td>
          {I18n.t(['editUsers', 'issuerGroup', 'allRights'])}
        </td>
      </tr>
    {/each}
    {#each institutionStaffMembers as {user}}
      <tr>
        <td>
          <CheckBox
              value={selection.includes(entityId)}
              name={`select-${entityId}`}
              disabled={true}
              onChange={val => onCheckOne(val, entityId)}/>
        </td>
        <td>
          {user.firstName} {user.lastName}
          <br />
          <span class="sub-text">{user.email}</span>
        </td>
        <td>
          {I18n.t(['editUsers', 'institution', 'allRights'])}
        </td>
      </tr>
    {/each}
  </UsersTable>
</div>
