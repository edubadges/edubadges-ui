<script>
  import {getProfile, getEmails, addEmail, setPrimaryEmail, deleteEmail} from '../../api'

  const profilePromise = getProfile();

  let emailsPromise = getEmails();

  const addEmailButton = () => {
    const newEmail = document.getElementById('addEmailField').value;
    addEmail(newEmail).then(res => {
      console.log(res);
      emailsPromise = getEmails();
    });
  };

  const setPrimaryEmailButton = (emailId) => {
    setPrimaryEmail(emailId).then(res => {
      console.log(res);
        emailsPromise = getEmails();
    });
  };

  const removeEmail = (emailId) => {
    deleteEmail(emailId).then(res => {
      console.log(res);
      emailsPromise = getEmails();
    });
  }
</script>

<style>
    .email{
        border: black solid 1px;
        margin-bottom: 10px;
    }
</style>

<div>Profile</div>

<div>
  {#await profilePromise}
    <p>...loading profile</p>
  {:then profile}
    {profile['first_name']}<br>
    {profile['last_name']}<br>
    {profile['email']}<br>

    <label>
      <input id="addEmailField"/>
    </label>
    <button on:click={addEmailButton}>add email</button>
  {:catch error}
    <p>error loading profile</p>
  {/await}
</div>
<br>
<div>
  {#await emailsPromise}
    <p>...loading emails</p>
  {:then emails}
    {#each emails as email}
      <div class="email">
        {email['email']}
        {#if email['primary']}
          <p> primary email</p>
        {:else}
          {#if email['verified']}
          <button on:click={() => setPrimaryEmailButton(email['id'])}>set as primary email</button>
          {:else}
            <p>cant make primary, unverified email, set to verified in database</p>
          {/if}
        {/if}
        <br>
        <button on:click={() => removeEmail(email['id'])}>delete email</button>
      </div>
    {/each}
  {:catch error}
    {error}
  {/await}
</div>
