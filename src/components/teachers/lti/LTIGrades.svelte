<script>
    import I18n from "i18n-js";
    import {sort, sortType} from "../../../util/sortData";
    import {searchMultiple} from "../../../util/searchData";
    import Table from "../Table.svelte";
    import {onMount} from "svelte";
    import awardIcon from "../../../icons/award-ribbon-star-1.svg";
    import {pageCount} from "../../../util/pagination";

    export let users = [];
    export let gradesLineItems = [];

    let lineItems = [];
    let grades = [];

    onMount(() => {
        lineItems = gradesLineItems.line_items;
        grades = gradesLineItems.grades.flat();
        grades.forEach(grade => {
            grade.user = (users.find(user => user.user_id === grade.userId) || {name: "-"}).name;
            grade.assignment = (lineItems.find(item => item.id === grade.scoreOf) || {label: "-"}).label;
        });
    })

    const tableHeaders = [
        {
            name: "",
            width: "5%"
        },
        {
            name: I18n.t("lti.grades.assignment"),
            attribute: "assignment",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "25%"
        },
        {
            name: I18n.t("lti.grades.user"),
            attribute: "user",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "25%"
        },
        {
            name: I18n.t("lti.grades.resultScore"),
            attribute: "resultScore",
            reverse: false,
            sortType: sortType.NUMERIC,
            width: "15%"
        },
        {
            name: I18n.t("lti.grades.resultMaximum"),
            attribute: "resultMaximum",
            reverse: false,
            sortType: sortType.NUMERIC,
            width: "15%"
        },
        {
            name: "",
            width: "10%"
        }
    ];

    let table;
    $: table = {
        entity: "ltiGrades",
        title: `${I18n.t("lti.grades.subTitle")} (${grades.length})`,
        tableHeaders: tableHeaders
    };

    let gradeSearch = "";
    let searchedGradesIds = [];
    $: searchedGradesIds = searchMultiple(grades, gradeSearch, "id", "user", "assignment");

    let gradeSort = tableHeaders[1];

    let sortedFilteredGrades = [];
    $: sortedFilteredGrades = sort(
        grades.filter(el => searchedGradesIds.includes(el.id)),
        gradeSort.attribute,
        gradeSort.reverse,
        gradeSort.sortType
    );

    let page = 1;
    $: minimalPage = Math.min(page, Math.ceil(sortedFilteredGrades.length / pageCount));


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
            bind:search={gradeSearch}
            bind:sort={gradeSort}
            isEmpty={grades.length === 0}
                    filteredCount={sortedFilteredGrades.length}
        page={minimalPage}
        onPageChange={nbr => page = nbr}
            mayCreate={false}>
        {#each sortedFilteredGrades.slice((minimalPage - 1) * pageCount, minimalPage * pageCount) as grade}
            <tr>
                <td>
                    <div class="img-container">
                        <div class="img-icon">
                          <span class="icon">
                            {@html awardIcon}
                          </span>
                        </div>
                    </div>
                </td>
                <td>
                    {grade.assignment}
                </td>
                <td>
                    {grade.user}
                </td>
                <td>
                    {grade.resultScore}
                </td>
                <td>
                    {grade.resultMaximum}
                </td>
                <td></td>
            </tr>
        {/each}
    </Table>
</div>



