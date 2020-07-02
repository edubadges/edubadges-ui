<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import { link, navigate } from "svelte-routing";
  import { queryData } from "../../api/graphql";
  import { currentPath } from "../../stores/currentPath";
  import chevronRightSmall from "../../icons/chevron-right-small.svg";

  export let faculty;
  export let issuer;
  export let badgeclass = {};
  export let badgeclassName = "";
  export let entity;
  export let edit = false;
  export let create = false;
  export let studentBadge;
  export let studentPath;
  export let user;

  const query = `{
    currentInstitution {
      name
    },
  }`;

  let institutionName = "";

  const editCreatePart = (isEdited, isCreate) => {
    return isEdited
      ? I18n.t(["manage", "edit", entity])
      : isCreate
      ? I18n.t(["manage", "new", entity])
      : undefined;
  };

  onMount(() => {
    if (studentBadge){
      return;
    }
    queryData(query)
      .then(({ currentInstitution: { name } }) => {
        institutionName = name;
      })
      .catch(() => navigate("/notFound"));
  });
</script>

<style>
  div.bread-crumb {
    padding: var(--ver-padding-m) var(--hor-padding-m);
    min-height: 47px;
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  a {
    color: var(--text-color-grey);
  }

  a:last-of-type {
    font-weight: var(--semi-bold);
  }

  a:not(:last-of-type) {
    color: var(--text-grey-dark)
  }

  span {
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

  {#if faculty}
    <span>{@html chevronRightSmall}</span>
    <a use:link href={`/manage/faculty/${faculty.entityId}`}>{faculty.name}</a>
  {/if}

  {#if issuer}
    <span>{@html chevronRightSmall}</span>
    <a use:link href={`/manage/issuer/${issuer.entityId}`}>{issuer.name}</a>
  {/if}

  {#if badgeclassName}
    <span>{@html chevronRightSmall}</span>
    <a use:link href={`/manage/badgeclass/${badgeclass.entityId}/overview`}>{badgeclassName}</a>
  {/if}

  {#if user}
    <a use:link href={`/users/`}>Users</a>
    <span>></span>
    <a use:link href={$currentPath}>{user.firstName} {user.lastName}</a>

  {/if}

  {#if edit || create}
    <span>{@html chevronRightSmall}</span>
    <a use:link href={$currentPath}>{editCreatePart(edit, create)}</a>
  {/if}
</div>
