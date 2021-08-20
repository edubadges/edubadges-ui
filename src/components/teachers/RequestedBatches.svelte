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
    import {userName} from "../../util/users";
    import {Modal} from "../forms";
    import filter from "../../icons/filter-1.svg";
    import AwardBadgeModal from "./award/AwardBadgeModal.svelte";
    import {onMount} from "svelte";
    import {queryData} from "../../api/graphql";
    import Spinner from "../Spinner.svelte";

    let enrollments = [];
    let selection = [];
    let badgeClass = null;
    let filteredEnrollments = [];
    let checkAllValue = false;
    let narrative = "";
    let url = "";
    let name = "";
    let description = "";
    let useEvidence = false;

    let loaded = false;

    //Modal
    let showModal = false;
    let modalTitle;
    let modalQuestion;
    let modalAction;

    //AwardModal
    let showAwardModal = false;

    const query = `query {
    badgeClassesToAward {
      entityId,
      name,
      narrativeRequired,
      evidenceRequired,
      permissions { mayUpdate, mayAward },
      pendingEnrollments {
        dateCreated,
        dateAwarded,
        entityId,
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
                        enrollment.evidenceNarrativeRequired = badgeClass.evidenceRequired || badgeClass.narrativeRequired;
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
            badgeClass = enrollments.find(enrollment => enrollment.entityId === selection[0]).badgeClass;
            showAwardModal = true;
        } else {
            showAwardModal = false;
            loaded = false;
            awardBadges(badgeClass.entityId, selection, useEvidence, narrative, url, name, description).then(() => {
                loadEnrollments();
                narrative = "";
                url = "";
                name = "";
                description = "";
                useEvidence = false;
                flash.setValue(I18n.t("models.enrollment.flash.awarded"));
            });
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
            Promise.all(selection.map(entityID => denyBadge(entityID)))
                .then(() => {
                    loadEnrollments();
                    flash.setValue(I18n.t("models.enrollment.flash.denied"))
                });
        }
    }

    const onCheckOne = (val, entityId) => {
        if (val) {
            selection = [entityId];
        } else {
            selection = selection.filter(id => id !== entityId);
            table.checkAllValue = false;
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

  td.evidenceNarrativeRequired span {
    display: block;
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
    withCheckAll={true}
    checkAllDisabled={true}
    bind:checkAllValue>
    <div class="action-buttons" slot="check-buttons">
      <Button small action={() => award(true)} marginRight={true}
              text={I18n.t('models.enrollment.award')} disabled={selection.length === 0}/>
      <Button small action={() => deny(true)}
              text={I18n.t('models.enrollment.deny')} disabled={selection.length === 0} secondary={true}/>
    </div>

    {#each sortedFilteredEnrollments as enrollment}
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
            <span>{userName(enrollment)}</span>
            <span>{enrollment.user.email}</span>
          </div>
        </td>
        <td>
          <a use:link
             href={`/badgeclass/${enrollment.badgeClass.entityId}/enrollments`}>{enrollment.badgeClass.name}</a>
        </td>
        <td class="evidenceNarrativeRequired">
          {#if enrollment.evidenceNarrativeRequired}
            {#if enrollment.badgeClass.evidenceRequired}
              <span>{I18n.t("models.enrollment.enrollmentType.evidence")}</span>
            {/if}
            {#if enrollment.badgeClass.narrativeRequired}
              <span>{I18n.t("models.enrollment.enrollmentType.narrative")}</span>
            {/if}
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
    title={modalTitle}/>
{/if}

{#if showAwardModal}
  <AwardBadgeModal
    bind:narrative={narrative}
    bind:url={url}
    bind:useEvidence={useEvidence}
    bind:name={name}
    bind:description={description}
    badgeClass={badgeClass}
    submit={() => award(false)}
    cancel={() => showAwardModal = false}/>
{/if}
