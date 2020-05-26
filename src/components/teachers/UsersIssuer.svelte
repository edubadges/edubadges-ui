<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { Button, CheckBox } from "../../components";
  import { UsersTable } from "../teachers";
  import { sortType } from "../../util/sortData";
  import I18n from "i18n-js";
  import { makeUserInstitutionAdmin, removeUserInstitutionAdmin, removeUserIssuerAdmin } from "../../api";

  export let userId;

  let user;
  let currentUser;
  let faculties;
  let institutionId;
  let issuerSearch;

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
        entityId,
        issuers {
          name
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

  onMount(() => {
    queryData(query).then(res => {
      institutionId = res.currentInstitution.entityId;
      faculties = res.currentInstitution.faculties;
      user = res.user;
      currentUser = res.currentUser;
    });
  });

  const tableHeaders = [
    {
      name: I18n.t("editUsers.issuerGroup.header"),
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

  const addPermissions = () => {
    for (const selected of selection) {
      removeUserIssuerAdmin(selected.entityId);
    }
  };

  $: buttons = [
    {
      'action': addPermissions,
      'text': I18n.t(['editUsers', 'permissions', 'addPermissions']),
      'allowed': (currentUser && currentUser.institutionStaff.mayAdministrateUsers)
    }
  ];
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
        bind:search={issuerSearch}
        withCheckAll={true}
        bind:buttons={buttons}
    >
    {#each user.issuerStaffs as issuerStaffMembership}
      <tr>
        <td>
          <CheckBox
              value={selection.includes(issuerStaffMembership.entityId)}
              name={`select-${issuerStaffMembership.entityId}`}
              disabled={false}
              onChange={val => (console.log(val))}/>
        </td>
        <td>{issuerStaffMembership.issuer.name}</td>
        <td>
          {I18n.t(['editUsers', 'faculty', 'allRights'])}
        </td>
      </tr>
    {/each}
    {#each user.facultyStaffs as facultyStaffMembership}
      {#each facultyStaffMembership.issuers as issuer}
        <tr>
          <td>
            <CheckBox
                value={selection.includes(facultyStaffMembership.entityId)}
                name={`select-${facultyStaffMembership.entityId}`}
                disabled={true}
                onChange={val => (console.log(val))}/>
          </td>
          <td>{issuer.name}</td>
          <td>
            {I18n.t(['editUsers', 'faculty', 'allRights'])}
          </td>
        </tr>
      {/each}
    {/each}
    {#if user.institutionStaff.mayAdministrateUsers}
      {#each faculties as faculty}
        {#each faculty.issuers as issuer}
          <tr>
            <td>
              <CheckBox
                  value={''}
                  name={''}
                  disabled={true}
                  onChange={val => (console.log(val))}/>
            </td>
            <td>{issuer.name}</td>
            <td>{I18n.t(['editUsers', 'institution', 'allRights'])}</td>
          </tr>
        {/each}
      {/each}
    {/if}
    </UsersTable>
  </div>
{/if}
