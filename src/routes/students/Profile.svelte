<script>
  import {requestProfile, getEmails, addEmail, setPrimaryEmail, deleteEmail} from '../../api'

  const profilePromise = requestProfile();

  const emailsPromise = getEmails();

  const addEmailButton = () => {
    const newEmail = document.getElementById('addEmailField').value;
    addEmail(newEmail);
  };

  const setPrimaryEmailButton = (emailId) => {
      setPrimaryEmail(emailId).then(res => {
        console.log(res);
        getEmails();
      });
  };

  const removeEmail = (emailId) => {
      deleteEmail(emailId).then(res => {
        console.log(res);
      });
  }
</script>

<style>
    .email{
        border: black solid 1px;
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
          <button on:click={() => setPrimaryEmailButton(email['id'])}>set as primary email</button>
        {/if}
        <br>
        <button on:click={() => removeEmail(email['id'])}>delete email</button>
      </div>
    {/each}
  {:catch error}
    {error}
  {/await}
</div>

