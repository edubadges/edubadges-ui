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
    import {isEmpty, translatePropertiesRawQueries, translateProperty} from "../../util/utils";
    import {pageCount} from "../../util/pagination";
    import {fetchRawUsers} from "../../api";
    import {staffType} from "../../util/staffTypes";

    let loaded = false;

    onMount(() => {
        fetchRawUsers().then(res => {
            const attributes = ["name"]
            const prefixes = [""];
            res.forEach(user => {
                translatePropertiesRawQueries(user, ["institution_name"], prefixes)
                user.permissions.forEach(permission => {
                    translatePropertiesRawQueries(permission.institution, attributes, prefixes)
                    translatePropertiesRawQueries(permission.faculty, attributes, prefixes)
                    translatePropertiesRawQueries(permission.issuer, attributes, prefixes)
                    translatePropertiesRawQueries(permission.badge_class, attributes, prefixes)
                });
                if (isEmpty(user.permissions)) {
                    user.role = staffType.VIEWER;
                    user.unit_name = user.institution_name;
                    return;
                }
                const permission = user.permissions.find(permission => permission.highest);
                switch (permission.permission) {
                    case "institution": {
                        user.role = staffType.INSTITUTION_STAFF;
                        user.unit_name = user.institution_name;
                        break;
                    }
                    case "faculty": {
                        user.unit_name = permission.faculty.name;
                        if (permission.level === "awarder") {
                            user.role = staffType.ISSUER_GROUP_AWARDER;
                        } else {
                            user.role = staffType.ISSUER_GROUP_ADMIN;
                        }
                        break;
                    }
                    case "issuer": {
                        user.unit_name = permission.issuer.name;
                        if (permission.level === "awarder") {
                            user.role = staffType.ISSUER_AWARDER;
                        } else {
                            user.role = staffType.ISSUER_ADMIN;
                        }
                        break;
                    }
                    case "badge_class": {
                        user.unit_name = permission.badge_class.name;
                        if (permission.level === "awarder") {
                            user.role = staffType.BADGE_CLASS_AWARDER;
                        } else if (permission.level === "admin") {
                            user.role = staffType.BADGE_CLASS_OWNER;
                        } else {
                            user.role = staffType.BADGE_CLASS_EDITOR;
                        }
                        break;
                    }
                }

            });
            $users = res;
            loaded = true;
        });
    });

    const tableHeaders = [
        {
            name: I18n.t("teacher.nameEmail"),
            attribute: "first_name",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "70%"
        },
        {
            name: I18n.t("teacher.roles.title"),
            attribute: "role",
            reverse: false,
            sortType: sortType.ALPHA,
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
        <SideBarUsers objectIdentifier="entity_id"/>

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
                        <td>{
                            I18n.t(['editUsers', 'roles', user.role])}
                            <br/>
                            <span class="sub-text">{user.unit_name} {I18n.t(`teacher.permission${user.permissions.length === 1 ? "" : "s"}`,
                                {count: user.permissions.length})}</span>
                        </td>
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
