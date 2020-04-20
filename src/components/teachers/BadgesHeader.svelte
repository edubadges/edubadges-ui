<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import { queryData } from "../../api/graphql";
  import { headerEntity, headerStaff } from "../../api/queries";
  import { formatAdminNames } from "../../util/entityHeader";
  import { selectedEntity } from "../../stores/filter";

  let institution = {};
  $: entity = $selectedEntity || institution;

  const query = `{
    currentInstitution {
      image,
	  ${headerEntity},
      ${headerStaff},
    }
  }`;

  onMount(() => {
    queryData(query).then(res => (institution = res.currentInstitution));
  });
</script>

<style lang="scss">
  h2 {
    margin-bottom: var(--ver-padding-m);
  }

  .header {
    background: var(--purple-1);
    border-left: 2px solid var(--purple-3);

    padding: var(--ver-padding-m) var(--hor-padding-m);
    margin-bottom: var(--ver-padding-l);

    display: flex;

    .image {
      height: 100px;
      width: 100px;
      background: white;
      padding: 5px;
      margin-right: var(--hor-padding-m);
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  table {
    width: fit-content;
    margin-top: var(--ver-padding-s);
    border-collapse: collapse;

    td,
    th {
      text-align: left;
      border-right: 1px solid var(--grey-5);
      padding-right: 15px;

      &:not(:first-child) {
        padding-left: 15px;
      }
    }
  }
</style>

<h2>
  {I18n.t('teacher.badgeclasses.title')}
  {#if entity}in {entity.name}{/if}
</h2>
<div class="header">
  {#if entity.image}
    <div class="image">
      <img src={entity.image} alt={`${entity.name} logo`} />
    </div>
  {/if}
  <div class="content">
    <p>{entity.description}</p>
    <table>
      <thead>
        <tr>
          <th>
            <h5>{I18n.t('models.institution.created')}</h5>
          </th>
          <th>
            <h5>{I18n.t('models.institution.admin')}</h5>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{new Date(entity.createdAt).toLocaleDateString()}</td>
          <td>{formatAdminNames(entity)}</td>
        </tr>
      </tbody>
    </table>
  </div>

</div>
