<script>
  import I18n from "i18n-js";
  import {onMount} from "svelte";
  import {navigate} from "svelte-routing";
  import Modal from '../../components/forms/Modal.svelte';
  import Button from "../../components/Button.svelte";
  import {formatCreateDate} from "../../util/utils";
  import {
    getProfile,
    deleteProfile,
    getSocialAccount,
    getEmails,
  } from "../../api";

  import {
    userLoggedIn,
    userRole,
    authToken,
    redirectPath
  } from "../../stores/user";
  import {TextInput} from "../../components/forms";
  import {Spinner} from "../../components";
  import Verified from "../../components/shared/Verified.svelte";

  let profile;
  let loaded = false;

  //Modal
  let showModal = false;
  let modalTitle;
  let modalQuestion;
  let modalAction;

  onMount(() => {
    Promise.all([getProfile(), getSocialAccount()]).then(res => {
      profile = res[0];
      profile.eduid = res[1][0].eduid;
      profile.dateAdded = res[1][0].dateAdded;
      loaded = true;
    });
  });


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
        $redirectPath = "";
        navigate("/login?after_delete=true");
      });
    }
  }

  const eduIdValue = () => {
    const eduId = profile.eduid;
    return "*****" + eduId.substr(eduId.indexOf("-") + 1, eduId.lastIndexOf("-")) + "*****";
  }

</script>

<style lang="scss">

  h1 {
    font-size: 24px;
    margin-bottom: 40px;
  }

  div.profile-section {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;


  }

  h3 {
    margin-bottom: 8px;
  }

  p.account-info {
    margin-bottom: 25px;
  }

  div.delete {
    margin-top: 65px;
  }

</style>

{#if loaded}

  <div class="profile">
    <h1>{I18n.t("profile.profile")}</h1>
    {#if profile}
      <div class="profile"></div>
      <div class="profile-section">
        <h3>{I18n.t("profile.name")}</h3>
        <Verified value={`${profile.first_name} ${profile.last_name}`}/>
      </div>
      <div class="profile-section">
        <h3>{I18n.t("profile.email")}</h3>
        <Verified value={profile.email}/>
      </div>

      <div class="profile-section">
        <h3>{I18n.t("profile.eduid")}</h3>
        <Verified value={eduIdValue()}/>
      </div>

      <div class="profile-section">
        <h3>{I18n.t("profile.memberSince")}</h3>
        <Verified value={I18n.t("profile.memberSinceDate", formatCreateDate(profile.dateAdded))} showVerified={false}/>
      </div>
    {/if}
  </div>

  <div class="delete">
    <h3>{I18n.t("profile.deleteHeader")}</h3>
    <p class="account-info">{@html I18n.t("profile.deleteInfo1")}</p>
    <p class="account-info">{@html I18n.t("profile.deleteInfo2")}</p>
    <p class="account-info">{@html I18n.t("profile.deleteInfo3")}</p>
    <p class="account-info">{@html I18n.t("profile.deleteInfo4")}</p>
    <Button secondary={true} action={deleteProfileAction(true)} text={I18n.t("profile.deleteAccount")}/>
  </div>
{:else}
  <Spinner/>
{/if}

{#if showModal}
  <Modal submit={modalAction}
         warning={true}
         cancel={() => showModal = false}
         question={modalQuestion}
           title={modalTitle}>
  </Modal>
{/if}
