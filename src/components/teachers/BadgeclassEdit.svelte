<script>
    import {onMount} from "svelte";
    import {BadgeclassForm} from "../teachers";
    import {queryData} from "../../api/graphql";
    import {deduceExpirationPeriod} from "../extensions/badges/expiration_period";
    import Spinner from "../Spinner.svelte";
    import {isEmpty, translateProperties} from "../../util/utils";
    import {alignments} from "../../api/queries";
    import {fetchRawIssuersOverview} from "../../api";

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

    const initialAdditionalProperties = (res) => {
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
    }

    onMount(() => {
        queryData(query, {entityId}).then(res => {
            badgeclass = res.badgeClass;
            badgeclass.badgeClassType = badgeclass.typeBadgeClass.toLowerCase();
            translateProperties(badgeclass.issuer);
            translateProperties(badgeclass.issuer.faculty);
            issuers = badgeclass.issuer.faculty.issuers || [];
            isCopy = action === "copy";
            if (isCopy) {
                //We want to be able to copy over issuer groups and issuers and refetch all issuers with a raw query
                badgeclass.entityId = null;
                badgeclass.id = null;
                fetchRawIssuersOverview().then(issuersOverview => {
                    issuers = issuersOverview.map(iss => ({
                        ...iss,
                        faculty: {
                            facultyType: iss.facultyType
                        }
                    }));
                    const issuerEntityId = badgeclass.issuer.entityId;
                    if (!issuersOverview.some(issuer => issuer.entityId === issuerEntityId)) {
                        //Copy from catalog, replace the issuer
                        badgeclass.issuer = issuersOverview[0];
                    }
                    if (isEmpty(badgeclass.image)) {
                        initialAdditionalProperties(res);
                        loaded = true;
                    } else {
                        //https://stackoverflow.com/questions/25690641/img-url-to-dataurl-using-javascript
                        fetch(badgeclass.image).then(imgData => {
                            imgData.blob().then(content => {
                                const reader = new FileReader();
                                reader.onload = ({target: {result}}) => {
                                    badgeclass.image = result;
                                    initialAdditionalProperties(res);
                                    loaded = true;
                                };
                                reader.readAsDataURL(content);
                            })
                        });
                    }
                })
            } else {
                initialAdditionalProperties(res);
            }

        });
    });
</script>
{#if loaded}
    <BadgeclassForm issuers={(issuers || []).sort((iss1, iss2) => iss1.name.localeCompare(iss2.name))}
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

