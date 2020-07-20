<script>
  import I18n from "i18n-js";
  import Button from "../Button.svelte";
  import { Field, Select, TextInput } from ".";
  import { onMount } from "svelte";
  import {entityType} from "../../util/entityTypes";
  import { permissionsRole } from "../../util/rolesToPermissions";

  export let submit;
  export let cancel;
  export let title;

  export let userId;
  export let badgeClasses = [];
  export let userInstitutionStaffs = [];
  export let userIssuerGroupStaffs = [];
  export let userIssuerStaffs = [];
  export let userBadgeClassStaffs = [];
  let roles = [];

  let chosenBadgeClass;
  let alreadyHasPermissionsOnChosenBadgeClass;
  let chosenRole;

  const setRolesForBadgeClass = selectedBadgeClass => {
    roles = [];
    if (!selectedBadgeClass.permissions.mayAdministrateUsers) {
      roles = [...roles, {name: I18n.t(['editUsers', 'badgeclass', permissionsRole.OWNER]), value: permissionsRole.OWNER}]
    }
    if (!selectedBadgeClass.permissions.mayUpdate) {
      roles = [...roles, {name: I18n.t(['editUsers', 'badgeclass', permissionsRole.EDITOR]), value: permissionsRole.EDITOR}]
    }
    if (!selectedBadgeClass.permissions.mayAward) {
      roles = [...roles, {name: I18n.t(['editUsers', 'badgeclass', permissionsRole.AWARDER]), value: permissionsRole.AWARDER}]
    }
    chosenRole = roles[roles.length - 1];
  };

  export let selectEntity;
  export let notes;

  let modal;

  const handle_keydown = e => {
    if (e.key === "Escape") {
      cancel();
    }
  };

</script>

<svelte:window on:keydown={handle_keydown}/>


<div class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h3>{title}</h3>
    </div>
    <div class="modal-body">
      <Field entity={'editUsers'} attribute={entityType.BADGE_CLASS}>
        <Select
            bind:value={chosenBadgeClass}
            items={badgeClasses}
            handleSelect={setRolesForBadgeClass}
            clearable={false}
            optionIdentifier="name"
        />
      </Field>
      <Field entity={'editUsers'} attribute={'role'}>
        <Select
            disabled={false}
            bind:value={chosenRole}
            bind:items={roles}
            clearable={false}
            optionIdentifier="name"
        />
      </Field>
      <Field entity={'editUsers'} attribute={'notes'}>
        <TextInput bind:value={notes} area={true} placeholder={I18n.t("placeholders.permissions.notes")}/>
      </Field>
    </div>
    <div class="options">
      <Button secondary={true} action={cancel} text={I18n.t("modal.cancel")}/>
      <Button action={submit} text={I18n.t(['editUsers', 'modal', 'add'])} disabled={false}/>
    </div>
  </div>
</div>

<style lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 57, 128, 0.8);
    z-index: 999;
    display: flex;
  }

  .modal-content {
    margin: auto;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    border-radius: 8px;
    background: white;
  }

  .modal-header {
    padding: 18px 32px;
    background-color: #dfe3e8;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .modal-body {
    padding: 18px 32px;
  }

  div.options {
    padding: 18px;
    text-align: center;

    :global(a:last-child) {
      margin-left: 25px;
    }
  }
</style>
