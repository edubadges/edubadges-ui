<script>
  import {onMount} from "svelte";
  import I18n from "i18n-js";
  import {queryData} from "../../api/graphql";
  import {role} from "../../util/role";
  import {navigate} from "svelte-routing";
  import {
    acceptTermsForBadge,
    getPublicBadgeClass,
    getSocialAccountsSafe,
    requestBadge,
    requestLoginToken,
  } from "../../api";
  import {BadgeClassHeader} from "../teachers";
  import {Overview} from "../teachers/badgeclass";
  import Button from "../Button.svelte";
  import Spinner from "../Spinner.svelte";
  import {publicBadgeInformation} from "../extensions/badges/extensions";
  import {entityType} from "../../util/entityTypes"
  import {schacHomeNamesFromExtraData} from "../../util/claims";
  import {Modal} from "../forms";
  import {flash} from "../../stores/flash";
  import AcceptInstitutionTerms from "../../routes/AcceptInstitutionTerms.svelte";
  import {authToken, redirectPath, userLoggedIn, userRole, validatedUserName} from "../../stores/user";
  import {config} from "../../util/config"
  import {getService} from "../../util/getService";
  import PublicBreadcrumb from "./PublicBreadcrumb.svelte";

  export let entityId;

  let visitorRole;
  $: visitorRole = $userLoggedIn ? $userRole : "guest";

  let badgeClass = {};
  let enrollmentId;
  let studentEnrolled;
  let studentAwarded;
  let requestedDate;
  let schacHomes;

  let loaded;

  //Modal
  let showModal = false;
  let modalTitle;
  let modalQuestion;
  let modalAction;

  let showAcceptTerms = false;
  let termsAccepted = false;
  let noValidatedName = false;
  let showNoValidatedName = false;
  let noValidInstitution = false;

  const login = () => {
    $redirectPath = window.location.pathname;
    navigate("/login?validateName=true");
  };

  const goToEduId = () => {
    $redirectPath = window.location.pathname;
    const service = getService(role.STUDENT);
    requestLoginToken(service, true);
  };

  const query = `query ($entityId: String){
    enrollment(badgeClassId: $entityId) {
      entityId,
      dateCreated,
      dateConsentGiven,
      dateAwarded,
      denied,
      badgeInstance {
        revoked
      }
    }
  }`;

  const secureQuery = `query ($entityId: String){
    currentUser {
      validatedName,
      termsAgreements {
        terms {
          entityId
        },
        agreed,
        agreedVersion
      }
    },
    badgeClass(id: $entityId) {
      image,
      contentTypeId,
      name,
      description,
      criteriaUrl,
      criteriaText,
      expirationPeriod,
      isPrivate,
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
      issuer {
        name,
        entityId,
        publicUrl,
        faculty {
          name,
          entityId,
          institution {
            identifier,
            name,
            image,
            grondslagFormeel,
            grondslagInformeel,
            entityId
          }
        }
      },
      extensions {
        name,
        originalJson
      },
      alignments {
        targetName,
        targetUrl,
        targetCode,
        targetFramework,
        targetDescription
      }
    }
  }`;

  onMount(() => {
    if (visitorRole === role.STUDENT) {
      Promise.all([queryData(query, {entityId}), queryData(secureQuery, {entityId}), getSocialAccountsSafe()]).then(res => {
        const enrollment = res[0].enrollment;
        if (enrollment && (!enrollment.badgeInstance || !enrollment.badgeInstance.revoked)) {
          studentAwarded = enrollment.badgeInstance && !enrollment.badgeInstance.revoked;
          studentEnrolled = !enrollment.badgeInstance;
          enrollmentId = enrollment.entityId;
          requestedDate = enrollment.dateCreated;
        }
        const userTerms = res[1].currentUser.termsAgreements;
        noValidatedName = !res[1].currentUser.validatedName;
        badgeClass = res[1].badgeClass;
        badgeClass.issuer.id = badgeClass.issuer.publicUrl;
        schacHomes = schacHomeNamesFromExtraData(res[2][0].affiliations);
        loaded = true;

        const termsCandidate = userTerms.find(uTerm => uTerm.terms.entityId === badgeClass.terms.entityId);
        termsAccepted = Boolean(termsCandidate &&
          termsCandidate.agreedVersion === badgeClass.terms.version &&
          termsCandidate.agreed);
      });
    } else {
      getPublicBadgeClass(entityId).then(res => {
        badgeClass = res;
        publicBadgeInformation(badgeClass, res);
        //need to ensure the links work
        badgeClass.entityId = badgeClass.id.substring(badgeClass.id.lastIndexOf("/") + 1);
        badgeClass.issuer.entityId = badgeClass.issuer.id.substring(badgeClass.issuer.id.lastIndexOf("/") + 1);
        loaded = true;
      }).catch(() => {
        navigate("/404");
      });
    }
  });

  const userHasAgreed = () => {
    showAcceptTerms = false;
    termsAccepted = true;
    acceptTermsForBadge(badgeClass.terms.entityId).then(() => {
      enrollStudent(false);
      showModal = false;
    })
  };

  const userDisagreed = () => {
    showAcceptTerms = false;
  };

  const enrollStudent = showConfirmation => {
    const identifier = badgeClass.issuer.faculty.institution.identifier;
    if (noValidatedName) {
      showNoValidatedName = true;
      return;
    }
    if (schacHomes.indexOf(identifier) < 0) {
      noValidInstitution = true;
      return;
    }
    if (!termsAccepted) {
      showAcceptTerms = true;
      return;
    }
    if (showConfirmation) {
      modalTitle = I18n.t("studentEnroll.confirmation.title");
      modalQuestion = I18n.t("studentEnroll.confirmation.question", {name: badgeClass.name});
      modalAction = () => enrollStudent(false);
      showModal = true;
    } else {
      loaded = false;
      requestBadge(entityId)
        .then(() => {
          loaded = true;
          reload();
          showConfirmation = false;
          flash.setValue(I18n.t('student.flash.enrolled', {name: badgeClass.name}));
        })
        .catch(err => {
          err.then(details => {
            loaded = true;
            flash.error(details);
          })
        });
    }
  };

  const reload = () => {
    queryData(query, {entityId}).then(res => {
      showModal = false;
      const enrollment = res.enrollment;
      studentAwarded = enrollment && enrollment.badgeInstance && !enrollment.badgeInstance.revoked;
      studentEnrolled = enrollment && !enrollment.badgeInstance;
      if (studentEnrolled) {
        enrollmentId = enrollment.entityId;
        requestedDate = enrollment.dateCreated;
      }
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
  .overview-container {
    padding: 40px 140px;
  }

  @media (max-width: 1120px) {
    .overview-container {
      padding: 20px;
    }
  }

  div.enrol {
    display: flex;
    flex-direction: column;

    span.attention {
      display: inline-block;
      margin-top: 15px;
      font-size: 15px;
      max-width: 275px;
    }
  }
</style>

{#if loaded}
  {#if !showAcceptTerms}
    <div class="page-container">
      <PublicBreadcrumb badgeClass={badgeClass}/>
      <BadgeClassHeader
        entity={entityType.BADGE_CLASS}
        object={badgeClass}
        visitorRole={visitorRole}>
        {#if visitorRole === role.GUEST}
          <div class="slots enrol">
            <Button text={I18n.t("login.loginToEnrol")} action={login}/>
            <span
              class="attention">{@html I18n.t("login.loginToEnrolInfo", {name: badgeClass.issuer.faculty.institution.name})}</span>
          </div>
        {:else if visitorRole === role.STUDENT}
          <div class="slots">
            {#if !studentEnrolled && !studentAwarded}
              <Button secondary action={() => enrollStudent(true)} text={I18n.t('student.enroll')} class="btn"/>
            {:else}
              <Button label="alreadyEnrolled" disabled={true} text={I18n.t('student.enrolled')}/>
            {/if}
          </div>
        {/if}
      </BadgeClassHeader>

      <div class="overview-container">
        <Overview badgeclass={badgeClass} studentEnrolled={studentEnrolled} enrollmentId={enrollmentId}
                  requested={requestedDate} studentPath={I18n.t("student.enrollments")} publicPage={true}
                  on:enrollmentWithdrawn={reload} showBreadCrumb={false}/>
      </div>
    </div>
  {/if}
{:else}
  <Spinner/>
{/if}

{#if showModal}
  <Modal
    submit={modalAction}
    cancel={() => showModal = false}
    question={modalQuestion}
    evaluateQuestion={true}
    title={modalTitle}/>
{/if}

{#if showAcceptTerms}
  <AcceptInstitutionTerms
    badgeClass={badgeClass}
    userHasAgreed={userHasAgreed}
    userDisagreed={userDisagreed}/>
{/if}

{#if showNoValidatedName}
  <Modal
    submit={goToEduId}
    title={I18n.t("publicBadge.noValidatedNameModal.noLinkedInstitution")}
    question={I18n.t("publicBadge.noValidatedNameModal.question", {name: badgeClass.issuer.faculty.institution.name})}
    evaluateQuestion={true}
    cancel={() => showNoValidatedName = false}
    submitLabel={I18n.t("publicBadge.noValidatedNameModal.goToEduID")}/>
{/if}

{#if noValidInstitution}
  <Modal
    submit={logInForceAuthn}
    title={I18n.t("acceptTerms.noValidInstitution")}
    question={I18n.t("acceptTerms.noValidInstitutionInfoForEnrollment", {name: badgeClass.issuer.faculty.institution.name})}
    evaluateQuestion={true}
    cancel={() => noValidInstitution = false}
    submitLabel={I18n.t("acceptTerms.goToSurfConext")}/>
{/if}
