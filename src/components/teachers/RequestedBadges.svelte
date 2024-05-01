<script>
    import I18n from "i18n-js";
    import moment from "moment";
    import {link} from "svelte-routing";
    import {Table} from "../teachers";
    import {sort, sortType} from "../../util/sortData";
    import {Button, CheckBox} from "../../components";
    import {awardBadges, denyBadge} from "../../api";
    import {flash} from "../../stores/flash";
    import {searchMultiple} from "../../util/searchData";
    import singleNeutralCheck from "../../icons/single-neutral-check.svg";
    import {constructUserName} from "../../util/users";
    import {Modal} from "../forms";
    import filter from "../../icons/filter-1.svg";
    import AwardBadgeModal from "./award/AwardBadgeModal.svelte";
    import {onMount} from "svelte";
    import {queryData} from "../../api/graphql";
    import Spinner from "../Spinner.svelte";
    import {pageCount} from "../../util/pagination";

    let enrollments = [];
    let selection = [];
    let narrativeRequired = false;
    let evidenceRequired = false;
    let gradeAchievedRequired = false;
    let filteredEnrollments = [];
    let checkAllValue = false;
    let narrative = "";
    let url = "";
    let name = "";
    let description = "";
    let gradeAchieved = null;
    let useEvidence = false;

    let loaded = false;

    //Modal
    let showModal = false;
    let modalTitle;
    let modalQuestion;
    let modalAction;
    let denyReason = "";

    //AwardModal
    let showAwardModal = false;

    const query = `query {
    badgeClassesToAward {
      entityId,
      name,
      narrativeRequired,
      evidenceRequired,
      gradeAchievedRequired,
      evidenceStudentRequired,
      narrativeStudentRequired,
      permissions { mayUpdate, mayAward },
      pendingEnrollments {
        dateCreated,
        dateAwarded,
        entityId,
        evidenceUrl,
        narrative,
        user {
          entityId,
          firstName,
          lastName,
          email
        }
      }

    }
  }`;

    const loadEnrollments = () => {
        const allEnrollments = [];
        queryData(query).then(res => {
            res.badgeClassesToAward.forEach(badgeClass => {
                badgeClass.pendingEnrollments.forEach(enrollment => {
                        enrollment.badgeClass = badgeClass;
                        enrollment.evidenceNarrativeRequired = badgeClass.evidenceRequired || badgeClass.narrativeRequired ||
                            badgeClass.evidenceStudentRequired || badgeClass.narrativeStudentRequired;
                        enrollment.gradeAchievedRequired = badgeClass.gradeAchievedRequired;
                        allEnrollments.push(enrollment);
                    }
                )
            });
            enrollments = allEnrollments;
            filteredEnrollments = allEnrollments;
            loaded = true;
        })
    }

    onMount(loadEnrollments)

    const award = showConfirmation => {
        if (showConfirmation) {
            const enrollment = findEnrollment(selection[0]);
            const badgeClass = enrollment.badgeClass;
            evidenceRequired = badgeClass.evidenceRequired;
            narrativeRequired = badgeClass.narrativeRequired;
            gradeAchievedRequired = badgeClass.gradeAchievedRequired;
            description = enrollment.narrative;
            url = enrollment.evidenceUrl;
            showAwardModal = true;
        } else {
            showAwardModal = false;
            loaded = false;
            // Need to group all selected enrollments by badgeClass
            const enrollmentsGroupedByBadgeClass = selection.reduce((acc, sel) => {
                const enrollment = findEnrollment(sel);
                const grouped = acc[enrollment.badgeClass.entityId];
                if (grouped) {
                    grouped.push(sel)
                } else {
                    acc[enrollment.badgeClass.entityId] = [sel]
                }
                return acc;
            }, {});
            Promise.all(Object.entries(enrollmentsGroupedByBadgeClass).map(arr => {
                return awardBadges(arr[0], arr[1], useEvidence, narrative, url, name, description, gradeAchieved);
            })).then(() => {
                loadEnrollments();
                narrative = "";
                url = "";
                name = "";
                description = "";
                useEvidence = false;
                checkAllValue = false;
                flash.setValue(I18n.t("models.enrollment.flash.awarded"));
            })
        }
    }

    const deny = showConfirmation => {
        if (showConfirmation) {
            modalTitle = I18n.t("models.enrollment.confirmation.deny");
            modalQuestion = I18n.t("models.enrollment.confirmation.denyConfirmation");
            modalAction = () => deny(false);
            showModal = true;
        } else {
            showModal = false;
            loaded = false;
            Promise.all(selection.map(entityID => denyBadge(entityID, denyReason)))
                .then(() => {
                    loadEnrollments();
                    flash.setValue(I18n.t("models.enrollment.flash.denied"));
                    denyReason = "";
                });
        }
    }

    const cancelAwardDialog = () => {
        showAwardModal = false;
        narrative = "";
        url = "";
        name = "";
        gradeAchieved = null;
        description = "";
    }

    const findEnrollment = entityId => enrollments.find(e => e.entityId === entityId);

    const onCheckOne = (val, entityId) => {
        if (val) {
            const enrollment = findEnrollment(entityId);
            if (enrollment.evidenceNarrativeRequired || enrollment.gradeAchievedRequired) {
                selection = [entityId];
                table.checkAllValue = false;
            } else {
                selection = [...selection.filter(sel => !findEnrollment(sel).evidenceNarrativeRequired && !findEnrollment(sel).gradeAchievedRequired), entityId];
            }
        } else {
            selection = selection.filter(id => id !== entityId);
            table.checkAllValue = false;
        }
    }

    const onCheckAll = val => {
        table.checkAllValue = val;
        if (val) {
            selection = enrollments.filter(e => !e.evidenceNarrativeRequired && !e.gradeAchievedRequired).map(e => e.entityId);
        } else {
            selection = [];
        }
    }

    const tableHeaders = [
        {
            name: null,
        },
        {
            name: I18n.t("models.enrollment.enrolled"),
            attribute: "user.email",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "30%"
        },
        {
            name: I18n.t("models.enrollment.enrollmentType.badgeClass"),
            attribute: "badgeClass.name",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "20%"
        },
        {
            name: I18n.t("models.enrollment.enrollmentType.evidenceNarrativeRequired"),
            attribute: "evidenceNarrativeRequired",
            reverse: false,
            width: "20%"
        },
        {
            name: I18n.t("models.enrollment.enrollmentType.name"),
            attribute: "award_type",
            reverse: false,
            icon: filter,
            sortType: sortType.ALPHA,
            width: "10%",
            center: true
        },
        {
            name: I18n.t("models.enrollment.enrolledOn"),
            attribute: "dateCreated",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "15%",
            center: true
        }
    ];

    $: table = {
        entity: "badgeclass",
        title: `${I18n.t("models.enrollment.title")}`,
        tableHeaders: tableHeaders
    };

    let enrollmentSearch = "";
    $: searchedEnrollmentsIds = searchMultiple(filteredEnrollments, enrollmentSearch, "entityId", "user.firstName", "user.lastName", "user.email");

    let enrollmentSort = tableHeaders[1];

    $: sortedFilteredEnrollments = sort(
        filteredEnrollments.filter(el => searchedEnrollmentsIds.includes(el.entityId)),
        enrollmentSort.attribute,
        enrollmentSort.reverse,
        enrollmentSort.sortType
    );

    let page = 1;
    $: minimalPage = Math.min(page, Math.ceil(sortedFilteredEnrollments.length / pageCount));

