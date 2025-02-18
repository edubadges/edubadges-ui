<script>
    import I18n from "i18n-js";
    import {FilterBlock} from "../../components/teachers";
    import {facultyIds, issuerIds, selectedRole, userTree} from "../../stores/filterUsersNew";
    import FilterBlockRoles from "./FilterBlockRoles.svelte";

    export let objectIdentifier = "entity_id";

</script>

<style lang="scss">
    div.sidebar {
        border-top-left-radius: var(--card-border-radius);
        border-bottom-left-radius: var(--card-border-radius);
        width: var(--width-side-bar);
        padding: var(--side-bar-alignment-v) var(--side-bar-alignment-h);
        background: var(--grey-2);

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
        <h3>{I18n.t('teacher.sidebar.filterUsers')}</h3>
    </div>

    <div>
        <FilterBlock
                bind:value={$facultyIds}
                collection={$userTree.faculties}
                objectIdentifier={objectIdentifier}
                title="faculties"/>
    </div>

    <div>
        <FilterBlock
                bind:value={$issuerIds}
                collection={$userTree.issuers}
                objectIdentifier={objectIdentifier}
                title="issuers"/>
    </div>

    <div>
        <FilterBlockRoles
                bind:value={$selectedRole}
                collection={$userTree.roles}
                title="roles"/>
    </div>
</div>
