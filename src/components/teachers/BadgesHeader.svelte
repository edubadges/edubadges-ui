<script>
    import {onMount} from "svelte";
    import I18n from "i18n-js";
    import {HeaderList} from "../teachers";
    import {queryData} from "../../api/graphql";
    import {headerEntityMultiLanguage, headerStaff} from "../../api/queries";
    import {selectedEntity} from "../../stores/filterBadges";
    import {translateProperties} from "../../util/utils";

    let institution = {};
    $: entity = $selectedEntity || institution;

    const query = `query {
    currentInstitution {
      imageEnglish,
      imageDutch,
      ${headerEntityMultiLanguage},
      ${headerStaff},
    }
  }`;

    onMount(() => {
        queryData(query).then(res => {
            institution = res.currentInstitution;
            translateProperties(institution);
        })
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

    const currentLanguage = I18n.locale;
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

    .img-container {
      flex-shrink: 0;
      height: 120px;
      width: 120px;
      background: white;
      margin-right: var(--hor-padding-m);
      display: flex;
      justify-content: space-around;
    }

    .img-icon {
      height: 100px;
      width: 100px;
      background-color: white;
      align-self: center;
      display: flex;
      justify-content: space-around;
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
</h2>
<div class="header">
    {#if entity.image}
        <div class="img-container">
            <div class="img-icon">
                <img src={entity.image} alt=""/>
            </div>
        </div>
    {/if}
    <div class="content">
        <p>{entity.description}</p>
        <HeaderList {headerItems} entity="institution"/>
    </div>
</div>
