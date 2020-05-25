<script>
  import {onMount} from "svelte";
  import {
    requestBadge,
    withdrawRequestBadge
  } from "../../api";
  import {queryData} from "../../api/graphql";
  import EnrollmentBadge from "./EnrollmentBadge.svelte";

  let form;
  let provider;
  let requests = [];
  let error = false;

  const query = `{
    enrollments {
      entityId,
      dateCreated,
      denied,
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
      requests = res.enrollments;
    });
  });

  const makeRequest = event => {
    const id = event.target.entityId.value;

    requestBadge(id)
      .then(() => {
        queryData(query).then(res => {
          requests = res.enrollments;
        });
        error = "";
        form.reset();
      })
      .catch(err => {
        err.then(res => {
          error = I18n.t(["error", res.fields.error_code]);
        });
      });
  };

  const withdrawRequest = id =>
    withdrawRequestBadge(id)
      .then(() => queryData(query).then(res => {
        requests = res.enrollments;
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
  <h3>Badge requests</h3>

  <div class="content">
    {#each requests as request}
      <EnrollmentBadge enrollmentId={request.entityId} badgeClass={request.badgeClass} detailPage={false}/>
    {/each}
  </div>
</div>
