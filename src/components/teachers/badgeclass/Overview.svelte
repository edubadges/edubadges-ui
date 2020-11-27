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
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let badgeclass;
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

  console.log("badgeclass", badgeclass); // TODO: rm

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

<style>
  .info {
    margin-bottom: 40px;
  }

  .badge {
    display: flex;
    max-width: 320px;
    margin: 0 auto 40px auto;
    position: relative;
  }

  .flex {
    display: flex;
    justify-content: space-between;
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
      <EnrollmentBadge badgeClass={badgeclass} />
    </div>
    <div class="flex info">
      <div>
        <h3>{I18n.t('models.badge.requested')}</h3>
        <p>{moment(requested).format('MMM D, YYYY')}</p>
      </div>
      <Button text={I18n.t('student.withdraw')} action={() => withdrawEnrollment(true, enrollmentId)}/>
    </div>
  {/if}
  <BadgeClassDetails badgeclass={badgeclass}>
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
