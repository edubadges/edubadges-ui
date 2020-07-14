<script>
  import Button from "../Button.svelte";
  import I18n from "i18n-js";
  import {Field, Select, TextInput} from "../../components/forms"
  import {inviteUser} from "../../api";
  import {rolesToPermissions} from "../../util/rolesToPermissions";
  import {isNumber} from "lodash";

  export let contentType;
  export let entityId;
  export let disabledRole;
  export let permissionsRoles;
  export let defaultValue;

  let newUsers = [{'email': '', 'chosenRole': _.isNumber(defaultValue) ? permissionsRoles[defaultValue] : ''}];
  let errors = [];

  const emailRegExp = /(.+)@(.+){1,}/

  const addEmailField = () => {
    newUsers = [...newUsers, {
      'email': '',
      'chosenRole': _.isNumber(defaultValue) ? permissionsRoles[defaultValue] : ''
    }];
  };

  const cancel = () => window.history.back();

  const submit = () => {
    errors = [];
    const userProvisonments = newUsers.filter(user => emailRegExp.test(user.email.test))
      .map(user => ({'userEmail': user.email, 'permissions': rolesToPermissions(user.chosenRole)}));
    inviteUser(contentType, entityId, userProvisonments).then(res => {
      if (res.some(el => {
        return el.status === "failure"
      })) {
        errors = res.map(el => {
          if (el.status === "failure") {
            if (el.message.email) {
              return [{'error_message': el.message.email[0]}]
            }
            if (el.message.fields) {
              return [{'error_message': el.message.fields}]
            }
          } else {
            return [{'error_message': ''}]
          }
        });
      } else {
        window.history.back();
      }
    })
  };
</script>

<style lang="scss">
  .user-invite {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    width: 100%;
  }

  .user-invite-field {
    width: 50%;
  }

  @media (max-width: 820px) {
    .user-invite {
      flex-direction: column;
    }
    .user-invite-field {
      width: 100%;
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
    margin-bottom: 10px;
    cursor: pointer;
  }

  .options {
    :global(a:last-child) {
      margin-left: 25px;
    }
  }
</style>

<div class="container main-content-margin">
  <h2>{I18n.t("inviteUsers.addUser.title")}</h2>

  <p class="info">{I18n.t("inviteUsers.addUser.description")}</p>

  {#each newUsers as newUser, i}
    <div>
      <div class="user-invite">
        <div class="user-invite-field">
          <Field entity={'inviteUsers'} attribute="email" errors={errors[i]}>
            <TextInput bind:value={newUser.email} error={errors.email}/>
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
    <p>disable {newUsers.some(user => !emailRegExp.test(user.email))}</p>
    <Button disabled={newUsers.some(user => !emailRegExp.test(user.email))}
            action={submit} text={I18n.t(['editUsers', 'modal', 'add'])}/>
  </div>
</div>