<script>
    import I18n from "i18n-js";
    import {isEmpty} from "../../util/utils";

    export let onClick;
    export let tipKey;

</script>

<style lang="scss">

    .markup-example {
        position: absolute;
        right: 0;
        top: 10px;
        font-size: 15px;
        z-index: 3;
        &.tooltip {
            right: 30px;
        }
    }
</style>

<a href="/"
   class="markup-example"
   class:tooltip={!isEmpty(I18n.translations[I18n.locale].tooltips[tipKey])}
   on:click|preventDefault|stopPropagation={onClick}>
    {I18n.t("newBadgeClassForm.form.markupExample")}
</a>