<script>
    import I18n from "i18n-js";
    import {navigate} from "svelte-routing";
    import moment from "moment";
    import Breadcrumb from "../Breadcrumb.svelte";
    import {linkLtiCourse, withdrawRequestBadge} from "../../../api";
    import EnrollmentBadge from "../../../routes/students/EnrollmentBadge.svelte";
    import {Modal} from "../../forms";
    import BadgeClassDetails from "../../shared/BadgeClassDetails.svelte";
    import Button from "../../../components/Button.svelte";
    import {flash} from "../../../stores/flash";
    import {createEventDispatcher, onMount} from 'svelte';
    import {ltiContext} from "../../../stores/lti";
    import {queryData} from "../../../api/graphql";
    import {entityId} from "../ManageBadgeclass.svelte";


    export let badgeclass;
    export let ltiCourse;
    export let reload;

    const query = `query ($clientId: String, $issuer: String) {
          ltiTool(clientId: $clientId, issuer: $issuer) {
            id,
            title,
            description,
            issuer
          },
    }`


    //Modal
    let showModal = false;
    let modalTitle;
    let modalQuestion;
    let modalAction;

    //LTI
    let launchJson = null;
    let ltiTool = null;
    let contextLoaded = false;
    let existingLink = false;

    onMount(() => {
        contextLoaded = $ltiContext.launchId && $ltiContext.launchJson;
        existingLink = !!ltiCourse;
        if (contextLoaded) {
            const clientId = $ltiContext.launchJson.aud;
            const issuer = $ltiContext.launchJson.iss;
            queryData(query, {clientId, issuer}).then(res => {
                ltiTool = res.ltiTool;
                if (!existingLink) {
                    const ctx = $ltiContext.launchJson["https://purl.imsglobal.org/spec/lti/claim/context"];
                    ltiCourse = {
                        identifier: ctx.id,
                        title: ctx.title,
                        label: ctx.label,
                        badgeclass: badgeclass.id,
                        tool: ltiTool.id,
                    }
                }
            });
        }
    });

    const linkCourse = showConfirmation => {
        if (showConfirmation) {
            modalTitle = I18n.t("models.enrollment.deleteEnrollment");
            modalQuestion = I18n.t("models.enrollment.deleteEnrollmentConfirmation");
            modalAction = () => linkCourse(false);
            showModal = true;
        } else {
            linkLtiCourse(enrollmentId).then(() => {
                dispatch('enrollmentWithdrawn');
                if (!publicPage) {
                    navigate('/badge-requests');
                } else {
                    flash.setValue(I18n.t('student.flash.withdrawn'));
                }
            });
            showModal = false;
        }
    }
</script>

<style lang="scss">
  .badge-sub-header {
    margin-bottom: 40px;
    display: flex;

    div.requested {
      flex-grow: 1;
    }

    div.withdraw {
      padding-left: 25px;
      margin-left: auto;
      min-width: 30%;
    }

  }

  .badge {
    display: flex;
    max-width: 320px;
    margin: 0 auto 40px auto;
    position: relative;
  }

  @media (max-width: 1120px) {
    .overview {
      padding: 30px 0 !important;
    }
  }
</style>
TDODO
<!--<div class="container main-content-margin">-->
<!--  <div class="header">-->
<!--    <h3>{title}</h3>-->
<!--      {#if button.allowed}-->
<!--        <Button text={button.text} action={button.action} disabled={button.disabled}/>-->
<!--      {/if}-->
<!--  </div>-->
<!--  <slot name="check-buttons"/>-->
<!--  <table class="entity-table">-->
<!--    <thead>-->
<!--    {#if !isEmpty}-->
<!--      <tr>-->
<!--        {#if withCheckAll}-->
<!--          <th class="checker">-->
<!--            <CheckBox disabled={disabledCheckAll} bind:value={checkAllValue} onChange={onCheckAll}/>-->
<!--          </th>-->
<!--        {/if}-->
<!--        <UsersTableHeaders {tableHeaders} {setSort} {sort}/>-->
<!--      </tr>-->
<!--    {/if}-->
<!--    </thead>-->
<!--    <tbody>-->
<!--    <slot/>-->
<!--    </tbody>-->
<!--  </table>-->
<!--</div>-->

{#if showModal}
    <Modal
            submit={modalAction}
            cancel={() => showModal = false}
            question={modalQuestion}
            title={modalTitle}/>
{/if}
