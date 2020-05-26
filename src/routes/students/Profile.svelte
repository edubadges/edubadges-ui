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

  let emails = [];
  let email;
  let profile;
  let socialAccount;
  let form;
  let error = "";

  //Modal
  let showModal = false;
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
        navigate("/login?after_delete=true");
      });
    }
  }

  onMount(setData);

</script>

<style>
  h1 {
    font-size: 22px;
    margin-bottom: 20px;
    border-left: 2px solid var(--purple-2);
    padding-left: 25px;
  }


  div.profile-section {
    display: flex;
    flex-direction: column;
    margin-bottom: 45px;
  }

  p.account-info {
    margin-bottom: 25px;
  }
</style>

<div>
  <h1>{I18n.t("profile.profile")}</h1>

  {#if profile}
    <div class="profile"></div>
    <div class="profile-section">
      <h3>{I18n.t("profile.name")}</h3>
      <span>{`${profile.first_name} ${profile.last_name}`}</span>
      <span>{`(${I18n.t('profile.validatedByYourInstitution')})`}</span>
    </div>
    <div class="profile-section">
      <h3>{I18n.t("profile.email")}</h3>
      <span>{profile.email}</span>
    </div>

    <div class="profile-section">
      <h3>{I18n.t("profile.eduid")}</h3>
      <span>{profile.email}</span>
    </div>

  {/if}
</div>

<div>
  <h3>{I18n.t("profile.deleteHeader")}</h3>
  <p class="account-info">{@html I18n.t("profile.deleteInfo")}</p>
  <Button action={deleteProfileAction(true)} text={I18n.t("profile.deleteAccount")}/>
</div>

{#if showModal}
  <Modal submit={modalAction}
         cancel={() => showModal = false}
         question={modalQuestion}
           title={modalTitle}>
  </Modal>
{/if}
