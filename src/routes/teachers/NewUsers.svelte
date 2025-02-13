<script>
    import {SideBarUsers, UsersHeader} from "../../components/teachers/";
    import {institution, users, userSearch, userTree} from "../../stores/filterUsers";
    import {onMount} from "svelte";
    import {queryData} from "../../api/graphql";
    import I18n from "i18n-js";
    import {Table} from "../../components/teachers";
    import {sort, sortType} from "../../util/sortData";
    import {navigate} from "svelte-routing";
    import Spinner from "../../components/Spinner.svelte";
    import {translateProperties} from "../../util/utils";
    import {pageCount} from "../../util/pagination";

    const query = `query {
    currentInstitution {
      nameDutch,
      nameEnglish,
      entityId,
      staff {
        user {
          firstName,
          lastName,
          email,
          entityId
        }
      },
      faculties {
        nameDutch,
        nameEnglish,
        entityId,
        staff {
          mayAdministrateUsers,
          mayUpdate,
          mayAward,
          user {
            firstName,
            lastName,
            email,
            entityId
          }
        },
        issuers {
          entityId,
          nameDutch,
          nameEnglish,
          staff {
            mayAdministrateUsers,
            mayUpdate,
            mayAward,
            user {
              firstName,
              lastName,
              email,
              entityId
            },
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
              },
              mayAdministrateUsers,
              mayUpdate,
              mayAward
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
        entityId
      },
    }
   }`;

    let loaded = false;

    onMount(() => {
        queryData(query).then(res => {
            const inst = res.currentInstitution;

            translateProperties(inst);
            inst.faculties.forEach(faculty => {
                translateProperties(faculty);
                faculty.issuers.forEach(issuer => translateProperties(issuer));
            })

            $institution = inst;
            $users = res.users;
            loaded = true;
        });
    });

    const tableHeaders = [
        {
            name: I18n.t("teacher.nameEmail"),
            attribute: "firstName",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "70%"
        },
        {
            name: I18n.t("teacher.roles.title"),
            attribute: "role",
            reverse: false,
            sortType: sortType.ROLES,
            width: "30%"
        }
    ];

    $: table = {
        entity: "user",
        title: `${I18n.t("teacher.users.title")} (${$userTree.users.length})`,
        tableHeaders: tableHeaders
    };

    let userSort = tableHeaders[0];

    $: sortedFilteredUsers = sort(
        $userTree.users,
        userSort.attribute,
        userSort.reverse,
        userSort.sortType
    );

    let page = 1;
    $: minimalPage = Math.min(page, Math.ceil(sortedFilteredUsers.length / pageCount));

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
    {#if loaded}
        <SideBarUsers/>

        <div class="content">
            <UsersHeader/>
            <Table
                    {...table}
                    bind:search={$userSearch}
                    bind:sort={userSort}
                    filteredCount={sortedFilteredUsers.length}
                    page={minimalPage}
                    onPageChange={nbr => page = nbr}
                    isEmpty={users.length === 0}
                    mayCreate={false}>
                {#each sortedFilteredUsers.slice((minimalPage - 1) * pageCount, minimalPage * pageCount) as user (user.entityId)}
                    <tr
                            class="click"
                            on:click={() => navigate(`/users/${user.entityId}/institution`)}>
                        <td>
                            {user.firstName} {user.lastName}
                            <br/>
                            <span class="sub-text">{user.email}</span>
                        </td>
                        <td>{I18n.t(['editUsers', 'roles', user.role])}</td>
                    </tr>
                {/each}
                {#if users.length === 0}
                    <tr>
                        <td colspan="2">{I18n.t("zeroState.users", {name: institution.name})}</td>
                    </tr>
                {/if}
            </Table>
        </div>
    {:else}
        <Spinner/>
    {/if}
</div>
