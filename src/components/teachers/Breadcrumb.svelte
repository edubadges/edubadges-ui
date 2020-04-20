<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import { link, navigate } from "svelte-routing";
  import { queryData } from "../../api/graphql";
  import { currentPath } from "../../stores/currentPath";

  export let faculty;
  export let issuer;
  export let badgeclassName = "";
  export let entity;
  export let edit = false;
  export let create = false;

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
    queryData(query)
      .then(({ currentInstitution: { name } }) => {
        institutionName = name;
      })
      .catch(() => navigate("/notFound"));
  });
</script>

<style>
  div {
    padding: var(--ver-padding-m) var(--hor-padding-m);
    min-height: 47px;
  }

  a {
    color: var(--text-color-grey);
  }

  a:last-of-type {
    font-weight: bold;
  }

  a:not(:last-of-type) {
    text-decoration: underline;
  }

  span {
    margin: auto 4px;
  }
</style>

<div>
  <a use:link href="/manage/institution">{institutionName}</a>

  {#if faculty}
    <span>></span>
    <a use:link href={`/manage/faculty/${faculty.entityId}`}>{faculty.name}</a>
  {/if}

  {#if issuer}
    <span>></span>
    <a use:link href={`/manage/issuer/${issuer.entityId}`}>{issuer.name}</a>
  {/if}

  {#if badgeclassName}
    <span>></span>
    <a use:link href={$currentPath}>{badgeclassName}</a>
  {/if}

  {#if edit || create}
    <span>></span>
    <a on:click|preventDefault|stopPropagation href="/#">
      {editCreatePart(edit, create)}
    </a>
  {/if}

</div>
