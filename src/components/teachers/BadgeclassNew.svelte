<script>
    import {onMount} from "svelte";
    import {queryData} from "../../api/graphql";
    import {BadgeclassForm} from "../teachers";
    import {deduceExpirationPeriod} from "../extensions/badges/expiration_period";
    import Spinner from "../Spinner.svelte";
    import {translateProperties} from "../../util/utils";
    import BadgeClassChoice from "../forms/BadgeClassChoice.svelte";
    import {badgeClassTypes} from "../../util/badgeClassTypes";

    export let issuerEntityId;

    const query = `query ($entityId: String) {
    publicInstitutions {
      id,
      identifier,
      nameEnglish,
      nameDutch
    },
    currentInstitution {
      nameEnglish,
      nameDutch,
      grondslagFormeel,
      grondslagInformeel,
      institutionType,
      identifier,
      awardAllowedInstitutions,
      awardAllowAllInstitutions,
      alternativeIdentifier,
      defaultLanguage,
      directAwardingEnabled,
      microCredentialsEnabled,
      tags {
        id, name, archived
      },
      terms {
        termsType
      }
    },
    issuer(id: $entityId) {
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
        facultyType
      }
    },
  }`;

    let issuer = {};
    let badgeclass = deduceExpirationPeriod({
        awardAllowedInstitutions: [],
        extensions: [{}],
        tags: [],
        badgeClassType: badgeClassTypes.EXTRA_CURRICULAR,
        alignments: []});
    let currentInstitution;
    let publicInstitutions;

    let loaded = false;
    let choiceMade = false;

    onMount(() => {
        queryData(query, {entityId: issuerEntityId}).then(res => {
            issuer = res.issuer;
            translateProperties(issuer)
            translateProperties(issuer.faculty)
            badgeclass.issuer = issuer;
            currentInstitution = res.currentInstitution;
            publicInstitutions = res.publicInstitutions;
            loaded = true;
        })
    });

    const makeChoice = choice => {
        badgeclass = {...badgeclass, badgeClassType: choice};
        choiceMade = true;
    }

    const cancel = () => window.history.back()

</script>
{#if loaded && !choiceMade}
    <BadgeClassChoice create={makeChoice}
                      cancel={cancel}
                      currentInstitution={currentInstitution}
                      issuer={issuer} />
{:else if loaded && choiceMade}
    <BadgeclassForm issuers={[issuer]}
                    faculty={issuer.faculty}
                    badgeclass={badgeclass}
                    institution={currentInstitution}
                    publicInstitutions={publicInstitutions}
                    mayEdit={true}/>
{:else}
    <Spinner/>
{/if}

