<script>
  import {onMount} from "svelte";
  import { getSocialAccounts, getUnearnedBadges, requestBadge } from "../../api";

  let provider = '';

  onMount(() => {
      getSocialAccounts().then( res => {
          provider = res[0]['provider'];
      })
  });

  const unearnedBadgesButton = () => {
    getUnearnedBadges(provider);
  };

  const requestBadgeButton = () => {
    console.log("requesting badge");
    const url = document.getElementById("asdf").value;
    requestBadge(url).then(res => {
      console.log(res);
    });
  }
</script>

<div>BadgeRequests</div>

<button on:click={requestBadgeButton}>Request Badge</button>

<label>
    <input id="asdf"/>
</label>
