<script>
  import I18n from "i18n-js";
  import {UsersTable} from "../teachers";
  import {sort, sortType} from "../../util/sortData";
  import {entityType} from "../../util/entityTypes";
  import {staffType} from "../../util/staffTypes";
  import {permissionsRole} from "../../util/rolesToPermissions";
  import ListLink from "./ListLink.svelte";

  export let entity;
  export let institutionStaffs = [];
  export let issuerGroupStaffs = [];
  export let issuerStaffs = [];
  export let badgeClassStaffs = [];

  let entitySearch = '';
  let permissions;

  let tableHeaders = [{attribute: "name", reverse: false, sortType: sortType.ALPHA}];

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
        attribute: "role",
        reverse: false,
        sortType: sortType.ROLES
      }
    ] : entity === entityType.ISSUER_GROUP ? [
      {
        name: I18n.t("editUsers.faculty.header"),
        attribute: "faculty.name",
        reverse: false,
        sortType: sortType.ALPHA
      },
      {
        name: I18n.t("editUsers.role"),
        attribute: "role",
        reverse: false,
        sortType: sortType.ROLES
      }
    ] : entity === entityType.ISSUER ? [
      {
        name: I18n.t("editUsers.issuer.header"),
        attribute: "issuer.name",
        reverse: false,
        sortType: sortType.ALPHA
      },
      {
        name: I18n.t("editUsers.faculty.header"),
        attribute: "issuer.faculty.name",
        reverse: false,
        sortType: sortType.ALPHA
      },
      {
        name: I18n.t("editUsers.role"),
        attribute: "role",
        reverse: false,
        sortType: sortType.ROLES
      }
    ] : entity === entityType.BADGE_CLASS ? [
      {
        name: I18n.t("editUsers.badgeclass.header"),
        attribute: "badgeclass.name",
        reverse: false,
        sortType: sortType.ALPHA
      },
      {
        name: I18n.t("editUsers.badgeclass.issuedBy"),
        attribute: "badgeclass.issuer.name",
        reverse: false,
        sortType: sortType.ALPHA
      },
      {
        name: I18n.t("editUsers.role"),
        attribute: "role",
        reverse: false,
        sortType: sortType.ROLES
      }
    ] : []
  ;

  let entitySort = tableHeaders[0];

  $: table = {
    entity: "user",
    title: `${I18n.t(["editUsers", entity, 'permissions'])}`,
    tableHeaders: tableHeaders
  };
</script>

<UsersTable
    {...table}
    bind:search={entitySearch}
    bind:sort={entitySort}
    withCheckAll={false}
>
  {#if entity === entityType.INSTITUTION}
    {#if institutionStaffs.length === 0}
      <td colspan="2">{I18n.t("zeroState.selfPermissions",{entity:entityType.INSTITUTION})}</td>
    {/if}
    {#each institutionStaffs as staff}
      <tr>
        <td>
          <ListLink path="/manage/institution/issuers" name={staff.institution.name}/>
        </td>
        <td>{I18n.t(['editUsers', 'institution', 'allRights'])}</td>
      </tr>
    {/each}
  {:else if entity === entityType.ISSUER_GROUP}
    {#if issuerGroupStaffs.length === 0}
      <td colspan="2">{I18n.t("zeroState.selfPermissions",{entity:entityType.ISSUER_GROUP})}</td>
    {/if}
    {#each sort(issuerGroupStaffs, entitySort.attribute, entitySort.reverse, entitySort.sortType) as staff}
      {#if staff.faculty.name.toLowerCase().includes(entitySearch.toLowerCase())}
        <tr>
          <td>
            <ListLink path={`/manage/faculty/${staff.faculty.entityId}/issuers`} name={staff.faculty.name}/>
          </td>
          {#if staff._staffType === staffType.ISSUER_GROUP_STAFF}
            <td>{I18n.t(['editUsers', 'faculty', 'allRights'])}</td>
          {:else if staff._staffType === staffType.INSTITUTION_STAFF}
            <td>
              {I18n.t(['editUsers', 'permissions', 'allRights'])}
              <br/>
              <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'institutionAllRights'])}</span>
            </td>
          {/if}
        </tr>
      {/if}
    {/each}
  {:else if entity === entityType.ISSUER}
    {#if issuerStaffs.length === 0}
      <td colspan="2">{I18n.t("zeroState.selfPermissions",{entity:entityType.ISSUER})}</td>
    {/if}
    {#each sort(issuerStaffs, entitySort.attribute, entitySort.reverse, entitySort.sortType) as staff}
      {#if staff.issuer.name.toLowerCase().includes(entitySearch.toLowerCase())}
        <tr>
          <td>
            <ListLink path={`/manage/issuer/${staff.issuer.entityId}/badgeclasses`} name={staff.issuer.name}/>
          </td>
          <td>
            <ListLink path={`/manage/faculty/${staff.issuer.faculty.entityId}/issuers`} name={staff.issuer.faculty.name}/>
          </td>
          {#if staff._staffType === staffType.ISSUER_STAFF}
            <td>{I18n.t(['editUsers', 'issuer', 'allRights'])}</td>
          {:else if staff._staffType === staffType.ISSUER_GROUP_STAFF}
            <td>
              {I18n.t(['editUsers', 'permissions', 'allRights'])}
              <br/>
              <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'issuerGroupAllRights'])}</span>
            </td>
          {:else if staff._staffType === staffType.INSTITUTION_STAFF}
            <td>
              {I18n.t(['editUsers', 'permissions', 'allRights'])}
              <br/>
              <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'institutionAllRights'])}</span>
            </td>
          {/if}
        </tr>
      {/if}
    {/each}
  {:else if entity === entityType.BADGE_CLASS}
    {#if badgeClassStaffs.length === 0}
      <td colspan="2">{I18n.t("zeroState.selfPermissions",{entity:entityType.BADGE_CLASS})}</td>
    {/if}
    {#each sort(badgeClassStaffs, entitySort.attribute, entitySort.reverse, entitySort.sortType) as staff}
      {#if staff.badgeclass.name.toLowerCase().includes(entitySearch.toLowerCase())}
        <tr>
          <td>
            <ListLink path={`/manage/badgeclass/${staff.badgeclass.entityId}/overview`} name={staff.badgeclass.name}/>
          </td>
          <td>
            <ListLink path={`/manage/issuer/${staff.badgeclass.issuer.entityId}/badgeclasses`}
                name={staff.badgeclass.issuer.name}/>
            <br />
            <span class="sub-text">{staff.badgeclass.issuer.faculty.name}</span>
          </td>
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
              <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'issuerAllRights'])}</span>
            </td>
          {:else if staff._staffType === staffType.ISSUER_GROUP_STAFF}
            <td>
              {I18n.t(['editUsers', 'permissions', 'allRights'])}
              <br/>
              <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'issuerGroupAllRights'])}</span>
            </td>
          {:else if staff._staffType === staffType.INSTITUTION_STAFF}
            <td>
              {I18n.t(['editUsers', 'permissions', 'allRights'])}
              <br/>
              <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'institutionAllRights'])}</span>
            </td>
          {/if}
        </tr>
      {/if}
    {/each}
  {/if}
</UsersTable>
