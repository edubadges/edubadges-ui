<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { Button, CheckBox } from "../../components";
  import { UsersTable } from "../teachers";
  import { sortType } from "../../util/sortData";
  import I18n from "i18n-js";
  import { makeUserInstitutionAdmin, removeUserInstitutionAdmin } from "../../api";

  export let userId;

  let user;
  let currentUser;
  let faculties;
  let institutionId;
  let institutionSearch;

  let selection = [];
  let checkAllValue = false;

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
    badgeclassStaffs {
      entityId,
      badgeclass {
        name,
        entityId
      },
      mayAdministrateUsers,
      mayAward
    }
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


  onMount(() => {

    queryData(query).then(res => {
      console.log(res);
      institutionId = res.currentInstitution.entityId;
      faculties = res.currentInstitution.faculties;
      user = res.user;
      currentUser = res.currentUser;
    });
  });

  const tableHeaders = [
    {
      name: I18n.t("editUsers.institution.header"),
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
    title: `${I18n.t("editUsers.institutionPermissions")}`,
    tableHeaders: tableHeaders
  };

  const toggleInstitutionAdmin = () => {
    if (user.institutionStaff.mayAdministrateUsers) {
      makeUserInstitutionAdmin(user.entityId);
    } else {
      removeUserInstitutionAdmin(user.entityId);
    }
  };

  $: buttons = [
    {
      'action': toggleInstitutionAdmin,
      'text': I18n.t(['editUsers', 'permissions', 'addPermissions']),
      'allowed': (currentUser && currentUser.institutionStaff.mayAdministrateUsers),
      'disabled': true
    }
  ]
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

{#if user}
  <div class="container">
    <UsersTable
        {...table}
        bind:search={institutionSearch}
        withCheckAll={true}
        bind:buttons={buttons}
    >
      <tr>
        <td>
          <CheckBox
              value={selection.includes(user.entityId)}
              name={`select-${user.entityId}`}
              disabled={user.revoked}
              onChange={val => (console.log(val))}/>
        </td>
        <td>{user.institutionStaff.institution.name}</td>
        <td>
          {I18n.t(['editUsers', 'institution', user.institutionStaff.mayAdministrateUsers ? 'allRights' : 'noRights'])}
        </td>
      </tr>
    </UsersTable>
  </div>
{/if}