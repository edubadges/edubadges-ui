<script>
    import I18n from "i18n-js";
    import {deleteLtiCourse, linkLtiCourse} from "../../../api";
    import {Modal} from "../../forms";
    import {flash} from "../../../stores/flash";
    import {onMount} from 'svelte';
    import {ltiContext} from "../../../stores/lti";
    import {queryData} from "../../../api/graphql";
    import Spinner from "../../Spinner.svelte";
    import Button from "../../Button.svelte";
    import info from "../../../icons/informational.svg";
    import moment from "moment";

    export let badgeclass;
    export let ltiCourse;
    export let refresh;
    export let mayUpdatePermission;

    const query = `query ($clientId: String, $issuer: String) {
          ltiTool(clientId: $clientId, issuer: $issuer) {
            id,
            title,
            description,
            issuer
          },
    }`
    let loaded = false;

    //Modal
    let showModal = false;
    let modalTitle;
    let modalQuestion;
    let modalAction;

    //LTI
    let launchJson = null;
    let ltiTool = null;
    let contextLoaded = false;
    let existingLink = false;
    let i18nCtx = {};

    onMount(() => {
        contextLoaded = $ltiContext.launchId && $ltiContext.launchJson;
        existingLink = !!ltiCourse;
        i18nCtx = {
            name: badgeclass.name,
            lti: ltiCourse ? ltiCourse.title : "",
            institution: badgeclass.issuer.faculty.institution.name
        }
        if (contextLoaded) {
            const clientId = $ltiContext.launchJson.aud;
            const issuer = $ltiContext.launchJson.iss;
            queryData(query, {clientId, issuer}).then(res => {
                ltiTool = res.ltiTool;
                if (!existingLink) {
                    const ctx = $ltiContext.launchJson["https://purl.imsglobal.org/spec/lti/claim/context"];
                    ltiCourse = {
                        identifier: ctx.id,
                        title: ctx.title,
                        label: ctx.label,
                        badgeclass: badgeclass.id,
                        tool: ltiTool.id,
                    }
                }
                loaded = true;
            });
        } else {
            loaded = true;
        }
    });

    const linkCourse = showConfirmation => {
        if (showConfirmation) {
            modalTitle = I18n.t("ltiBadgeClass.actions.link");
            modalQuestion = I18n.t("ltiBadgeClass.confirmations.link", i18nCtx);
            modalAction = () => linkCourse(false);
            showModal = true;
        } else {
            linkLtiCourse(ltiCourse).then(() => {
                refresh();
                flash.setValue(I18n.t('ltiBadgeClass.flash.link'));
            });
            showModal = false;
        }
    }

    const unlinkCourse = showConfirmation => {
        if (showConfirmation) {
            modalTitle = I18n.t("ltiBadgeClass.actions.unLink");
            modalQuestion = I18n.t("ltiBadgeClass.confirmations.unLink", i18nCtx);
            modalAction = () => unlinkCourse(false);
            showModal = true;
        } else {
            deleteLtiCourse(ltiCourse).then(() => {
                refresh();
                flash.setValue(I18n.t('ltiBadgeClass.flash.unLink'));
            });
            showModal = false;
        }
    }
</script>

<style lang="scss">
  h3 {
    margin-bottom: 40px;

  }

  section.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 15px;

    div.sub-info {
      display: flex;
      align-items: start;
      margin-top: 15px;
    }

    .svg {
      margin-right: 15px;
    }

    background-color: #95d7e4;
  }

</style>
{#if loaded}
    <div class="container main-content-margin">
        <div class="header">
            <h3>{I18n.t("ltiBadgeClass.title")}</h3>
            {#if existingLink}
                <p>{I18n.t("ltiBadgeClass.linked", i18nCtx)}</p>
            {:else}
                <p>{I18n.t("ltiBadgeClass.notLinked", i18nCtx)}</p>
            {/if}
            {#if !contextLoaded}
                {#if existingLink}
                    <p>{I18n.t("ltiBadgeClass.unlinkNotPossible", i18nCtx)}</p>
                {:else }
                    <p>{I18n.t("ltiBadgeClass.linkNotPossible", i18nCtx)}</p>
                {/if}
            {/if}

            {#if mayUpdatePermission && contextLoaded}
                <div class="actions">
                    {#if existingLink}
                        <Button text={I18n.t("ltiBadgeClass.actions.unlink", i18nCtx)}
                                action={() => unlinkCourse(true)}/>
                    {:else}
                        <Button text={I18n.t("ltiBadgeClass.actions.link", i18nCtx)} action={() => linkCourse(true)}/>
                    {/if}
                </div>
            {/if}
        </div>
        {#if existingLink}
            <table class="lti-table">
                <thead>
                <tr>
                    <th>{I18n.t("ltiBadgeClass.course.title")}</th>
                    <th>{I18n.t("ltiBadgeClass.course.label")}</th>
                    <th>{I18n.t("ltiBadgeClass.course.identifier")}</th>
                    <th>{I18n.t("ltiBadgeClass.course.createdAt")}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{ltiTool.title}</td>
                    <td>{ltiTool.label}</td>
                    <td>{ltiTool.identifier}</td>
                    <td>{moment(ltiTool.createdAt).format('MMM D, YYYY')}</td>
                </tr>
                </tbody>
            </table>
        {/if}
        {#if contextLoaded}
            <section class="info">
                <div class="sub-info">
                    <span class="svg">{@html info}</span>
                    <span>{@html I18n.t("ltiBadgeClass.tool.info", i18nCtx)}</span>
                </div>

                <p>{ltiTool.description}</p>
            </section>
        {/if}
    </div>
{:else}
    <Spinner/>
{/if}

{#if showModal}
    <Modal
            submit={modalAction}
            cancel={() => showModal = false}
            question={modalQuestion}
            title={modalTitle}/>
{/if}
