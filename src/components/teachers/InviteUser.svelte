<script>
  import Button from "../Button.svelte";
  import I18n from "i18n-js";
  import {Field, Select, TextInput} from "../../components/forms"
  import {inviteUser} from "../../api";
  import {rolesToPermissions} from "../../util/rolesToPermissions";
  import {isNumber} from "lodash";
  import {trash} from "../../icons";
  import {flash} from "../../stores/flash";
  import {navigate} from "svelte-routing";

  export let contentType;
  export let entityId;
  export let disabledRole;
  export let permissionsRoles = [];
  export let defaultValue = 0;

  let newUsers = [{"email": "", "chosenRole": permissionsRoles[defaultValue]}];
  let errors = [];
  let working = false;

  const emailRegExp = /(.+)@(.+){1,}/

  const addEmailField = () => {
    newUsers = [...newUsers, {
      'email': '',
      'chosenRole': permissionsRoles[defaultValue]
    }];
  };

  const findErrors = (index, email) => {
    const error = errors[index];
    return error ? error.email === email ? [error] : undefined : undefined;
  }

  const deleteEmailField = index => {
    newUsers = newUsers.filter((user, i) => i !== index);
  }

  const cancel = () => window.history.back();

  const submit = () => {
    working = true;
    const userProvisionments = newUsers.filter(user => emailRegExp.test(user.email))
      .map(user => ({'userEmail': user.email, 'permissions': rolesToPermissions(user.chosenRole.value)}));
    inviteUser(contentType, entityId, userProvisionments).then(res => {
      let hasFailures = res.some(el => el.status === "failure");
      if (hasFailures) {
        errors = res.map(el => {
          if(el.status === "failure"){
            return {
              email: el.email,
              error_code: el.message.fields.error_code,
              error_message: el.message.fields.error_message
            }
          }
        });
      }
      newUsers = newUsers.filter(user => errors.find(error => error ? error.email === user.email: undefined));
      const emails = res.filter(el => el.status === "success").map(el => el.email);
      if (emails.length > 0) {
        flash.setValue(I18n.t('inviteUsers.flash.confirm', {emails: emails.join(", ")}));
      }
      working = false;
      if (!hasFailures) {
        window.history.back();
      }
    });
  };
</script>

<style lang="scss">
  .user-invite {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    width: 100%;
    align-items: center;
    align-content: center;
  }

  .user-invite-field {
    width: 50%;

    &.first {
      padding-left: 28px;
    }

    &.second {
      padding-left: 15px;
    }
  }

  @media (max-width: 820px) {
    .user-invite {
      flex-direction: column;
    }
    .user-invite-field {
      width: 100%;

      &.first {
        padding-left: 0;
      }

      &.second {
        padding-left: 0;
      }
    }
  }


  p.info {
    margin-bottom: 25px;
  }

  .add-email {
    color: green;
    border: none;
    background-color: inherit;
    font-size: 16px;
    padding: 0;
    margin-bottom: 15px;
    cursor: pointer;
    display: inline-block;
  }

  .options {
    :global(a:last-child) {
      margin-left: 25px;
    }

  }

  .rm-icon-container {
    border: none;
    background-color: inherit;
    color: purple;
    display: inline-block;
    height: 30px;
    width: 30px;
    margin: 12px 0 5px 0;
    align-self: center;
    cursor: pointer;
  }

</style>

<div class="container main-content-margin">
  <h2>{I18n.t("inviteUsers.addUser.title")}</h2>

  <p class="info">{I18n.t("inviteUsers.addUser.description")}</p>

  {#each newUsers as newUser, i}
    <div>
      <div class="user-invite">
        {#if i !== 0}
          <button class="rm-icon-container" on:click={() => deleteEmailField(i)}>{@html trash}</button>
        {/if}
        <div class={`user-invite-field ${i === 0 ? "first" : ""}`}>
          <Field entity={'inviteUsers'} attribute="email" errors={findErrors(i, newUser.email)}>
            <TextInput bind:value={newUser.email} error={findErrors(i, newUser.email)}
                       placeholder={I18n.t("placeholders.userManagement.email")}/>
          </Field>
        </div>
        <div class={`user-invite-field ${i === 0 ? "second" : ""}`}>
          <Field entity={'editUsers'} attribute={'role'}>
            <Select
              disabled={disabledRole}
              bind:value={newUser.chosenRole}
              items={permissionsRoles}
              clearable={false}
              optionIdentifier="value"
            />
          </Field>
        </div>
      </div>
    </div>
  {/each}

  <a href="/add-email" class="add-email" on:click|preventDefault|stopPropagation={() => addEmailField()}>
    {I18n.t(['manage', 'award', 'addAnother'])}
  </a>

  <div class="options">
    <Button secondary={true} action={cancel} text={I18n.t("inviteUsers.cancel")}/>
    <Button disabled={working || newUsers.some(user => !emailRegExp.test(user.email))}
            action={submit} text={I18n.t(['editUsers', 'modal', 'add'])}/>
  </div>
</div>