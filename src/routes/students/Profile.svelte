<script>
  import I18n from "i18n-js";
  import {onMount} from "svelte";
  import {navigate} from "svelte-routing";
  import Modal from '../../components/forms/Modal.svelte';
  import Button from "../../components/Button.svelte";
  import {
    getProfile,
    deleteProfile,
    getSocialAccount,
    getEmails,
    addEmail,
    setPrimaryEmail,
    deleteEmail
  } from "../../api";

  import {
    userLoggedIn,
    userRole,
    authToken,
    userVerifiedByInstitution,
    userInVerificationFlow,
    redirectPath
  } from "../../stores/user";
    import { TextInput } from "../../components/forms";

  let showModal = false;
  let emails = [];
  let email;
  let profile;
  let socialAccount;
  let form;
  let error = "";

  const setData = () => {
    Promise.all([getProfile(), getSocialAccount(), getEmails()]).then(res => {
      profile = res[0];
      socialAccount = res[1];
      emails = res[2].filter(email => !email.primary)
    });
  };

  const makePrimary = emailId =>
    setPrimaryEmail(emailId)
      .then(setData)
      .catch(err => {
        err.then(res => {
          I18n.t(["error", res.fields.error_code]);
        });
      });

  const removeEmail = emailId =>
    deleteEmail(emailId)
      .then(setData)
      .catch(err => {
        err.then(res => {
          error = I18n.t(["error", res.fields.error_code]);
        });
      });

  const submitEmail = email => {
    debugger;
    addEmail(email)
      .then(res => {
        setData();
        error = "";
        form.reset();
      })
      .catch(err => {
        err.then(res => {
          error = I18n.t(["error", res.fields.error_code]);
        });
      });
  };

  const deleteProfileAction = showConfirmation => () => {
    if (showConfirmation) {
      showModal = true
    } else {
      deleteProfile().then(() => {
        $userLoggedIn = "";
        $userRole = "";
        $authToken = "";
        $userVerifiedByInstitution = false;
        $userInVerificationFlow = false;
        $redirectPath = "";
        navigate("/login");
      });
    }
  }

  onMount(setData);

</script>

<style>
  ul {
    list-style: initial;
    margin-left: 20px;
  }

  li {
    margin-bottom: 16px;
  }

  div:not(:last-child) {
    margin-bottom: 25px;
  }

  .error {
    color: red;
  }
</style>

<div>
  <h4>{I18n.t("profile.profile")}</h4>

  {#if profile}
    <p>{I18n.t("profile.name")}: {profile.first_name} {profile.last_name}</p>
    <p>{I18n.t("profile.primary")}: {profile.email}</p>
  {/if}
</div>

<div>
  <h4>{I18n.t("profile.emails")}</h4>

  <ul>
    {#each emails as { email, verified, id } (id)}
      <li>
        {I18n.t("profile.email")}: {email}
        <br/>
        <Button disabled={!verified} action={() => makePrimary(id)} text={I18n.t("profile.makePrimary")}/>
        {#if !verified}(unverified){/if}

        <br/>
        <Button action={() => removeEmail(id)} text={I18n.t("profile.delete")}/>
      </li>
    {/each}
  </ul>
</div>

<div>
  <h4>{I18n.t("profile.addEmail")}</h4>

  <TextInput bind:value={email}/>
  <Button action={() => submitEmail(email)} text={I18n.t("profile.submit")}/>
  {#if error}
    <p class="error">{error}</p>
  {/if}
</div>

<div>
  <Button action={deleteProfileAction(true)} text={I18n.t("profile.deleteAccount")}/>
</div>

{#if showModal}
  <Modal submit={deleteProfileAction(false)}
         cancel={() => showModal = false}
         question={I18n.t("profile.deleteAccountConfirmation")}
           title={I18n.t("profile.deleteAccount")}></Modal>
{/if}
