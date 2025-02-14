<script>
    import {SideBarUsers, UsersHeader} from "../../components/teachers/";
    import {users, userSearch, userTree} from "../../stores/filterUsersNew";
    // import {users, userSearch, userTree} from "../../stores/filterUsers";
    import {currentInstitution} from "../../stores/user";
    import {onMount} from "svelte";
    import I18n from "i18n-js";
    import {Table} from "../../components/teachers";
    import {sort, sortType} from "../../util/sortData";
    import {navigate} from "svelte-routing";
    import Spinner from "../../components/Spinner.svelte";
    import {translatePropertiesRawQueries, translateProperty} from "../../util/utils";
    import {pageCount} from "../../util/pagination";
    import {fetchRawUsers} from "../../api";

    let loaded = false;

    onMount(() => {
        fetchRawUsers().then(res => {
            const isEnglish = I18n.locale === "en";
            res.forEach(user => {
                user.permissions.forEach(permission => {
                    translatePropertiesRawQueries(permission.institution)
                    translatePropertiesRawQueries(permission.faculty)
                    translatePropertiesRawQueries(permission.issuer)
                    translatePropertiesRawQueries(permission.badge_class)
                });
            });
            $users = res;
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
                {#each sortedFilteredUsers.slice((minimalPage - 1) * pageCount, minimalPage * pageCount) as user (user.entity_id)}
                    <tr
                            class="click"
                            on:click={() => navigate(`/users/${user.entity_id}/institution`)}>
                        <td>
                            {user.first_name} {user.last_name}
                            <br/>
                            <span class="sub-text">{user.email}</span>
                        </td>
                        <td>{I18n.t(['editUsers', 'roles', user.role])}</td>
                    </tr>
                {/each}
                {#if users.length === 0}
                    <tr>
                        <td colspan="2">{I18n.t("zeroState.users", {name: currentInstitution.name})}</td>
                    </tr>
                {/if}
            </Table>
        </div>
    {:else}
        <Spinner/>
    {/if}
</div>
