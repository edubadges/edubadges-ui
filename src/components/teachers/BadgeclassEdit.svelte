<script>
    import {onMount} from "svelte";
    import {BadgeclassForm} from "../teachers";
    import {queryData} from "../../api/graphql";
    import {deduceExpirationPeriod} from "../extensions/badges/expiration_period";
    import Spinner from "../Spinner.svelte";
    import {isEmpty, translateProperties} from "../../util/utils";
    import {alignments} from "../../api/queries";

    export let entityId;
    export let action = "edit";

    let isCopy = false;

    const query = `query ($entityId: String){
    publicInstitutions {
      id,
      identifier,
      nameEnglish,
      nameDutch
    },
    currentInstitution {
      grondslagFormeel,
      grondslagInformeel,
      institutionType,
      identifier,
      awardAllowedInstitutions,
      awardAllowAllInstitutions,
      alternativeIdentifier,
      directAwardingEnabled,
      defaultLanguage,
      tags {
        id, name, archived
      }
    },
    badgeClass(id: $entityId) {
      entityId,
      name,
      image,
      description,
      createdAt,
      awardNonValidatedNameAllowed,
      archived,
      criteriaText,
      expirationPeriod,
      isPrivate,
      narrativeRequired,
      evidenceRequired,
      evidenceStudentRequired,
      narrativeStudentRequired,
      awardAllowedInstitutions,
      tags {
        id, name
      },
      isMicroCredentials,
      directAwardingDisabled,
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
      ${alignments},
      issuer {
        nameEnglish,
        nameDutch,
        entityId,
        faculty {
          nameEnglish,
          nameDutch,
          onBehalfOf,
          onBehalfOfDisplayName,
          onBehalfOfUrl,
          entityId,
          facultyType,
          issuers {
              nameEnglish,
              nameDutch,
              entityId,
        },
        }
      },
      badgeAssertions {
        entityId,
        revoked
      },
      extensions {
        name,
        originalJson
      },
      permissions {
        mayCreate
        mayUpdate,
        mayDelete

      }
    }
  }`;

    let badgeclass = {issuer: {faculty: {}}, extensions: []};
    let issuers = [];
    let permissions = {};
    let currentInstitution;
    let publicInstitutions;
    let loaded = false;
    let mayDelete = false;
    let mayEdit = false;
    let hasUnrevokedAssertions = true;

    onMount(() => {
        queryData(query, {entityId}).then(res => {
            badgeclass = res.badgeClass;
            badgeclass.badgeClassType = badgeclass.typeBadgeClass.toLowerCase();
            translateProperties(badgeclass.issuer);
            translateProperties(badgeclass.issuer.faculty);
            issuers = badgeclass.issuer.faculty.issuers || [];
            isCopy = action === "copy";
            if (isCopy) {
                badgeclass.entityId = null;
                badgeclass.name = "";
                badgeclass.id = null;
                if (isEmpty(badgeclass.image)) {
                    loaded = true;
                } else {
                    //https://stackoverflow.com/questions/25690641/img-url-to-dataurl-using-javascript
                    fetch(badgeclass.image).then(res => {
                        res.blob().then(content => {
                            const reader = new FileReader();
                            reader.onload = ({target: {result}}) => {
                                badgeclass.image = result;
                                loaded = true;
                            };
                            reader.readAsDataURL(content);
                        })
                    });
                }
            }
            issuers.forEach(issuer => translateProperties(issuer));

            deduceExpirationPeriod(badgeclass);

            publicInstitutions = res.publicInstitutions;
            permissions = res.badgeClass.permissions;
            currentInstitution = res.currentInstitution;
            hasUnrevokedAssertions = badgeclass.badgeAssertions.some(assertion => !assertion.revoked);
            mayDelete = permissions && permissions.mayDelete;
            mayEdit = permissions && permissions.mayUpdate && !hasUnrevokedAssertions;
            if (!isCopy) {
                loaded = true;
            }
        });
    });
</script>
{#if loaded}
    <BadgeclassForm issuers={issuers}
                    {badgeclass}
                    faculty={badgeclass.issuer.faculty}
                    entityId={isCopy ? null : entityId}
                    institution={currentInstitution}
                    {publicInstitutions}
                    action={action}
                    mayDelete={mayDelete}
                    mayEdit={mayEdit}
                    hasUnrevokedAssertions={hasUnrevokedAssertions}/>
{:else}
    <Spinner/>
{/if}

