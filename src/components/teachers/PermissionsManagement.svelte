<script>
  import I18n from "i18n-js";
  import {UsersTable} from "../teachers";
  import {sortType} from "../../util/sortData";
  import {entityType} from "../../util/entityTypes";
  import {staffType} from "../../util/staffTypes";
  import {permissionsRole} from "../../util/rolesToPermissions";

  export let entity;
  export let institutionStaffs = [];
  export let issuerGroupStaffs = [];
  export let issuerStaffs = [];
  export let badgeClassStaffs = [];

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
    ] : entity === entityType.ISSUER_GROUP ? [
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
    ] : entity === entityType.ISSUER ? [
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
    ] : entity === entityType.BADGE_CLASS ? [
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
    {#if institutionStaffs.length === 0}
      <td colspan="2">{I18n.t("zeroState.selfPermissions",{entity:entityType.INSTITUTION})}</td>
    {/if}
    {#each institutionStaffs as staff}
      <tr>
        <td>{staff.institution.name}</td>
        <td>{I18n.t(['editUsers', 'institution', 'allRights'])}</td>
      </tr>
    {/each}
  {:else if entity === entityType.ISSUER_GROUP}
    {#if issuerGroupStaffs.length === 0}
      <td colspan="2">{I18n.t("zeroState.selfPermissions",{entity:entityType.ISSUER_GROUP})}</td>
    {/if}
    {#each issuerGroupStaffs as staff}
      <tr>
        <td>{staff.faculty.name}</td>
        {#if staff._staffType === staffType.ISSUER_GROUP_STAFF}
          <td>{I18n.t(['editUsers', 'faculty', 'allRights'])}</td>
        {:else if staff._staffType === staffType.INSTITUTION_STAFF}
          <td>
            {I18n.t(['editUsers', 'permissions', 'allRights'])}
            <br/>
            {I18n.t(['editUsers', 'permissions', 'institutionAllRights'])}
          </td>
        {/if}
      </tr>
    {/each}
  {:else if entity === entityType.ISSUER}
    {#if issuerStaffs.length === 0}
      <td colspan="2">{I18n.t("zeroState.selfPermissions",{entity:entityType.ISSUER})}</td>
    {/if}
    {#each issuerStaffs as staff}
      <tr>
        <td>{staff.issuer.name}</td>
        {#if staff._staffType === staffType.ISSUER_STAFF}
          <td>{I18n.t(['editUsers', 'issuer', 'allRights'])}</td>
        {:else if staff._staffType === staffType.ISSUER_GROUP_STAFF}
          <td>
            {I18n.t(['editUsers', 'permissions', 'allRights'])}
            <br/>
            {I18n.t(['editUsers', 'permissions', 'issuerGroupAllRights'])}
          </td>
        {:else if staff._staffType === staffType.INSTITUTION_STAFF}
          <td>
            {I18n.t(['editUsers', 'permissions', 'allRights'])}
            <br/>
            {I18n.t(['editUsers', 'permissions', 'institutionAllRights'])}
          </td>
        {/if}
      </tr>
    {/each}
  {:else if entity === entityType.BADGE_CLASS}
    {#if badgeClassStaffs.length === 0}
      <td colspan="2">{I18n.t("zeroState.selfPermissions",{entity:entityType.BADGE_CLASS})}</td>
    {/if}
    {#each badgeClassStaffs as staff}
      <tr>
        <td>{staff.badgeclass.issuer.name}</td>
        <td>{staff.badgeclass.name}</td>
        {#if staff._staffType === staffType.BADGE_CLASS_STAFF}
          <td>
            {I18n.t(['editUsers', 'badgeclass',
            staff.mayAdministrateUsers? permissionsRole.OWNER :
            staff.mayUpdate ? permissionsRole.EDITOR : permissionsRole.AWARDER
            ])}
          </td>
        {:else if staff._staffType === staffType.ISSUER_STAFF}
          <td>
            {I18n.t(['editUsers', 'permissions', 'allRights'])}
            <br/>
            {I18n.t(['editUsers', 'permissions', 'issuerAllRights'])}
          </td>
        {:else if staff._staffType === staffType.ISSUER_GROUP_STAFF}
          <td>
            {I18n.t(['editUsers', 'permissions', 'allRights'])}
            <br/>
            {I18n.t(['editUsers', 'permissions', 'issuerGroupAllRights'])}
          </td>
        {:else if staff._staffType === staffType.INSTITUTION_STAFF}
          <td>
            {I18n.t(['editUsers', 'permissions', 'allRights'])}
            <br/>
            {I18n.t(['editUsers', 'permissions', 'institutionAllRights'])}
          </td>
        {/if}
      </tr>
    {/each}
  {/if}
</UsersTable>