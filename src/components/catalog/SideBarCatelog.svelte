<script>
    import I18n from "i18n-js";
    import {FilterBlock} from "../../components/teachers";
    import {
        educationalLevelSelected,
        institutionSelected,
        typeBadgeClassSelected,
        virtualOrganisationSelected,
        tree,
        facultySelected,
        issuerSelected
    } from "../../stores/filterCatalog";
</script>

<style lang="scss">
    div.sidebar {
        border-top-left-radius: var(--card-border-radius);
        border-bottom-left-radius: var(--card-border-radius);
        width: var(--width-side-bar);
        padding: var(--side-bar-alignment-v) var(--side-bar-alignment-h);
        background: var(--grey-2);

        h3 {
            margin-bottom: 8px;
        }

        > div {
            padding-bottom: 24px;

            &:not(:first-child) {
                padding-top: 24px;
                border-top: var(--card-border);
            }
        }
    }

    @media (max-width: 1120px) {
        div.sidebar {
            display: none;
        }
    }

</style>

<div class="sidebar">
    <div>
        <h3>{I18n.t('teacher.sidebar.filterBadges')}</h3>
    </div>

    <div>
        <FilterBlock
                bind:value={$educationalLevelSelected}
                collection={$tree.educationLevels}
                objectIdentifier="value"
                title="educations"/>
    </div>

    <div>
        <FilterBlock
                bind:value={$institutionSelected}
                collection={$tree.institutions}
                maxLength={10}
                title="institutions"/>
    </div>

    <div>
        <FilterBlock
                bind:value={$virtualOrganisationSelected}
                collection={$tree.virtualOrganisations}
                maxLength={10}
                title="virtualOrganisations"/>
    </div>

    {#if $institutionSelected.length > 0}
        <div>
            <FilterBlock
                    bind:value={$facultySelected}
                    collection={$tree.faculties}
                    maxLength={5}
                    title="faculties"/>
        </div>

        <div>
            <FilterBlock
                    bind:value={$issuerSelected}
                    collection={$tree.issuers}
                    maxLength={5}
                    title="issuers"/>
        </div>
    {/if}

    <!-- For now we don't display the StudyLoad as preparation to the server side pagination migration -->
    <!--  <div>-->
    <!--    <FilterBlock-->
    <!--      bind:value={$studyLoadSelected}-->
    <!--      collection={$tree.studyLoads}-->
    <!--      objectIdentifier="value"-->
    <!--      maxLength={100}-->
    <!--      title="studyLoads"/>-->
    <!--  </div>-->
    <!-- For now we don't display the EQF as of legal restrictions -->
    <!--  <div>-->
    <!--    <FilterBlock-->
    <!--      bind:value={$eqfLevelSelected}-->
    <!--      collection={$tree.eqfLevels}-->
    <!--      objectIdentifier="value"-->
    <!--      maxLength={100}-->
    <!--      title="eqfs"/>-->
    <!--  </div>-->

    <div>
        <FilterBlock
                bind:value={$typeBadgeClassSelected}
                collection={$tree.badgeClassTypes}
                objectIdentifier="value"
                maxLength={100}
                title="badgeClassType"/>
    </div>

</div>
