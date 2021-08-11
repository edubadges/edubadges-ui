<script>
  import I18n from "i18n-js";

  import {onMount} from "svelte";
  import {link, navigate} from "svelte-routing";
  import {queryData} from "../../api/graphql";
  import chevronRightSmall from "../../icons/chevron-right-small.svg";
  import Spinner from "../../components/Spinner.svelte";
  import BadgeCard from "../../components/shared/BadgeCard.svelte";
  import BadgeClassDetails from "../../components/shared/BadgeClassDetails.svelte";
  import moment from "moment";
  import {Modal} from "../../components/forms";
  import {translateProperties} from "../../util/utils";
  import Button from "../../components/Button.svelte";
  import {acceptRejectDirectAward, acceptTermsForBadge} from "../../api";
  import {flash} from "../../stores/flash";
  import {authToken, redirectPath, userLoggedIn, userRole, validatedUserName} from "../../stores/user";
  import {config} from "../../util/config";
  import AcceptInstitutionTerms from "../AcceptInstitutionTerms.svelte";

  export let entityId;

  let directAward = {};
  let currentUser = {};

  let showAcceptTerms = false;
  let termsAccepted = false;
  let noValidInstitution = false;

  //Modal
  let showModal = false;
  let modalTitle;
  let modalQuestion;
  let modalAction;
  let warning;
  let loaded;

  const cancel = () => {
    showModal = false;
  }

  const query = `query ($entityId: String) {
    currentUser {
      validatedName,
      schacHomes,
      termsAgreements {
        terms {
          entityId
        },
        agreed,
        agreedVersion
      }
    },
    directAward(id: $entityId) {
      entityId,
      createdAt,
      status,
      badgeclass {
        name,
        description,
        entityId,
        criteriaText,
        criteriaUrl,
        awardAllowedInstitutions,
        image,
        formal,
        terms {
          entityId,
          termsType,
          version,
          termsUrl {
            url,
            language
          }
        },
        extensions {
          name,
          originalJson
        },
        issuer {
          nameDutch,
          nameEnglish,
          imageDutch,
          imageEnglish,
          faculty {
            nameDutch,
            nameEnglish,
            institution {
              nameDutch,
              nameEnglish,
              identifier,
              imageDutch,
              imageEnglish,
              grondslagFormeel,
              grondslagInformeel,
              entityId
            }
          }
        }
      }
    }
  }`;

  onMount(() => {
    queryData(query, {entityId}).then(res => {
      directAward = res.directAward;
      currentUser = res.currentUser;
      const issuer = directAward.badgeclass.issuer;

      const userTerms = currentUser.termsAgreements;
      const termsCandidate = userTerms.find(uTerm => uTerm.terms.entityId === directAward.badgeclass.terms.entityId);
      termsAccepted = termsCandidate && termsCandidate.agreedVersion === directAward.badgeclass.terms.version && termsCandidate.agreed;

      translateProperties(issuer);
      translateProperties(issuer.faculty);
      translateProperties(issuer.faculty.institution);

      showModal = false;
      loaded = true;
    });
  });

  const userDisagreed = () => {
    showAcceptTerms = false;
  };

  const rejectDirectAward = showConfirmation => {
    if (showConfirmation) {
      modalTitle = I18n.t("models.badgeAward.reject");
      modalQuestion = I18n.t("models.badgeAward.confirmation.reject");
      modalAction = () => rejectDirectAward(false);
      warning = true;
      showModal = true;
    } else {
      showModal = false;
      acceptRejectDirectAward(directAward, false).then(() => {
        flash.setValue(I18n.t("models.badgeAward.flash.reject"));
        navigate("/backpack");
      });
    }
  }

  const claimDirectAward = showConfirmation => {
    const schacHomes = currentUser.schacHomes;
    const institution = directAward.badgeclass.issuer.faculty.institution
    const identifiers = [institution.identifier].concat(directAward.badgeclass.awardAllowedInstitutions);
    const allowedInstitution = identifiers.some(identifier => schacHomes.includes(identifier));
    const allowClaim = currentUser.validatedName && !directAward.badgeclass.formal;
    if (!allowedInstitution && !allowClaim) {
      noValidInstitution = true;
      return;
    }
    if (!termsAccepted) {
      showAcceptTerms = true;
      return;
    }
    if (showConfirmation) {
      modalTitle = I18n.t("models.badgeAward.claim");
      modalQuestion = I18n.t("models.badgeAward.confirmation.claim");
      modalAction = () => claimDirectAward(false);
      warning = false;
      showModal = true;
    } else {
      showModal = false;
      acceptRejectDirectAward(directAward, true).then(res => {
        flash.setValue(I18n.t("models.badgeAward.flash.claim"));
        navigate(`/details/${res.entity_id}`);
      });
    }
  }

  const userHasAgreed = () => {
    showAcceptTerms = false;
    acceptTermsForBadge(directAward.badgeclass.terms.entityId).then(() => {
      termsAccepted = true;
      claimDirectAward(true);
    });
  };


  const logInForceAuthn = () => {
    $userLoggedIn = "";
    $userRole = "";
    $authToken = "";
    $validatedUserName = "";
    $redirectPath = window.location.pathname;
    window.location.href = config.eduId;
  };


