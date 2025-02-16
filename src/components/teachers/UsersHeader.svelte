<script>
    import I18n from "i18n-js";
    import {currentInstitution} from "../../stores/user";

</script>

<style lang="scss">
    h2 {
        margin-bottom: var(--ver-padding-m);
    }
</style>

<h2>
    {I18n.t('editUsers.headerControl')} {$currentInstitution.name}
</h2>
