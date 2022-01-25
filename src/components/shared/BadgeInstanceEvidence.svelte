<script>
    import I18n from "i18n-js";
    import MarkdownField from "../forms/MarkdownField.svelte";

    export let evidences = [];
    export let isPrivate = false;


</script>

<style lang="scss">

  div.badge-public-evidence-container {
    padding: 10px 40px 30px 40px;

    &.is-private {
      padding: 0;
    }

    div.badge-public-evidence {
      display: flex;
    }

    .right-side-nav {
      margin-left: auto;
      min-width: 30%;
      padding-left: 25px;

      div {
        display: flex;
        flex-direction: column;

        span {
          margin: 0 0 10px 0;
        }

      }

    }

  }

  @media (max-width: 1120px) {
    div.badge-public-evidence-container {
      flex-direction: column;
      padding: 0 20px 30px 20px !important;

      &.is-private {
        padding: 0 !important;
      }

      div.badge-public-evidence {
        flex-direction: column;
      }

      .right-side-nav {
        margin-left: 0;
        margin-top: 20px;
        padding-left: 0;
      }
    }

  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
    padding-top: 15px;
    border-top: 1px solid var(--grey-5);
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .info {
    margin-bottom: 30px;
    word-break: break-all;
  }

</style>
{#if evidences && evidences.length > 0}
    <div class="badge-public-evidence-container" class:is-private={isPrivate}>
        <h3>{I18n.t('models.enrollment.evidenceHeader')}</h3>
        {#each evidences as evidence}
            <div class="badge-public-evidence">
                <div class="left-side-nav">
                    {#if evidence.narrative}
                        <h4>{I18n.t('models.enrollment.evidenceNarrative')}</h4>
                        <div class="info markdown-body">
                            <MarkdownField value={evidence.narrative} disabled={true}/>
                        </div>
                    {/if}
                    {#if evidence.id || evidence.evidenceUrl}
                        <h4>{I18n.t('models.enrollment.evidenceURL')}</h4>
                        <a href={evidence.id || evidence.evidenceUrl}
                           target="_blank">{evidence.id || evidence.evidenceUrl}</a>
                    {/if}
                </div>
                <div class="right-side-nav">
                    {#if evidence.name}
                        <div>
                            <h4>{I18n.t('models.enrollment.evidenceName')}</h4>
                            <span>
              {evidence.name}
            </span>
                        </div>
                    {/if}
                    {#if evidence.description}
                        <div>
                            <h4>{I18n.t('models.enrollment.evidenceDescription')}</h4>
                            <span>
              {evidence.description}
            </span>
                        </div>
                    {/if}
                </div>

            </div>
        {/each}
    </div>
{/if}

