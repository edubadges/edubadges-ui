<script>
  import {onMount} from "svelte";
  import I18n from "i18n-js";
  import {link, navigate} from "svelte-routing";
  import {queryData} from "../../api/graphql";
  import {currentPath} from "../../stores/currentPath";
  import chevronRightSmall from "../../icons/chevron-right-small.svg";
  import LinkEye from "./LinkEye.svelte";
  import {userRole} from "../../stores/user";
  import {role} from "../../util/role";
  import {translateProperties} from "../../util/utils";

  export let faculty;
  export let issuer;
  export let badgeclass = {};
  export let badgeclassName = "";
  export let entity;
  export let edit = false;
  export let copy = false;
  export let create = false;
  export let studentBadge;
  export let studentPath;
  export let user;

  const query = `query {
    currentInstitution {
      nameEnglish,
      nameDutch,
    },
  }`;

  let institutionName = "";

  const editCreatePart = (isEdited, isCreate, isCopy) => {
    return isCopy
      ? I18n.t(["manage", "copy", entity])
      : isEdited
        ? I18n.t(["manage", "edit", entity])
        : isCreate
          ? I18n.t(["manage", "new", entity]) : undefined;
  };

  onMount(() => {
    if (studentBadge) {
      return;
    }
    queryData(query).then(res => {
      translateProperties(res.currentInstitution);
      institutionName = res.currentInstitution.name;
    })
      .catch(() => navigate("/notFound"));
  });
</script>

<style lang="scss">
  div.bread-crumb {
    padding: var(--ver-padding-m) var(--hor-padding-m);
    min-height: 47px;
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  a {
    color: var(--text-color-grey);
    text-decoration: underline;
  }

  a:last-of-type {
    font-weight: var(--semi-bold);
    text-decoration: none;
  }

  a:not(:last-of-type) {
    color: var(--text-grey-dark);
  }

  span.crumb {
    height: 14px;
    width: 14px;
    margin: auto 4px;
  }


</style>

<div class="bread-crumb">
  {#if studentBadge}
    <a use:link href={`/badge-requests`}>{studentPath}</a>
  {/if}

  {#if institutionName && !user}
    <a use:link href="/manage/institution">{institutionName}</a>
  {/if}

  {#if faculty && faculty.name}
    <span class="crumb">{@html chevronRightSmall}</span>
    <a use:link href={`/manage/faculty/${faculty.entityId}`}>{faculty.name}</a>
  {/if}

  {#if issuer && issuer.name}
    <span class="crumb">{@html chevronRightSmall}</span>
    <a use:link href={`/manage/issuer/${issuer.entityId}`}>{issuer.name}</a>
  {/if}

  {#if badgeclassName}
    <span class="crumb">{@html chevronRightSmall}</span>
    <a use:link href={`/manage/badgeclass/${badgeclass.entityId}/overview`}>{badgeclassName}</a>
  {/if}

  {#if user}
    <a use:link href={`/users/`}>Users</a>
    <span class="crumb">{@html chevronRightSmall}</span>
    <a use:link href={$currentPath}>{user.firstName} {user.lastName}</a>

  {/if}

  {#if edit || create || copy}
    <span class="crumb">{@html chevronRightSmall}</span>
    <a use:link href={$currentPath}>{editCreatePart(edit, create, copy)}</a>
  {/if}

  {#if badgeclassName && $userRole === role.TEACHER}
    <LinkEye badgeclass={badgeclass} isAdminView={true}/>
  {/if}
</div>
