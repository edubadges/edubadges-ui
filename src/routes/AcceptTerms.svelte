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

  const agree = () => {
    /*
    http://localhost:8000/accept_terms/eduid_terms_accepted_callback/%5B%221%22,%20%22edu_id%22,%20%22%22,%20%22%22,%20%22%22,%20%5B%22login%22%5D%5D/eyJraWQiOiJrZXlfMjAyMF8wNl8yNF8wMF8wMF8wMF8wMDEiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJlZHViYWRnZXMiLCJzdWIiOiJlZHViYWRnZXMiLCJuYmYiOjE1OTI5OTY3MjQsImlzcyI6Imh0dHBzOlwvXC9jb25uZWN0LnRlc3Quc3VyZmNvbmV4dC5ubCIsImNsYWltcyI6IkFWeWZDSU04djhLRjRmOW1vUHR3YXZ3Q1BrSVdiZXdzTXo3Qk14V05UbThuXC8wQnExdDhEQ09qR3ZMclZFbm5Ea0tFUGZvR1NLOEprY1RnZ3NUMEFOdWtpQ09rMG5mNmFmeWdyMlI5ZmlKS0gza1p2OE8xNXNNdDg0QkpGTVdHR0lUSktBOEFzdXlJOUdCdzdIT3VXUFRUR250b0ZDVTRoaGhBT2JoQkk1R05NcHFjRVRmOUMrOUxuXC9uS2wwb3lWMDBRWGdENUhvVVJVTXc1eHVucU5pK3VyVkVuTnpLZDkrN29jczJvQ3d3VEVKUEIyVFwvY05jcWpyY1Rsd1pYN0NkNEY2V0JFSUp5ajZ1XC8xUWFveTJFYzc2SnNHWWpyNVFqdEpSdDllb1FmeFFDZ2pMT29xbTNGeTRZMmd0NHdubVVFdVo0enNyMXNMMGludFlCWlZMOEpCakhoR2VacWdcL05aVERZaHNmY3pCMDdram1lbEhqd0VZSU5LcTlLaWxzVnRRSjNaQXlISlErQlZ2N2dDK2NMdkd2SmtMTXJUOE9TaUM4TndtRUNUZmExYkwxRmRXK3VzaXRFcyt4cmJHYWJXSmR0bWNEanR0TVhkTndDZ05QN1BRWEEzeU85bVVYbFpNUTEyRDB0MjY4NkIwVmRybnRXdXlWZ3VXZHZaRCtwckp5UzhGU09xbXJCUUFIWU00TnVWNnc5c1BObEZDTVlIU29tYXlCTzlIb25USDBYa3VrM1hMbENqTVRqME1oTzRvbW95S0lYNlp3aWNQWEN0aHBQbSthdXllZ0NnQWZwUmk5R1FjQ3NXeTIwN2hxUGhXSFpDWSttcGdkMG5QVU5YTkNCMFlIUmc2MUtyS2Vkb0phaEZFck5LVzRRU1ZrdlpqeXQ1Z2xoU1wvQ0JRV0Q1aWJ4V3Z3Qk9QWWRHdGxlalNseVwvTUhmOVNWRG1ybU1tYXg5ZWUxT2N6aytMVE5Eazgra0krSytWOHRibHhMSW43ZkNlc2U1dE84ZkNSNEc5WTU5bndaREJhWmJ3MXc0VlRZaEdxYWtYdms0QW5XenozNVRDdkVadE9zb0pYK3RzQVZ5RHRcL1wvcEJyMEp1c1pMYUFKbm82b1oyeGxLUndPMGhNZ1hOcVg1VFlmNXVmcVJWbnVtaWZhWUt3ZWtDbkZycnZRUGpWYk0wdHlXK3N2eU1qZWU4WmJlNjhjY2xReWpYek9palprcEt5MWpHUG5HbTRBOTYrSFJZZDN6N0FOSkxHTHFsXC9JQ2hoTmhvckc1N29Ja3RGUEdxcHI3VDF0M09OSTMwdTN6Z0MyZDVoVlU4OEhlaWU1RExjZURDV3oxTlc5Mm5hU1RkOVBcL29BaHBTSUxkSlI3TUVCOWNkaDZGK1BPcEF4VWF3ZnRUNmoyRzMzUDNYMjE0eG1cL3FJSlwvdTFvaFF4YTZpRG1lcHhkZW81bVFQbDRSZEhtWDBhZkx1b2hrVjRSQmZGcE01V1RPK1ZoazJIbDJvTnN1QUluSHkwZjg3WHRRUGZRU0k0K3JOdGFuNzlYN21oZ055WFJuRFlyMmd3blNSdDZiS2JXMVZEdFhrUT09IiwiZXhwIjoxNTkzMDAwMzI0LCJjbGFpbV9rZXlfaWQiOiIxNTUzOTI2Mjc1IiwiaWF0IjoxNTkyOTk2NzI0LCJqdGkiOiIzZjZjYTliNS00M2Y0LTRlMjEtODQ4Yy1jNmRiOTM0YTU0ZDYifQ.VFR9hGEZDovLb_Eu4HRRCf-46RaFZJMcuLdrOuWEN5FscjA8dqBU56NKBsUhL8ROnkcLB41sNA24fCM80-HZWdH0nj5Bw7b6JqqPOW1jwAoWl05YoeLC6t83nDAO2fIm_GrbXU_MKZdfhZI7I6dmR2pdZvLGFEvo3DEz0KtnsLmzXsHBbY7WyYRfxTdUfKWXwN6TXNzTspznSfg6bm2XhCsvvY8k8HSVzEXKdHQM18XevvmB0dgKOTyvpKNF8B7ZN_SNYGMmOmQTI2R0_-XCJ0TWyUv9nvldpq6FCLUdChxThaROHljaR6NWRcRsgjvI8JmVvNVs6Hx_IbppY8PDEQ
     */
  }

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
