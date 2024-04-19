<script>
  import I18n from "i18n-js";
  import Button from "../Button.svelte";
  import {isEmpty} from "../../util/utils";
  import {Field, Select, TextInput} from ".";
  import {createEventDispatcher, onMount} from "svelte";
  import {entityType} from "../../util/entityTypes";
  import indicator from "../../icons/chevron-down-large.svg";
  import {permissionsRole} from "../../util/rolesToPermissions";
  import {
    changeUserToBadgeclassAwarder,
    changeUserToBadgeclassEditor,
    changeUserToBadgeclassOwner,
    makeUserBadgeclassAwarder,
    makeUserBadgeclassEditor,
    makeUserBadgeclassOwner
  } from "../../api";
  import {flash} from "../../stores/flash";

  const dispatch = createEventDispatcher();

  export let cancel;
  export let title;

  export let userNameDict;
  export let busy;
  export let userId;
  export let targetOptions = [];
  export let badgeClassStaffs = [];

  let filteredBadgeClassStaffs = [];
  let roles = [];

  let chosenBadgeClasses = null;
  let chosenRole;

  const setRolesForBadgeClass = selectedBadgeClasses => {
    roles = [];
    let permissions = badgeClassStaffs.find(bCF => selectedBadgeClasses && selectedBadgeClasses.some(chosen => chosen.entityId === bCF.badgeclass.entityId));
    if (!permissions || !permissions.mayAdministrateUsers) {
      roles = [...roles, {
        name: I18n.t(['editUsers', 'badgeclass', permissionsRole.OWNER]),
        value: permissionsRole.OWNER
      }]
    }
    if (!permissions || !permissions.mayUpdate) {
      roles = [...roles, {
        name: I18n.t(['editUsers', 'badgeclass', permissionsRole.EDITOR]),
        value: permissionsRole.EDITOR
      }]
    }
    if (!permissions || !permissions.mayAward) {
      roles = [...roles, {
        name: I18n.t(['editUsers', 'badgeclass', permissionsRole.AWARDER]),
        value: permissionsRole.AWARDER
      }]
    }
    chosenRole = roles[roles.length - 1];
  };

  setRolesForBadgeClass(chosenBadgeClasses);

  let notes;

  const submit = () => {
    busy && busy();
    let alreadyHasPermissions = badgeClassStaffs.find(bCF => chosenBadgeClasses && chosenBadgeClasses.some(chosen => chosen.entityId === bCF.badgeclass.entityId));

    if (alreadyHasPermissions) {
      switch (chosenRole.value) {
        case permissionsRole.OWNER:
          changeUserToBadgeclassOwner(alreadyHasPermissions.entityId).then(() => {
            dispatch('permissionAdded');
            flash.setValue(I18n.t("editUsers.flash.makeUserBadgeClassAdmin", userNameDict));
          });
          break;
        case permissionsRole.EDITOR:
          changeUserToBadgeclassEditor(alreadyHasPermissions.entityId).then(() => {
            dispatch('permissionAdded');
            flash.setValue(I18n.t("editUsers.flash.makeUserBadgeClassEditor", userNameDict));
          });
          break;
        case permissionsRole.AWARDER:
          changeUserToBadgeclassAwarder(alreadyHasPermissions.entityId).then(() => {
            dispatch('permissionAdded');
            flash.setValue(I18n.t("editUsers.flash.makeUserBadgeClassAwarder", userNameDict));
          });
          break;
      }
    } else {
      let promise = null;
      let flashPart = "";
      switch (chosenRole.value) {
        case permissionsRole.OWNER:
          promise = makeUserBadgeclassOwner;
          flashPart = "makeUserBadgeClassAdmin";
          break;
        case permissionsRole.EDITOR:
          promise = makeUserBadgeclassEditor;
          flashPart = "makeUserBadgeClassEditor";
          break;
        case permissionsRole.AWARDER:
          promise = makeUserBadgeclassAwarder;
          flashPart = "makeUserBadgeClassAwarder";
          break;
      }
      const promises = chosenBadgeClasses.map(chosen => promise(chosen.entityId, userId, notes));
      Promise.all(promises).then(() => {
            dispatch('permissionAdded');
            flash.setValue(I18n.t(`editUsers.flash.${flashPart}`, userNameDict));
      });
    }
  };

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
      <Field entity={'editUsers'} full={true} attribute={entityType.BADGE_CLASS}>
        <Select
          bind:value={chosenBadgeClasses}
          items={targetOptions}
          isMulti={true}
          full={true}
          clearable={false}
          customIndicator={indicator}
          showIndicator={false}
          showChevron={true}
          placeholder={I18n.t("models.editUsers.badgeClassPlaceholder")}
          handleSelect={setRolesForBadgeClass}
          optionIdentifier="name"
        />
      </Field>
      <Field entity={'editUsers'} full={true} attribute={'role'}>
        <Select
          disabled={false}
          customIndicator={indicator}
          full={true}
          bind:value={chosenRole}
          bind:items={roles}
          clearable={false}
          optionIdentifier="name"
        />
      </Field>
      <Field entity={'editUsers'} full={true} attribute={'notes'}>
        <TextInput full={true} bind:value={notes} area={true} placeholder={I18n.t("placeholders.permissions.notes")}/>
      </Field>
    </div>
    <div class="options">
      <Button secondary={true} action={cancel} text={I18n.t("modal.cancel")}/>
      <Button action={submit} text={I18n.t(['editUsers', 'modal', 'add'])} disabled={isEmpty(chosenBadgeClasses)}/>
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
    max-width: 44em;
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
