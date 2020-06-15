<script>
  import moment from "moment";
  import I18n from "i18n-js";

  export let accepted;
  export let rejected;
  export let date;
</script>

<style>
  .invite-widget {
    width: 100%;
    padding: 7px;
    font-size: small;
  }

  .invite-widget-accepted {
    background-color: lightgreen;
    border-radius: 40px;
  }

  .invite-widget-pending {
    background-color: lightgoldenrodyellow;
    border-radius: 40px;
  }
</style>

<span class="invite-widget {accepted ? 'invite-widget-accepted' : 'invite-widget-pending'}">
  {accepted ? I18n.t(['inviteUsers', 'accepted']) : `${I18n.t(['inviteUsers', 'sent'])} ${moment(date).format('DD MMM')}`}
</span>
