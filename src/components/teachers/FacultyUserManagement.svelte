<script>
  import {queryData} from "../../api/graphql";
  import { onMount } from "svelte";
  import { UsersTable } from "./index";
  import { sortType } from "../../util/sortData";
  import I18n from "i18n-js";
  import { CheckBox } from "../index";

  export let entity;

  let users = [];
  let selection = [];

  const query = `{
    currentInstitution {
      name,
      permissionedStaff {
        entityId,
        mayAdministrateUsers,
        user {
          firstName,
          lastName,
          email
        }
      }
		}
  }`;

  onMount(() => {
    queryData(query).then(res => {
      console.log(res);
      users = res.currentInstitution.permissionedStaff;
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

  $: table = {
    entity: "user",
    title: `${I18n.t("editUsers.usersPermissions")}`,
    tableHeaders: tableHeaders
  };

  $: buttons = [
    {
      'action': removePermissions,
      'text': I18n.t(['editUsers', 'permissions', 'removePermissions']),
      'allowed': (currentUser && currentUser.institutionStaff.mayAdministrateUsers && selection.length > 0),
    },
    {
      'action': inviteNewUser,
      'text': I18n.t(['editUsers', 'permissions', 'addPermissions']),
      'allowed': (currentUser && currentUser.institutionStaff.mayAdministrateUsers),
    }
  ];

  const onCheckOne = (val, entityId) => {
    if (val) {
      selection = selection.concat(entityId);
    } else {
      selection = selection.filter(id => id !== entityId);
    }
  };
</script>

<div class="container">
  <UsersTable
      {...table}
      withCheckAll={true}
  >
    {#each users as {mayAdministrateUsers, user, entityId}}
      <tr>
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
      </tr>
    {/each}
  </UsersTable>
</div>
