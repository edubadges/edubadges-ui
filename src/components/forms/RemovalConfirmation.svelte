<script>
  import I18n from "i18n-js";
  import {deleteEntity} from "../../api";
  import {role} from "../../util/role";
  import {flash} from "../../stores/flash";
  import {entityType} from "../../util/entityTypes";
  import {Modal} from ".";
  import {navigate} from "svelte-routing";

  export let entityTypeName;
  export let entityId;
  export let parentId;
  export let showRemoveModal;
  export let cancel;
  export let deleting;

  let removeModalTitle = I18n.t(`manage.delete.${entityTypeName}.title`);
  let removeModalQuestion = I18n.t(`manage.delete.${entityTypeName}.question`);

  let removeModalAction = () => {
    deleting(true);
    deleteEntity(entityTypeName, entityId)
      .then(() => {
        flash.setValue(I18n.t("manage.delete.flash", {type: I18n.t(`manage.delete.${entityTypeName}.name`)}));
        cancel();
        deleting(false);
        switch (entityTypeName) {
          case entityType.ISSUER_GROUP:
            navigate(`/manage/institution/groups`);
            break;
          case entityType.ISSUER:
            navigate(`/manage/institution/issuers`);
            break;
          case entityType.BADGE_CLASS:
            navigate(`/manage/issuer/${parentId}/badgeclasses`);
            break;
        }
      });
  }


</script>
<style>

</style>

{#if showRemoveModal}
  <Modal
      submit={removeModalAction}
      cancel={cancel}
      question={removeModalQuestion}
      title={removeModalTitle}/>
{/if}
