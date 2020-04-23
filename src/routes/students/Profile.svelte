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
  import {TextInput} from "../../components/forms";

  let showModal = false;
  let emails = [];
  let email;
  let profile;
  let socialAccount;
  let form;
  let error = "";

  //Modal
  let modalTitle;
  let modalQuestion;
  let modalAction;

  const setData = () => {
    Promise.all([getProfile(), getSocialAccount(), getEmails()]).then(res => {
      profile = res[0];
      socialAccount = res[1];
      emails = res[2].filter(email => !email.primary)
    });
  };

  const makePrimary = (showConfirmation, emailId) => {
    if (showConfirmation) {
      modalTitle = I18n.t("profile.makePrimary");
      modalQuestion = I18n.t("profile.makePrimaryConfirmation");
      modalAction = () => makePrimary(false, emailId);
      showModal = true;
    } else {
      showModal = false;
      setPrimaryEmail(emailId)
        .then(setData)
        .catch(err => {
          err.then(res => {
            I18n.t(["error", res.fields.error_code]);
          });
        });
    }
  }

  const removeEmail = (showConfirmation, emailId) => {
    if (showConfirmation) {
      modalTitle = I18n.t("profile.deleteEmail");
      modalQuestion = I18n.t("profile.deleteEmailConfirmation");
      modalAction = () => removeEmail(false, emailId);
      showModal = true;

    } else {
      showModal = false;
      deleteEmail(emailId)
        .then(setData)
        .catch(err => {
          err.then(res => {
            error = I18n.t(["error", res.fields.error_code]);
          });
        });
    }
  }

  const submitEmail = email => {
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
      showModal = true;
      modalTitle = I18n.t("profile.deleteAccount");
      modalQuestion = I18n.t("profile.deleteAccountConfirmation");
      modalAction = deleteProfileAction(false);
    } else {
      showModal = false;
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
  h3 {
    font-size: 22px;
    margin-bottom: 20px;
    border-left: 2px solid var(--purple-2);
    padding-left: 25px;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  thead {
    color: purple;
    border-bottom: 3px solid var(--grey-3);
    text-align: left;
  }

  tbody td:first-child {
    width: 50%;
  }

  tbody td {
    padding: 10px;
  }

  div:not(:last-child) {
    margin-bottom: 45px;
  }

  span.unverified {
    font-style: italic;
  }

  .error {
    color: red;
  }

  p.account-info {
    margin-bottom: 25px;
  }
</style>

<div>
  <h3>{I18n.t("profile.profile")}</h3>

  {#if profile}
    <table class="profile">
      <thead>
      <tr>
        <th>{I18n.t("profile.name")}</th>
        <th>{I18n.t("profile.primary")}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{profile.last_name}</td>
        <td>{profile.email}</td>
      </tr>
      </tbody>
    </table>
  {/if}
</div>

<div>
  <h3>{I18n.t("profile.emails")}</h3>

  <table class="emails">
    <thead>
    <tr>
      <th>{I18n.t("profile.email")}</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    {#each emails as { email, verified, id } (id)}
      <tr>
        <td>{email}
          {#if !verified}
            <span class="unverified"> - {I18n.t("profile.unverified")}</span>
          {/if}
        </td>
        <td>
          <div class="actions">
            <Button disabled={!verified} action={() => makePrimary(true, id)} text={I18n.t("profile.makePrimary")}/>

            <Button action={() => removeEmail(true, id)} text={I18n.t("profile.delete")}/>
          </div>
        </td>
      </tr>
    {/each}

    </tbody>
  </table>
</div>

<div>
  <h3>{I18n.t("profile.addEmail")}</h3>
  <table>
    <thead>
    <tr>
      <th>{I18n.t("profile.addEmailInfo")}</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>
        <TextInput bind:value={email}/>
      </td>
      <td>
        <Button action={() => submitEmail(email)} text={I18n.t("profile.submit")}/>
      </td>
    </tr>
    </tbody>
  </table>
  {#if error}
    <p class="error">{error}</p>
  {/if}
</div>

<div>
  <h3>{I18n.t("profile.account")}</h3>
  <p class="account-info">{I18n.t("profile.accountInfo")}</p>
  <Button action={deleteProfileAction(true)} text={I18n.t("profile.deleteAccount")}/>
</div>

{#if showModal}
  <Modal submit={modalAction}
         cancel={() => showModal = false}
         question={modalQuestion}
           title={modalTitle}>
  </Modal>

{/if}
