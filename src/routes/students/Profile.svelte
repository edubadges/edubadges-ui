<script>
  import I18n from "i18n-js";
  import { onMount } from "svelte";
  import {
    getProfile,
    getSocialAccount,
    getEmails,
    addEmail,
    setPrimaryEmail,
    deleteEmail
  } from "../../api";

  let emails = [];
  let profile;
  let socialAccount;
  let form;
  let error = "";

  const setProfile = () => getProfile().then(res => (profile = res));

  const setSocialAccount = () =>
    getSocialAccount().then(res => (socialAccount = res));

  const setEmails = () =>
    getEmails().then(res => (emails = res.filter(({ primary }) => !primary)));

  const setData = () => {
    setProfile();
    setSocialAccount();
    setEmails();
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
      .then(setEmails)
      .catch(err => {
        err.then(res => {
          error = I18n.t(["error", res.fields.error_code]);
        });
      });
  const submitEmail = event => {
    const email = event.target.email.value;

    addEmail(email)
      .then(res => {
        setEmails();
        error = "";
        form.reset();
      })
      .catch(err => {
        err.then(res => {
          error = I18n.t(["error", res.fields.error_code]);
        });
      });
  };

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

  button {
    display: inline-block;
  }

  div:not(:last-child) {
    margin-bottom: 25px;
  }

  .error {
    color: red;
  }
</style>

<div>
  <h4>Profile</h4>

  {#if profile}
    <p>Name: {profile.first_name} {profile.last_name}</p>
    <p>Primary e-mail: {profile.email}</p>
  {/if}
</div>

<div>
  <h4>E-mails</h4>

  <ul>
    {#each emails as { email, verified, id } (id)}
      <li>
        E-mail: {email}
        <br />
        <button disabled={!verified} on:click={() => makePrimary(id)}>
          Make primary
        </button>
        {#if !verified}(unverified){/if}

        <br />
        <button on:click={() => removeEmail(id)}>Delete</button>
      </li>
    {/each}
  </ul>
</div>

<div>
  <h4>Add e-mail</h4>

  <form on:submit|preventDefault={submitEmail} bind:this={form}>
    <input id="email" />
    <button type="submit">Submit</button>
    {#if error}
      <p class="error">{error}</p>
    {/if}
  </form>
</div>