</script>

<style lang="scss">
  div.badge-detail-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  div.badge-detail {
    padding: 20px 40px 10px 40px;
    position: relative;
  }

  span.status-indicator {
    display: inline-block;
    position: absolute;
    border-radius: 14px;
    box-shadow: 0 1px 0 1px var(--grey-4);
    font-weight: bold;
    font-size: 14px;
    padding: 4px 8px;
    text-align: center;
    left: 30px;
    top: -14px;
    background-color: var(--red-dark);
    color: white;
    max-width: 85px;
    z-index: 9;
  }

  span.status-indicator.unclaimed {
    background-color: var(--green-dark);
    color: white;
  }

  div.badge-card-container {
    display: flex;
    max-width: 320px;
    margin: 0 auto 40px auto;
    position: relative;
  }

  div.bread-crumb {
    padding: var(--ver-padding-m) var(--hor-padding-m);
    min-height: 47px;
    display: flex;
    align-items: center;

    span.icon {
      height: 14px;
      width: 14px;
      margin: auto 4px;
    }

    a {
      color: var(--text-grey-dark);
      text-decoration: underline;
    }

    span.current {
      font-weight: bold;
    }
  }

  div.badge-header {
    background-color: var(--purple-2);
    color: var(--purple);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 60px;

    h1 {
      font-size: 28px;
    }
  }

  div.actions {
    margin: 25px 0;
    display: flex;
    justify-content: center;

    .button-container {
      margin-left: 25px;
      display: flex;
      position: relative;
    }

  }

  @media (max-width: 600px) {
    div.actions {
      flex-direction: column;
      align-items: flex-start;

      .button-container {
        margin-left: 0;
        margin-top: 15px;
        display: flex;
      }

    }
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  div.dates {
    display: flex;
    width: 100%;
    align-content: space-between;

    div.issued-on {
      flex-grow: 1;
    }

    margin-bottom: 40px;
  }

  @media (max-width: 1120px) {
    .badge-detail {
      padding: 40px 20px !important;
    }
  }

</style>

{#if loaded}
  {#if !showAcceptTerms}
    <div class="badge-detail-container">
      <div class="bread-crumb">
        <a use:link href={`/backpack`}>{I18n.t("student.badges")}</a>
        <span class="icon">{@html chevronRightSmall}</span>
        <span class="current">{directAward.badgeclass.name}</span>
      </div>
      <div class="badge-header">
        <h1>{directAward.badgeclass.name}</h1>
      </div>
      <div class="badge-detail">
        <div class="badge-card-container">
          <span class="status-indicator unclaimed">{I18n.t("models.badge.statuses.unclaimed")}</span>
          <BadgeCard badgeClass={directAward.badgeclass} standAlone={true} withHeaderData={false}/>
        </div>
        <div class="actions">
          <div class="button-container">
            <Button text={I18n.t("models.badgeAward.reject")} action={() => rejectDirectAward(true)} secondary={true}
                    marginRight={true}/>
            <Button text={I18n.t("models.badgeAward.claim")} action={() => claimDirectAward(true)}/>
          </div>
        </div>
        <div class="dates">
          <div class="issued-on">
            <h3>{I18n.t("models.badge.issuedOn")}</h3>
            <span>{moment(directAward.createAt).format('MMM D, YYYY')}</span>
          </div>
        </div>

        <BadgeClassDetails badgeclass={directAward.badgeclass}/>

      </div>
    </div>
  {/if}
{:else}
  <Spinner/>
{/if}

{#if noValidInstitution}
  <Modal
    submit={logInForceAuthn}
    title={I18n.t("acceptTerms.noValidInstitution")}
    question={I18n.t("acceptTerms.noValidInstitutionInfoForEnrollment", {name: directAward.badgeclass.issuer.faculty.institution.name})}
    evaluateQuestion={true}
    cancel={() => noValidInstitution = false}
    submitLabel={I18n.t("acceptTerms.goToSurfConext")}/>
{/if}

{#if showAcceptTerms}
  <AcceptInstitutionTerms
    badgeClass={directAward.badgeclass}
    userHasAgreed={userHasAgreed}
    userDisagreed={userDisagreed}/>
{/if}

{#if showModal}
  <Modal
    submit={modalAction}
    cancel={cancel}
    warning={warning}
    question={modalQuestion}
    evaluateQuestion={true}
    title={modalTitle}>
  </Modal>
{/if}
