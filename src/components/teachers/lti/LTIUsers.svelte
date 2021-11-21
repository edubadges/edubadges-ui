<script>
    import I18n from "i18n-js";
    import {sort, sortType} from "../../../util/sortData";
    import {search} from "../../../util/searchData";
    import userIcon from "../../../icons/personal_info.svg";
    import {roles} from "../../../util/lti";
    import Table from "../Table.svelte";
    import {onMount} from "svelte";

    export let users = [];

    onMount(() => {
        users.forEach(user => user.role = roles(user.roles))
    })

    const tableHeaders = [
        {
            name: "",
            width: "5%"
        },
        {
            name: I18n.t("lti.users.name"),
            attribute: "name",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "15%"
        },
        {
            name: I18n.t("lti.users.email"),
            attribute: "email",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "25%"
        },
        {
            name: I18n.t("lti.users.roles"),
            attribute: "role",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "25%"
        },
        {
            name: I18n.t("lti.users.status"),
            attribute: "status",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "15%",
            center: false
        },
        {
            name: "",
            width: "15%"
        }
    ];

    let table;
    $: table = {
        entity: "ltiUsers",
        title: `${I18n.t("lti.users.subTitle")} (${users.length})`,
        tableHeaders: tableHeaders
    };

    let userSearch = "";
    let searchedUsersIds = [];
    $: searchedUsersIds = search(users, userSearch, "name", "user_id");

    let userSort = tableHeaders[2];

    let sortedFilteredUsers = [];
    $: sortedFilteredUsers = sort(
        users.filter(el => searchedUsersIds.includes(el.user_id)),
        userSort.attribute,
        userSort.reverse,
        userSort.sortType
    );


</script>

<style lang="scss">
  .page-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    padding: 0;
  }

</style>
<div class="page-container">
    <Table
            {...table}
            bind:search={userSearch}
            bind:sort={userSort}
            isEmpty={users.length === 0}
            mayCreate={false}>
        {#each sortedFilteredUsers as user}
            <tr>
                <td>
                    <div class="img-container">
                        <div class="img-icon">
                          <span class="icon">
                            {@html userIcon}
                          </span>
                        </div>
                    </div>
                </td>
                <td>
                    {user.name}
                </td>
                <td>
                    {user.email}
                </td>
                <td>
                    {user.role}
                </td>
                <td>
                    {user.status}
                </td>
                <td></td>
            </tr>
        {/each}
    </Table>
</div>



