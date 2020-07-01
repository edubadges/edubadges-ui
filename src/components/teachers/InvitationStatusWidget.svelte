<script>
  import moment from "moment";
  import I18n from "i18n-js";

  export let accepted;
  export let date;
</script>

<style>
  .invite-widget {
    width: 100%;
    padding: 5px 15px;
    font-size: small;
    border-radius: 20px;
  }

  .invite-widget-accepted {
    background-color: var(--green-light);
  }

  .invite-widget-pending {
    background-color: var(--yellow-light);
  }
</style>

<span class="invite-widget {accepted ? 'invite-widget-accepted' : 'invite-widget-pending'}">
  {accepted ? I18n.t(['inviteUsers', 'accepted']) : `${I18n.t(['inviteUsers', 'sent'])} ${moment(date).format('DD MMM')}`}
</span>
