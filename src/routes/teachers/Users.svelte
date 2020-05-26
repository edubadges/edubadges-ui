<script>
  import { SideBarUsers, UsersHeader } from "../../components/teachers/";
  import { institution, users, userTree } from "../../stores/filterUsers";
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import I18n from "i18n-js";
  import { Table } from "../../components/teachers";
  import { search } from "../../util/searchData";
  import { sort, sortType } from "../../util/sortData";
  import {navigate} from "svelte-routing";

  const query = `{
    currentInstitution {
      name,
      entityId,
      permissionedStaff {
        user {
          firstName,
          lastName,
          email,
          entityId
        }
      },
      faculties {
        name,
        entityId,
        staff {
          user {
            firstName,
            lastName,
            email,
            entityId
          }
        },
        issuers {
          entityId,
          name,
          staff {
            user {
              firstName,
              lastName,
              email,
              entityId
            }
          },
          badgeclasses {
            entityId,
            name,
            staff {
              user {
                firstName,
                lastName,
                email,
                entityId
              }
            },
          }
        }
      }
    },
    users {
      firstName,
      lastName,
      email,
      entityId,
      institutionStaff {
        mayAdministrateUsers
      },
      facultyStaffs {
        entityId
      },
      issuerStaffs {
        entityId
      },
      badgeclassStaffs {
        entityId,
        mayAdministrateUsers,
        mayUpdate,
        mayAward
      },
    }
   }`;


  onMount(() => {
    queryData(query).then(res => {
      $institution = res.currentInstitution;
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
    title: `${I18n.t("teacher.users.title")} (${$userTree.users.length})`,
    tableHeaders: tableHeaders
  };

  let userSearch = "";
  // $: searchedUserIds = search($users, userSearch, "firstName");

  let userSort = tableHeaders[1];

  // $: filteredUsers = $users.filter(el => searchedUserIds.includes(el.entityId));
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
          <td>{user.role}</td>
        </tr>
      {/each}
    </Table>
  </div>
</div>