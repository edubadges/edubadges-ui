<script>
  import {onMount} from "svelte";
  import I18n from "i18n-js";
  import {HeaderList} from "../teachers";
  import {queryData} from "../../api/graphql";
  import {headerEntity, headerStaff} from "../../api/queries";
  import {formatAdminNames} from "../../util/entityHeader";
  import {selectedEntity} from "../../stores/filterBadges";
  import RemoteImage from "../RemoteImage.svelte";

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

  $: headerItems = [
    {
      attr: "created",
      type: "date",
      value: entity.createdAt
    },
    {
      attr: "admin",
      type: "adminNames",
      value: entity
    }
  ];
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

      p {
        margin-bottom: var(--ver-padding-m);
      }
    }
  }
</style>

<h2>
  {I18n.t('teacher.badgeclasses.title')}
  {#if entity} in {entity.name}{/if}
</h2>
<div class="header">
  {#if entity.image}
    <div class="image">
      <RemoteImage imageUrl={entity.image} alt={`${entity.name} logo`}/>
    </div>
  {/if}
  <div class="content">
    <p>{entity.description}</p>
    <HeaderList {headerItems} entity="institution" />
  </div>
</div>