</script>

<style lang="scss">
  div.single-neutral-check {
    width: 26px;
  }

  div.recipient {
    display: flex;
    flex-direction: column;

    span:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  td.evidenceNarrativeRequired ul {
    list-style: circle;

    li {
      margin-left: 20px;
    }
  }

  div.action-buttons {
    display: flex;
    margin: 15px 0;

    :global(a:last-child) {
      margin-left: 15px;
    }
  }

</style>
{#if loaded}
    <Table
            {...table}
            bind:search={enrollmentSearch}
            bind:sort={enrollmentSort}
            isEmpty={enrollments.length === 0}
            filteredCount={sortedFilteredEnrollments.length}
            page={minimalPage}
            onPageChange={nbr => page = nbr}
            withCheckAll={true}
            checkAllDisabled={enrollments.every(e => e.evidenceNarrativeRequired)}
            {onCheckAll}
            bind:checkAllValue>
        <div class="action-buttons" slot="check-buttons">
            <Button small action={() => award(true)} marginRight={true}
                    text={I18n.t('models.enrollment.award')} disabled={selection.length === 0}/>
            <Button small action={() => deny(true)}
                    text={I18n.t('models.enrollment.deny')} disabled={selection.length === 0} secondary={true}/>
        </div>

        {#each sortedFilteredEnrollments.slice((minimalPage - 1) * pageCount, minimalPage * pageCount) as enrollment}
            <tr>
                <td>
                    <CheckBox
                            value={selection.includes(enrollment.entityId)}
                            name={`select-${enrollment.entityId}`}
                            onChange={val => onCheckOne(val, enrollment.entityId)}/>
                </td>
                <td class="single-neutral-check">
                    <div class="single-neutral-check">
                        {@html singleNeutralCheck}
                    </div>
                </td>
                <td>
                    <div class="recipient">
                        <span>{constructUserName(enrollment)}</span>
                        <span>{enrollment.user.email}</span>
                    </div>
                </td>
                <td>
                    <a use:link
                       href={`/badgeclass/${enrollment.badgeClass.entityId}/open-enrollments`}>{enrollment.badgeClass.name}</a>
                </td>
                <td class="evidenceNarrativeRequired">
                    {#if enrollment.evidenceNarrativeRequired}
                        <ul>
                            {#if enrollment.badgeClass.evidenceRequired}
                                <li>{I18n.t("models.enrollment.enrollmentType.evidence")}</li>
                            {/if}
                            {#if enrollment.badgeClass.narrativeRequired}
                                <li>{I18n.t("models.enrollment.enrollmentType.narrative")}</li>
                            {/if}
                            {#if enrollment.badgeClass.narrativeStudentRequired}
                                <li>{I18n.t("models.enrollment.enrollmentType.narrativeStudent")}</li>
                            {/if}
                            {#if enrollment.badgeClass.evidenceStudentRequired}
                                <li>{I18n.t("models.enrollment.enrollmentType.evidenceStudent")}</li>
                            {/if}
                            {#if enrollment.badgeClass.gradeAchievedRequired}
                                <li>{I18n.t("models.enrollment.enrollmentType.gradeAchieved")}</li>
                            {/if}
                        </ul>
                    {:else}
                        <span>-</span>
                    {/if}
                </td>

                <td class="center">
                    {I18n.t("models.enrollment.enrollmentType.enrolled")}
                </td>
                <td class="center">
                    {moment(enrollment.dateCreated).format('MMM D, YYYY')}
                </td>
            </tr>
        {/each}
        {#if enrollments.length === 0}
            <tr>
                <td colspan="6">{I18n.t("zeroState.requestedBatches")}</td>
            </tr>
        {/if}
    </Table>
{:else}
    <Spinner/>
{/if}

{#if showModal}
    <Modal
            submit={modalAction}
            cancel={() => showModal = false}
            question={modalQuestion}
            title={modalTitle}>
        <div class="slots">
            <label for="revocation-reason">{I18n.t("models.enrollment.confirmation.denyReason")}</label>
            <input id="revocation-reason" class="input-field" bind:value={denyReason}/>
        </div>
    </Modal>
{/if}

{#if showAwardModal}
    <AwardBadgeModal
            bind:narrative={narrative}
            bind:url={url}
            bind:useEvidence={useEvidence}
            bind:name={name}
            bind:description={description}
            bind:grade={gradeAchieved}
            awardMode={true}
            narrativeRequired={narrativeRequired}
            evidenceRequired={evidenceRequired}
            gradeAchievedRequired={gradeAchievedRequired}
            submit={() => {
                debugger;
                award(false);
            }}
            cancel={cancelAwardDialog}/>
{/if}
