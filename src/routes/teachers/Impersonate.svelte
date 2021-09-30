<script>
    import {filterBySearch} from "../../stores/filterUsers";
    import {onMount} from "svelte";
    import {queryData} from "../../api/graphql";
    import I18n from "i18n-js";
    import {Table} from "../../components/teachers";
    import {sort, sortType} from "../../util/sortData";
    import Spinner from "../../components/Spinner.svelte";
    import {translateProperties} from "../../util/utils";
    import {staffType} from "../../util/staffTypes";
    import {impersonate} from "../../api";
    import Modal from "../../components/forms/Modal.svelte";
    import {authToken, userImpersonated, userLoggedIn} from "../../stores/user";

    let allUsers = [];
    let showConfirmationModal = false;
    let selectedUser = {};

    const query = `query {
    allUsers {
      firstName,
      lastName,
      email,
      id,
      entityId,
      institution {
        nameEnglish,
        nameDutch
      },
      institutionStaff {
        mayAdministrateUsers
      },
      facultyStaffs {
        mayUpdate,
        mayAward,
        faculty {
          nameDutch,
          nameEnglish
        }
      },
      issuerStaffs {
        mayUpdate,
        mayAward,
        issuer {
          nameDutch,
          nameEnglish
        }
      },
      badgeclassStaffs {
        mayUpdate,
        mayAward,
        badgeclass {
          name
        }
      },
    }
   }`;

    let loaded = false;

    onMount(() => {
        queryData(query).then(res => {
            allUsers = res.allUsers;
            allUsers.forEach(user => {
                translateProperties(user.institution);
                (user.facultyStaffs || []).forEach(staff => translateProperties(staff.faculty));
                (user.issuerStaffs || []).forEach(staff => translateProperties(staff.issuer));
                userRole(user);
            });
            loaded = true;
        });
    });

    const userRole = user => {
        if (user.institutionStaff && user.institutionStaff.mayAdministrateUsers) {
            user.role = staffType.INSTITUTION_STAFF;
            user.roleAt = user.institution.name;
        } else if (user.facultyStaffs && user.facultyStaffs.length > 0) {
            const staff = user.facultyStaffs.find(staff => staff.mayUpdate) || user.facultyStaffs[0];
            user.role = staff.mayUpdate ? staffType.ISSUER_GROUP_ADMIN : staffType.ISSUER_GROUP_AWARDER;
            user.roleAt = `${staff.faculty.name} (${user.institution.name})`;
        } else if (user.issuerStaffs && user.issuerStaffs.length > 0) {
            const staff = user.issuerStaffs.find(staff => staff.mayUpdate) || user.issuerStaffs[0];
            user.role = staff.mayUpdate ? staffType.ISSUER_ADMIN : staffType.ISSUER_AWARDER;
            user.roleAt = `${staff.issuer.name} (${user.institution.name})`;
        } else if (user.badgeclassStaffs && user.badgeclassStaffs.length > 0) {
            const staff = user.badgeclassStaffs.find(staff => staff.mayUpdate) ||
                user.badgeclassStaffs.find(staff => staff.mayAward) || user.badgeclassStaffs[0];
            user.role = staff.mayUpdate ? staffType.BADGE_CLASS_OWNER : staff.mayAward ? staffType.BADGE_CLASS_AWARDER : staffType.BADGE_CLASS_EDITOR;
            user.roleAt = `${staff.badgeclass.name} (${user.institution.name})`;
        } else {
            user.role = staffType.VIEWER;
            user.roleAt = user.institution.name;
        }
    }

    const impersonateUser = (user, showConfirmation) => {
        selectedUser = user;
        if (showConfirmation) {
            showConfirmationModal = true;
        } else {
            impersonate(user.id).then(res => {
                $authToken = "";
                $userImpersonated = "true";
                $userLoggedIn = false;
                window.location.href = res.url;
            })

        }
    }

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
        title: `${I18n.t("teacher.users.title")} (${allUsers.length})`,
        tableHeaders: tableHeaders
    };

    let userSort = tableHeaders[0];

    let searchUsers = "";

    $: sortedFilteredUsers = sort(filterBySearch(allUsers, searchUsers),
        userSort.attribute,
        userSort.reverse,
        userSort.sortType
    );
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
    <div class="content">
      <h2>All users</h2>
      <Table
        {...table}
        bind:search={searchUsers}
        bind:sort={userSort}
        isEmpty={allUsers.length === 0}
        mayCreate={false}>
        {#each sortedFilteredUsers as user (user.entityId)}
          <tr class="click" on:click={() => impersonateUser(user, true)}
          >
            <td>
              {user.firstName} {user.lastName}
              <br/>
              <span class="sub-text">{user.email}</span>
            </td>
            <td>
              {I18n.t(['editUsers', 'roles', user.role])}
              <br/>
              <span class="sub-text">{user.roleAt}</span>
            </td>
          </tr>
        {/each}
      </Table>
    </div>
  {:else}
    <Spinner/>
  {/if}
</div>
{#if showConfirmationModal}
  <Modal
    submit={() => impersonateUser(selectedUser, false)}
    cancel={() => showConfirmationModal = false}
    question={I18n.t("impersonate.confirmation", {name: `${selectedUser.firstName} ${selectedUser.lastName}`})}
    title={I18n.t("impersonate.title")}/>
{/if}
