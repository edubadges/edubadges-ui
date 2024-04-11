<script>
    import {onMount} from "svelte";
    import {queryData} from "../../api/graphql";
    import {BadgeclassForm} from "../teachers";
    import {deduceExpirationPeriod} from "../extensions/badges/expiration_period";
    import Spinner from "../Spinner.svelte";
    import {translateProperties} from "../../util/utils";
    import BadgeClassChoice from "../forms/BadgeClassChoice.svelte";
    import {badgeClassType} from "../../util/badgeClassTypes";

    export let issuerEntityId;

    const query = `query ($entityId: String) {
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
      defaultLanguage,
      directAwardingEnabled,
      microCredentialsEnabled
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
      }
    },
  }`;

    let issuer = {};
    let badgeclass = deduceExpirationPeriod({awardAllowedInstitutions: [], extensions: [{}], badge_class_type: badgeClassType.MICRO_CREDENTIAL});
    let currentInstitution;
    let publicInstitutions;

    let loaded = false;
    // let choiceMade = false;
    let choiceMade = true;

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
        badgeclass = {...badgeclass, badge_class_type: choice};
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
                    badgeclass={badgeclass}
                    institution={currentInstitution}
                    publicInstitutions={publicInstitutions}
                    mayEdit={true}/>
{:else}
    <Spinner/>
{/if}

