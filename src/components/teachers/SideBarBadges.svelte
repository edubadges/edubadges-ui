<script>
    import I18n from "i18n-js";
    import {FilterBlock} from "../../components/teachers";
    import {
        facultyIds,
        issuerIds,
        tree,
        typeBadgeClassSelected,
        tagBadgeClassSelected
    } from "../../stores/filterBadgesNew";
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
</style>

<div class="sidebar">
    <div>
        <h3>{I18n.t('teacher.sidebar.filterBadges')}</h3>
    </div>

    <div>
        <FilterBlock
                bind:value={$facultyIds}
                collection={$tree.faculties}
                title="faculties"/>
    </div>

    <div>
        <FilterBlock
                bind:value={$issuerIds}
                collection={$tree.issuers}
                title="issuers"/>
    </div>

    <div>
        <FilterBlock
                bind:value={$typeBadgeClassSelected}
                collection={$tree.badgeClassTypes}
                objectIdentifier="value"
                maxLength={100}
                title="badgeClassType"/>
    </div>

    <div>
        <FilterBlock
                bind:value={$tagBadgeClassSelected}
                collection={$tree.badgeClassTags}
                objectIdentifier="name"
                maxLength={100}
                title="badgeClassTag"
                selectModus={true}
                placeholder={I18n.t('teacher.sidebar.badgeTagPlaceholder')}/>
    </div>
</div>
