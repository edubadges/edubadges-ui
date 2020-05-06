<script>
  import I18n from "i18n-js";
  import {navigate} from "svelte-routing";
  import moment from "moment";
  import Breadcrumb from "../Breadcrumb.svelte";
  import {withdrawRequestBadge} from "../../../api";
  import EnrollmentBadge from "../../../routes/students/EnrollmentBadge.svelte";
  import Modal from "../../forms/Modal.svelte";
  import BadgeClassDetails from "../../shared/BadgeClassDetails.svelte";
  import Button from "../../../components/Button.svelte";

  export let badgeclass;
  export let studentEnrolled;
  export let enrollmentId;
  export let requested;
  export let studentPath;

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
        navigate('/badge-requests');
      });
      showModal = false;
    }
  }
</script>

<style>
  div.overview {
    padding: 40px 140px;
  }

  .info {
    margin-bottom: 40px;
  }

  .badge {
    margin-bottom: 15px;
  }

  .flex {
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 1120px) {
    .overview {
      padding: 40px 0 !important;
    }
  }
</style>

<div class="overview">
  {#if studentEnrolled}
    <Breadcrumb studentBadge={true} studentPath={studentPath} badgeclassName={badgeclass.name}/>
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
  <BadgeClassDetails badgeclass={badgeclass}/>
</div>

{#if showModal}
  <Modal submit={modalAction}
      cancel={() => showModal = false}
      question={modalQuestion}
      title={modalTitle}>
  </Modal>
{/if}
