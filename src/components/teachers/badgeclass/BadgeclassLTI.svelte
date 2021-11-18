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
            institution: badgeclass.issuer.faculty.institution.name,
            platform: ltiCourse ? ltiCourse.tool.title : ""
        }
        if (existingLink) {
            ltiTool = ltiCourse.tool;
            loaded = true;
        } else if (contextLoaded) {
            const clientId = $ltiContext.launchJson.aud;
            const issuer = $ltiContext.launchJson.iss;
            queryData(query, {clientId, issuer}).then(res => {
                ltiTool = res.ltiTool;
                const ctx = $ltiContext.launchJson["https://purl.imsglobal.org/spec/lti/claim/context"];
                ltiCourse = {
                    identifier: ctx.id,
                    title: ctx.title,
                    label: ctx.label,
                    badgeclass: badgeclass.id,
                    tool: ltiTool.id
                }
                i18nCtx.lti = ltiCourse.title;
                i18nCtx.platform = ltiTool.title;
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
                flash.setValue(I18n.t('ltiBadgeClass.flash.link', i18nCtx));
            });
            showModal = false;
        }
    }

    const unlinkCourse = showConfirmation => {
        if (showConfirmation) {
            modalTitle = I18n.t("ltiBadgeClass.actions.unlink");
            modalQuestion = I18n.t("ltiBadgeClass.confirmations.unlink", i18nCtx);
            modalAction = () => unlinkCourse(false);
            showModal = true;
        } else {
            deleteLtiCourse(ltiCourse).then(() => {
                refresh();
                flash.setValue(I18n.t('ltiBadgeClass.flash.unlink', i18nCtx));
            });
            showModal = false;
        }
    }
</script>

<style lang="scss">
  .header {
    margin-top: 60px;
    display: flex;
    align-items: center;

    .left {
      max-width: 50%;
    }
  }

  h3 {
    margin-bottom: 20px;

  }

  p.context {
    margin-top: 15px;

  }

  div.actions {
    margin-left: auto;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 25px;

    thead {
      color: purple;
      border-bottom: 3px solid var(--grey-3);
      text-align: left;
      cursor: pointer;

      th.identifier {
        width: 35%;
      }

      th.platform {
        width: 20%;
      }

      th.label {
        width: 15%;
      }

      th.title {
        width: 15%;
      }

      th.createdAt {
        width: 15%;
      }
    }

    th, td {
      padding: var(--ver-padding-m) 0;
    }

    tbody {
      tr:not(:last-of-type) td {
        border-bottom: var(--card-border);
      }
    }
  }

  section.info {
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 15px;
    margin: 15px 0;
    background-color: #95d7e4;

    .svg {
      margin-right: 15px;
    }

    span {
      line-height: 20px;
    }

  }


</style>
{#if loaded}
    <div class="container main-content-margin">
        <div class="header">
            <div class="left">
                <h3>{I18n.t("ltiBadgeClass.title")}</h3>
                {#if existingLink}
                    <p>{@html I18n.t("ltiBadgeClass.linked", i18nCtx)}</p>
                {:else}
                    <p>{@html I18n.t("ltiBadgeClass.notLinked", i18nCtx)}</p>
                {/if}
                {#if !contextLoaded}
                    {#if existingLink}
                        <!--                        <p class="context">{@html I18n.t("ltiBadgeClass.unlinkNotPossible", i18nCtx)}</p>-->
                    {:else }
                        <p class="context">{@html I18n.t("ltiBadgeClass.linkNotPossible", i18nCtx)}</p>
                    {/if}
                {/if}
            </div>
            {#if mayUpdatePermission}
                <div class="actions">
                    {#if existingLink}
                        <Button text={I18n.t("ltiBadgeClass.actions.unlink", i18nCtx)}
                                action={() => unlinkCourse(true)}/>
                    {:else if contextLoaded}
                        <Button text={I18n.t("ltiBadgeClass.actions.link", i18nCtx)} action={() => linkCourse(true)}/>
                    {/if}
                </div>
            {/if}
        </div>
        {#if existingLink}
            <table class="lti-table">
                <thead>
                <tr>
                    <th class="title">{I18n.t("ltiBadgeClass.course.title")}</th>
                    <th class="label">{I18n.t("ltiBadgeClass.course.label")}</th>
                    <th class="platform">{I18n.t("ltiBadgeClass.course.platform")}</th>
                    <th class="identifier">{I18n.t("ltiBadgeClass.course.identifier")}</th>
                    <th class="createdAt">{I18n.t("ltiBadgeClass.course.createdAt")}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{ltiCourse.title}</td>
                    <td>{ltiCourse.label}</td>
                    <td>{ltiCourse.tool.title}</td>
                    <td>{ltiCourse.identifier}</td>
                    <td>{moment(ltiCourse.createdAt).format('MMM D, YYYY')}</td>
                </tr>
                </tbody>
            </table>
        {/if}
        {#if contextLoaded}
            <section class="info">
                <span class="svg">{@html info}</span>
                <span>{@html I18n.t("ltiBadgeClass.tool.info", i18nCtx)}</span>
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
