<script>
  import {onMount} from "svelte";
  import * as jwt_decode from 'jwt-decode';
  import security from "../icons/security.svg";
  import informational from "../icons/informational.svg";

  let idToken;
  let state;
  let afterAgreementUrlName

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    idToken = urlParams.get("id_token");
    state = urlParams.get("state");
    afterAgreementUrlName = urlParams.get("afterAgreementUrlName");
  });

</script>

<style>
  .page-container {
    display: flex;
    flex: 1;
  }

  .content {
    flex: 1;
    padding: 30px 20px;
  }
</style>

<div class="page-container">
  <div class="content">
    {#if idToken}
      {JSON.stringify(jwt_decode(idToken))}
    {/if}
  </div>
</div>
