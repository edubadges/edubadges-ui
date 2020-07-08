<script>
  import I18n from "i18n-js";
  import { UsersTable } from "../teachers";
  import { sortType } from "../../util/sortData";
  import { entityType } from "../../util/entityTypes";
  import { staffType } from "../../util/staffTypes";

  export let entity;
  export let institutionStaffs = [];
  export let issuerGroupStaffs = [];
  export let issuerStaffs = [];
  export let badgeClassStaffs = [];
  export let userProvisionments = [];

  let entitySearch = '';
  let permissions;

  $: tableHeaders = entity === entityType.INSTITUTION ?
    [
      {
        name: I18n.t("editUsers.institution.header"),
        attribute: "name",
        reverse: false,
        sortType: sortType.ALPHA
      },
      {
        name: I18n.t("editUsers.role"),
        attribute: "roles",
        reverse: false,
        sortType: sortType.COLLECTION
      }
    ] : entity === entityType.ISSUER_GROUP ?[
      {
        name: I18n.t("editUsers.faculty.header"),
        attribute: "name",
        reverse: false,
        sortType: sortType.ALPHA
      },
      {
        name: I18n.t("editUsers.role"),
        attribute: "roles",
        reverse: false,
        sortType: sortType.COLLECTION
      }
    ] : entity === entityType.ISSUER ?[
      {
        name: I18n.t("editUsers.issuer.header"),
        attribute: "name",
        reverse: false,
        sortType: sortType.ALPHA
      },
      {
        name: I18n.t("editUsers.role"),
        attribute: "roles",
        reverse: false,
        sortType: sortType.COLLECTION
      }
    ] : entity === entityType.BADGE_CLASS ?[
      {
        name: I18n.t("editUsers.issuer.header"),
        attribute: "name",
        reverse: false,
        sortType: sortType.ALPHA
      },
      {
        name: I18n.t("editUsers.badgeclass.header"),
        attribute: "name",
        reverse: false,
        sortType: sortType.ALPHA
      },
      {
        name: I18n.t("editUsers.role"),
        attribute: "roles",
        reverse: false,
        sortType: sortType.COLLECTION
      }
    ] : []
  ;

  $: table = {
    entity: "user",
    title: `${I18n.t(["editUsers", entity, 'permissions'])}`,
    tableHeaders: tableHeaders
  };
</script>

<UsersTable
    {...table}
    bind:search={entitySearch}
    withCheckAll={false}
>
  {#if entity === entityType.INSTITUTION}
    {#each institutionStaffs as staff}
    {/each}
  {:else if entity === entityType.ISSUER_GROUP}

  {:else if entity === entityType.ISSUER}

  {:else if entity === entityType.BADGE_CLASS}

  {/if}
</UsersTable>
