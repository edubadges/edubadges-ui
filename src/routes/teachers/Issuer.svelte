<script>
  import { onMount } from "svelte";
  import { getIssuer, getIssuerStaff, getIssuerBadges } from "../../api";

  export let slug = "";

  let issuer;
  let staff = [];
  let badges = [];

  onMount(() => {
    getIssuer(slug).then(
      res => {
        issuer = res;
        console.log("issuer", res);
      },
      error => console.error("issuer", error)
    );

    getIssuerBadges(slug).then(
      res => {
        badges = res;
        console.log("badges", res);
      },
      error => console.error("badges", error)
    );

    getIssuerStaff(slug).then(
      res => {
        staff = res;
        console.log("staff", res);
      },
      error => console.error("staff", error)
    );
  });
</script>

<div>
  <h3>Issuer</h3>
  {#if issuer}
    Name: {issuer.name}
    <br />
    Description: {issuer.description}
    <br />
    Badges: {issuer.badgeClassCount}
    <br />
    Staff: {issuer.staff.length}
  {:else}Loading issuer...{/if}

  <h3>Issuer badges ({badges.length})</h3>
  {#if badges.length > 0}
    {badges.map(b => b.name).join(', ')}
  {:else}No badges{/if}

  <h3>Issuer staff ({staff.length})</h3>
  {#if staff.length > 0}
    {staff.map(s => s.user.email).join(', ')}
  {:else}No staff{/if}
</div>
