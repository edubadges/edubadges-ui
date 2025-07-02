<script>
    import {onMount} from "svelte";
    import I18n from "i18n-js";
    import {queryData} from "../../api/graphql";
    import {role} from "../../util/role";
    import {navigate} from "svelte-routing";
    import {acceptTermsForBadge, getPublicBadgeClass, requestBadge, requestLoginToken,} from "../../api";
    import {BadgeClassHeader} from "../teachers";
    import {Overview} from "../teachers/badgeclass";
    import Button from "../Button.svelte";
    import Spinner from "../Spinner.svelte";
    import {publicBadgeInformation} from "../extensions/badges/extensions";
    import {entityType} from "../../util/entityTypes"
    import {Modal, TextInput} from "../forms";
    import {flash} from "../../stores/flash";
    import AcceptInstitutionTerms from "../../routes/AcceptInstitutionTerms.svelte";
    import {authToken, redirectPath, userLoggedIn, userRole, validatedUserName} from "../../stores/user";
    import {config} from "../../util/config"
    import {getService} from "../../util/getService";
    import PublicBreadcrumb from "./PublicBreadcrumb.svelte";
    import {translateBadgeClassProperties} from "../../util/utils";
    import Field from "../forms/Field.svelte";
    import {isEmpty} from "../../util/utils";
    import {addProtocolToURL, validUrl} from "../../util/forms";
    import EndorsementView from "../teachers/endorsements/EndorsementView.svelte";
    import {alignments, endorsements} from "../../api/queries";

    export let entityId;

    let visitorRole;
    $: visitorRole = $userLoggedIn ? $userRole : "guest";

    let badgeClass = {};
    let allowedInstitutions = [];
    let allowedInstitutionsAttention = "";
    let badgeInstances = [];
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

    // All related to narrative and evidence_url required by the student
    let narrative;
    let evidence_url;
    let errors = {};

    const goToEduId = () => {
        $userRole = role.STUDENT;
        $redirectPath = window.location.pathname;
        const service = getService(role.STUDENT);
        requestLoginToken(service, !badgeClass.awardNonValidatedNameAllowed);
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
      schacHomes,
      termsAgreements {
        terms {
          entityId
        },
        agreed,
        agreedVersion
      }
    },
    badgeInstances {
        badgeclass {
            entityId
        }
    },
    badgeClass(id: $entityId) {
      image,
      contentTypeId,
      awardAllowedInstitutions,
      name,
      description,
      awardNonValidatedNameAllowed,
      archived,
      criteriaText,
      expirationPeriod,
      isPrivate,
      formal,
      evidenceStudentRequired,
      narrativeStudentRequired,
      selfEnrollmentDisabled,
      typeBadgeClass,
      participation,
      assessmentType,
      assessmentIdVerified,
      assessmentSupervised,
      qualityAssuranceName,
      qualityAssuranceUrl,
      qualityAssuranceDescription,
      gradeAchievedRequired,
      eqfNlqfLevelVerified,
      stackable,
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
        nameDutch,
        nameEnglish,
        entityId,
        publicUrl,
        faculty {
          nameDutch,
          nameEnglish,
          entityId,
          onBehalfOf,
          onBehalfOfDisplayName,
          onBehalfOfUrl,
          facultyType,
          imageDutch,
          imageEnglish,
          institution {
            identifier,
            alternativeIdentifier,
            nameDutch,
            nameEnglish,
            imageDutch,
            imageEnglish,
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
      ${alignments},
      ${endorsements}
    }
  }`;

    onMount(() => {
        if (visitorRole === role.STUDENT) {
            Promise.all([queryData(query, {entityId}), queryData(secureQuery, {entityId})]).then(res => {
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
                badgeInstances = res[1].badgeInstances;
                studentAwarded = studentAwarded || (badgeInstances && badgeInstances.some(bi => bi.badgeclass.entityId === entityId));
                translateBadgeClassProperties(badgeClass);
                badgeClass.issuer.id = badgeClass.issuer.publicUrl;
                schacHomes = res[1].currentUser.schacHomes;
                loaded = true;

                const termsCandidate = userTerms.find(uTerm => uTerm.terms.entityId === badgeClass.terms.entityId);
                termsAccepted = termsCandidate && termsCandidate.agreedVersion === badgeClass.terms.version && termsCandidate.agreed;
            });
        } else {
            getPublicBadgeClass(entityId).then(res => {
                badgeClass = res;
                translateBadgeClassProperties(badgeClass);

                const faculty = badgeClass.issuer.faculty;
                const institution = faculty.institution;
                let allowedNames = [institution.name]
                if (!badgeClass.formal) {
                    allowedNames = allowedNames.concat(badgeClass.award_allowed_institutions);
                }

                allowedInstitutions = allowedNames.join(", ");
                allowedInstitutionsAttention = allowedNames.length === 1 ? "One" : "";

                publicBadgeInformation(badgeClass, res);
                //need to ensure the links work
                badgeClass.entityId = badgeClass.id.substring(badgeClass.id.lastIndexOf("/") + 1);
                badgeClass.issuer.entityId = badgeClass.issuer.id.substring(badgeClass.issuer.id.lastIndexOf("/") + 1);
                faculty.onBehalfOf = faculty.on_behalf_of;
                faculty.onBehalfOfDisplayName = faculty.on_behalf_of_display_name;
                faculty.onBehalfOfUrl = faculty.on_behalf_of_url;
                loaded = true;
            })
                .catch(() => {
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
        const institution = badgeClass.issuer.faculty.institution;
        let identifiers = [institution.identifier]
        if (!badgeClass.formal) {
            identifiers = identifiers.concat(badgeClass.awardAllowedInstitutions);
        }
        if (institution.alternativeIdentifier) {
            identifiers.push(institution.alternativeIdentifier);
        }
        const allowedInstitution = identifiers.some(identifier => schacHomes.includes(identifier));

        if (noValidatedName && !badgeClass.awardNonValidatedNameAllowed) {
            showNoValidatedName = true;
            return;
        }
        if (!allowedInstitution && !badgeClass.awardNonValidatedNameAllowed) {
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
            errors = {};
            if (badgeClass.narrativeStudentRequired && isEmpty(narrative)) {
                errors.narrative = [{error_code: 938}]
            }
            if (badgeClass.evidenceStudentRequired) {
                if (isEmpty(evidence_url)) {
                    errors.evidence_url = [{error_code: 939}]
                } else if (!validUrl(evidence_url)) {
                    errors.evidence_url = [{error_code: 921}]
                }
            }
            if (isEmpty(errors)) {
                loaded = false;
                requestBadge(entityId, narrative, evidence_url)
                    .then(() => {
                        loaded = true;
                        showConfirmation = false;
                        flash.setValue(I18n.t('student.flash.enrolled', {name: badgeClass.name}));
                        navigate("/badge-requests");
                    })
                    .catch(err => {
                        err.then(details => {
                            loaded = true;
                            flash.error(details);
                        })
                    });
            }
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

    div.slots {
        margin-right: 174px;

        &.student {
            margin-right: 315px;
        }
        &.teacher {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        @media (max-width: 1490px) {
            margin-right: 0 !important;
        }
    }

    div.enrol {
        display: flex;
        flex-direction: column;

    }

    span.attention {
        display: inline-block;
        margin-top: 15px;
        font-size: 15px;
        line-height: 20px;
        max-width: 275px;
    }

    div.evidence {
        p.info {
            margin-bottom: 20px;
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
                    isPublic={true}
                    visitorRole={visitorRole}>
                {#if visitorRole === role.GUEST}
                    <div class="slots enrol">
                        {#if badgeClass.archived}
                            <span class="attention">
                              {@html I18n.t(`login.badgeClassArchived`)}
                            </span>
                        {:else if !badgeClass.self_enrollment_disabled}
                            <Button text={I18n.t("login.loginToEnrol")} action={goToEduId}/>
                            {#if badgeClass.awardNonValidatedNameAllowed}
                                <span class="attention">
                                    {@html I18n.t("login.loginAllowedWithoutValidatedName")}
                                </span>
                            {:else}
                              <span class="attention">
                                {@html I18n.t(`login.loginToEnrolInfo${allowedInstitutionsAttention}`, {name: allowedInstitutions})}
                              </span>
                            {/if}
                        {:else}
                            <Button text={I18n.t("login.login")} action={goToEduId}/>
                            <span class="attention">
                                {I18n.t("login.selfEnrollmentDisabled")}
                          </span>
                        {/if}
                    </div>
                {:else if visitorRole === role.STUDENT}
                    <div class="slots student">
                        {#if badgeClass.archived}
                            <span class="attention">
                              {@html I18n.t(`login.badgeClassArchived`)}
                            </span>
                        {:else if !studentEnrolled && !studentAwarded && !badgeClass.selfEnrollmentDisabled}
                            <Button secondary action={() => enrollStudent(true)} text={I18n.t('student.enroll')}
                                    class="btn"/>
                        {:else if badgeClass.selfEnrollmentDisabled}
                            <span class="attention">
                                {I18n.t("login.selfEnrollmentDisabled")}
                          </span>
                        {:else}
                            <Button label="alreadyEnrolled" disabled={true} text={I18n.t('student.enrolled')}/>
                        {/if}
                    </div>
                {:else if visitorRole === role.TEACHER}
                    <div class="slots teacher">
                    <Button text={I18n.t("models.badgeclass.copyBadgeClass")}
                            secondary={true}
                            action={() => navigate(`/manage/badgeclass/${badgeClass.entityId}/edit/copy`)}
                            />

                        {#if config.features.endorsements}
                            <EndorsementView badgeClass={badgeClass}/>
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
            title={modalTitle}>
        {#if badgeClass.narrativeStudentRequired || badgeClass.evidenceStudentRequired}
            <div class="evidence">
                <p class="info">{I18n.t("models.enrollment.studentEvidenceRequired")}</p>
                <Field entity="enrollment" attribute="evidence_url" errors={errors.evidence_url}
                       tipKey="enrollmentEvidenceURL">
                    <TextInput
                            bind:value={evidence_url}
                            onBlur={e => evidence_url = addProtocolToURL(e.target.value)}
                            placeholder={I18n.t("placeholders.enrollment.evidenceURL")}
                            error={errors.evidence_url}/>
                </Field>
                <Field entity="enrollment" attribute="narrative" errors={errors.narrative}
                       tipKey="enrollmentEvidenceDescription">
                    <TextInput
                            area={true}
                            size={"125"}
                            bind:value={narrative}
                            placeholder={I18n.t("placeholders.enrollment.evidenceDescription")}
                            error={errors.narrative}/>
                </Field>
            </div>
        {/if}

    </Modal>
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
