<script>
  import { SideBarUsers, UsersHeader } from "../../components/teachers/";
  import { users, faculties, userTree } from "../../stores/filterUsers";
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import I18n from "i18n-js";
  import { Table } from "../../components/teachers";
  import { search } from "../../util/searchData";
  import { sort, sortType } from "../../util/sortData";
  import {navigate} from "svelte-routing";
  import {getHighestRole} from "../../util/getHighestRole";

  const query = `{
    currentInstitution {
      name,
      faculties {
        name,
        entityId,
        issuers {
          entityId,
          name
        }
      }
    },
    users {
      firstName,
      lastName,
      email,
      entityId,
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
          faculty {
            entityId
          }
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
        mayAdministrateUsers
      }
    }
   }`;


  onMount(() => {
    queryData(query).then(res => {
      console.log(res);
      $faculties = res.currentInstitution.faculties;
      $users = res.users;
    });
  });

  const tableHeaders = [
    {
      name: I18n.t("teacher.nameEmail"),
      attribute: "name",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("teacher.roles.title"),
      attribute: "roles",
      reverse: false,
      sortType: sortType.COLLECTION
    }
  ];

  $: table = {
    entity: "user",
    title: `${I18n.t("teacher.users.title")} (${$users.length})`,
    tableHeaders: tableHeaders
  };

  let userSearch = "";
  $: searchedUserIds = search($users, userSearch, "firstName");

  let userSort = tableHeaders[1];

  $: filteredUsers = $users.filter(el => searchedUserIds.includes(el.entityId));
</script>

<style lang="scss">
  .page-container {
    display: flex;
  }

  .content {
    flex: 1;
    padding: 30px 20px;
  }

</style>

<div class="page-container">
  <SideBarUsers />

  <div class="content">
    <UsersHeader/>
    <Table
        {...table}
        bind:search={userSearch}
        mayCreate={false}>
      {#each $userTree.users as user (user.entityId)}
        <tr
            class="click"
            on:click={() => navigate(`/users/${user.entityId}/institution`)}>
          <td>
            {user.firstName} {user.lastName}
            <br />
            <span class="sub-text">{user.email}</span>
          </td>
          <td>{getHighestRole(user)}</td>
        </tr>
      {/each}
    </Table>
  </div>
</div>
