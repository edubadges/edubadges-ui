<script>
    import {filterBySearch} from "../../stores/filterUsers";
    import {onMount} from "svelte";
    import I18n from "i18n-js";
    import {Table} from "../../components/teachers";
    import {sort, sortType} from "../../util/sortData";
    import Spinner from "../../components/Spinner.svelte";
    import {fetchRawUsers, impersonate} from "../../api";
    import Modal from "../../components/forms/Modal.svelte";
    import {authToken, impersonation, userImpersonated, userLoggedIn} from "../../stores/user";
    import {pageCount} from "../../util/pagination";
    import {addUserPermissions} from "../../util/users";

    let allUsers = [];
    let showConfirmationModal = false;
    let selectedUser = {};

    let loaded = false;

    onMount(() => {
        fetchRawUsers(true).then(res => {
            const attributes = ["name"]
            const prefixes = [""];
            res.forEach(user => addUserPermissions(user, attributes, prefixes));
            allUsers = res;
            loaded = true;
        });
    });

    const impersonateUser = (user, showConfirmation) => {
        selectedUser = user;
        if (showConfirmation) {
            showConfirmationModal = true;
        } else {
            $impersonation = "true";
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
        title: `${I18n.t("teacher.users.title")} (${sortedFilteredUsers.length})`,
        tableHeaders: tableHeaders
    };

    let userSort = tableHeaders[0];

    let searchUsers = "";

    $: sortedFilteredUsers = sort(filterBySearch(allUsers, searchUsers, ["first_name", "last_name", "full_name", "email", "role"]),
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
        <div class="content">
            <h2>All users</h2>
            <Table
                    {...table}
                    bind:search={searchUsers}
                    bind:sort={userSort}
                    isEmpty={sortedFilteredUsers.length === 0}
                    filteredCount={sortedFilteredUsers.length}
                    page={minimalPage}
                    onPageChange={nbr => page = nbr}
                    mayCreate={false}>
                {#each sortedFilteredUsers.slice((minimalPage - 1) * pageCount, minimalPage * pageCount) as user}
                    <tr class="click" on:click={() => impersonateUser(user, true)}>
                        <td>
                            {user.first_name} {user.last_name}
                            <br/>
                            <span class="sub-text">{user.email}</span>
                        </td>
                        <td>
                            {I18n.t(`editUsers.roles.${user.role}`)}
                            <br/>
                            <span class="sub-text">{user.unit_name} ({user.institution_name})</span>
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
            question={I18n.t("impersonate.confirmation", {name: `${selectedUser.first_name} ${selectedUser.last_name}`})}
            title={I18n.t("impersonate.title")}/>
{/if}
