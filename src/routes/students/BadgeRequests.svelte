<script>
  import {onMount} from "svelte";
  import {
    requestBadge,
    withdrawRequestBadge
  } from "../../api";
  import {queryData} from "../../api/graphql";
  import EnrollmentBadge from "./EnrollmentBadge.svelte";
  import I18n from "i18n-js";
  import {flash} from "../../stores/flash";
  import Spinner from "../../components/Spinner.svelte";

  let requests = [];
  let error = false;
  let loaded = false;

  const query = `query {
    enrollments {
      entityId,
      dateCreated,
      denied,
      dateAwarded,
      badgeClass {
        entityId,
        name,
        image,
        issuer {
          name,
          image,
          faculty {
            name
          }
        }
      },
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      requests = res.enrollments.filter(el => !el.dateAwarded);
      loaded = true;
    });
  });

  const withdrawRequest = id =>
    withdrawRequestBadge(id)
      .then(() => queryData(query).then(res => {
        requests = res.enrollments;
        flash.setValue(I18n.t("student.flash.withdrawn"));
      }))
      .catch(err => {
        err.then(res => {
          error = I18n.t(["error", res.fields.error_code]);
        });
      });
</script>

<style>

  h3 {
    font-size: 22px;
    margin-bottom: 20px;
  }

  div.content {
    display: grid;
    grid-template-columns: 31% 31% 31%;
    grid-row: auto;
    grid-column-gap: 25px;
    grid-row-gap: 25px;
  }

  @media (max-width: 1120px) {
    div.content {
      grid-template-columns: 48% 48%;
    }
  }

  @media (max-width: 820px) {
    div {
      grid-template-columns: 100%;
    }
  }

</style>

<div>
  {#if loaded}
    <h3>{I18n.t("routes.badge-requests")}</h3>

    {#if requests.length === 0}
      {I18n.t("badgeRequests.none")}
    {/if}
    <div class="content">
      {#each requests as request}
        <EnrollmentBadge enrollmentId={request.entityId} badgeClass={request.badgeClass} denied={request.denied}/>
      {/each}
    </div>
  {:else}
    <Spinner/>
  {/if}

</div>
