<script>
  import I18n from "i18n-js";
  import {navigate} from "svelte-routing";
  import moment from "moment";
  import Breadcrumb from "../Breadcrumb.svelte";
  import {withdrawRequestBadge} from "../../../api";
  import EnrollmentBadge from "../../../routes/students/EnrollmentBadge.svelte";
  import {Modal} from "../../forms";
  import BadgeClassDetails from "../../shared/BadgeClassDetails.svelte";
  import Button from "../../../components/Button.svelte";
  import {flash} from "../../../stores/flash";
  import {createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();

  export let badgeclass;
  export let publicInstitutions;
  export let studentEnrolled;
  export let enrollmentId;
  export let requested;
  export let studentPath;
  export let publicPage = false;
  export let showBreadCrumb = true;

  //Modal
  let showModal = false;
  let modalTitle;
  let modalQuestion;
  let modalAction;

  const withdrawEnrollment = (showConfirmation, enrollmentId) => {
    if (showConfirmation) {
      modalTitle = I18n.t("models.enrollment.deleteEnrollment");
      modalQuestion = I18n.t("models.enrollment.deleteEnrollmentConfirmation");
      modalAction = () => withdrawEnrollment(false, enrollmentId);
      showModal = true;
    } else {
      withdrawRequestBadge(enrollmentId).then(() => {
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

<div class="overview">
  {#if studentEnrolled}
    {#if showBreadCrumb}
      <Breadcrumb studentBadge={true} studentPath={studentPath} badgeclassName={badgeclass.name}/>
    {/if}
    <div class="badge">
      <EnrollmentBadge badgeClass={badgeclass}/>
    </div>
    <div class="badge-sub-header">
      <div class="requested">
        <h3>{I18n.t('models.badge.requested')}</h3>
        <p>{moment(requested).format('MMM D, YYYY')}</p>
      </div>
      <div class="withdraw">
        <Button text={I18n.t('student.withdraw')} action={() => withdrawEnrollment(true, enrollmentId)}/>
      </div>
    </div>
  {/if}
  <BadgeClassDetails badgeclass={badgeclass} publicInstitutions={publicInstitutions}>
    <slot/>
  </BadgeClassDetails>
</div>

{#if showModal}
  <Modal
    submit={modalAction}
    cancel={() => showModal = false}
    question={modalQuestion}
    title={modalTitle}/>
{/if}
