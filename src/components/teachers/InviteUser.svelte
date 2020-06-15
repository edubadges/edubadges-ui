<script>
  import Button from "../Button.svelte";
  import I18n from "i18n-js";
  import { Field, Select, TextInput } from "../../components/forms"
  import { inviteUser } from "../../api";
  import { rolesToPermissions } from "../../util/rolesToPermissions";
  import {isNumber} from "lodash";

  export let contentType;
  export let entityId;
  export let disabledRole;
  export let permissionsRoles;
  export let defaultValue;

  let newUsers = [{'email': '', 'chosenRole': _.isNumber(defaultValue) ? permissionsRoles[defaultValue] : ''}];
  let errors = {};

  const addEmailField = () => {
    newUsers = [...newUsers, {'email': '', 'chosenRole': _.isNumber(defaultValue) ? permissionsRoles[defaultValue] : ''}];
  };

  const cancel = () => window.history.back();

  const submit = () => {
    const userProvisonments = newUsers.map(user => {
      return {'userEmail': user.email, 'permissions': rolesToPermissions(user.chosenRole)};
    });
    inviteUser(contentType, entityId, userProvisonments);
  };
</script>

<style>
  .user-invite {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    width: 100%;
  }

  .user-invite-field {
    width: 50%;
  }

  .add-email {
    color: green;
    border: none;
    background-color: inherit;
    font-size: 16px;
    padding: 0;
    margin-left: 5px;
    margin-right: 5px;
  }
</style>

<div class="container main-content-margin">
  <h2>{I18n.t("inviteUsers.addUser.title")}</h2>

  <p>{I18n.t("inviteUsers.addUser.description")}</p>

  {#each newUsers as newUser}
    <div>
      <div class="user-invite">
        <div class="user-invite-field">
          <Field entity={'inviteUsers'} attribute="email" errors={errors.email}>
            <TextInput bind:value={newUser.email} error={errors.email} />
          </Field>
        </div>
        <div class="user-invite-field">
          <Field entity={'editUsers'} attribute={'role'}>
            <Select
                disabled={disabledRole}
                bind:value={newUser.chosenRole}
                items={permissionsRoles}
                clearable={false}
                optionIdentifier="name"
            />
          </Field>
        </div>
      </div>
    </div>
  {/each}

  <button class="add-email" on:click={() => addEmailField()}>{I18n.t(['manage', 'award', 'addAnother'])}</button>

  <div class="options">
    <Button secondary={true} action={cancel} text={I18n.t("inviteUsers.cancel")}/>
    <Button action={submit} text={I18n.t(['editUsers', 'modal', 'add'])} disabled={false}/>
  </div>
</div>