<script>
    import I18n from "i18n-js";
    import {notificationsIcon} from "../../icons";
</script>

<style lang="scss">
  .entity {
    padding: var(--ver-padding-m) var(--hor-padding-m) 0;
    background: var(--purple-1);

    .content {
      display: flex;
      margin-bottom: var(--ver-padding-m);

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .title {
        display: flex;
        flex-direction: row;
      }

    }
  }

  .svg-container {
    width: 30px;
    margin: 0 25px;
    color: var(--purple-8);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }


</style>

<div class="entity">
    <div class="content">
        <div class="info">
            <div class="title">
                <div class="svg-container">
                    {@html notificationsIcon}
                </div>
                <h2>{I18n.t("notifications.title")}</h2>
            </div>
        </div>
    </div>

</div>
