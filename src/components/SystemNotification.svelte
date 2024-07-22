<script>
    import {onMount} from "svelte";
    import I18n from "i18n-js";
    import alertIcon from "../icons/forms/alert-triangle.svg";

    export let systemNotifications = [];
    let notificationsMarkUp = [];

    onMount(() => {
        notificationsMarkUp = systemNotifications.map(notification => {
            const localeNotification = I18n.locale === "en" ? notification.notificationEn :
                notification.notificationNl;
            return localeNotification.replace(/\r\n/g, "<br/>")
        });
    })

</script>
<style lang="scss">
    .notifications-container {
        display: flex;
        flex-direction: column;
        padding: 20px 40px 0 40px;
    }

    .notification {
        display: flex;
        align-items: center;
        padding: 15px;
        background-color: var(--yellow-light);
        border-radius: 8px;
        box-shadow: 0 2px 0 1px var(--yellow-medium);
        font-size: 18px;
        line-height: 22px;

        &:not(&:last-child) {
            margin-bottom: 25px;
        }

        span.icon {
            margin-right: 25px;
            color: var(--red-strong-dark);

            :global(svg) {
                width: 30px;
                height: auto;
            }
        }
    }
</style>
<div class="notifications-container">
    {#each notificationsMarkUp as notification}
        <section class="notification">
            <span class="icon">
                {@html alertIcon}
            </span>
            <p>{@html notification}</p>
        </section>
    {/each}
</div>