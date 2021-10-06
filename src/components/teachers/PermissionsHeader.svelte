<script>
    import I18n from "i18n-js";
    import {EntityHeaderTabs, HeaderList} from "../teachers";
    import {userManagementIcon} from "../../icons";
    import Button from "../Button.svelte";
    import Modal from "../forms/Modal.svelte";
    import {navigate} from "svelte-routing";
    import {flash} from "../../stores/flash";
    import {deleteUser} from "../../api";

    export let user;
    export let currentUser;
    export let tabs;
    export let headerItems;
    export let title;

    let showDeleteModal = false;

    const doDeleteUser = showConfirmation => () => {
        if (showConfirmation) {
            showDeleteModal = true;
        } else {
            deleteUser(user.entityId).then(() => {
                navigate("/users");
                flash.setValue(I18n.t('editUsers.deleteFlash', {name: `${user.firstName} ${user.lastName}`}));
            });
        }
    }
</script>

<style lang="scss">
  .entity {
    padding: var(--ver-padding-m) var(--hor-padding-m) 0;
    background: var(--purple-1);

    .content {
      display: flex;
      margin-bottom: var(--ver-padding-m);

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .title {
        display: flex;
        flex-direction: row;
      }

      .list {
        display: flex;
        margin: var(--ver-padding-m) 0;
        margin-left: 80px;
      }
    }
  }

  .svg-container {
    width: 30px;
    margin: 0 25px;
    color: var(--purple-8);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .actions {
    margin-left: auto;
  }

</style>

<div class="entity">
  <div class="content">
    <div class="info">
      <div class="title">
        <div class="svg-container">
          {@html userManagementIcon}
        </div>
        {#if user}
          <h2>{I18n.t(['editUsers', 'permissions', 'headerUser'])} {user.firstName} {user.lastName}</h2>
        {:else if !title}
          <h2>{I18n.t(['editUsers', 'permissions', 'header'])}</h2>
        {:else}
          <h2>{title}</h2>
        {/if}
      </div>
      {#if user}
        <div class="list">
          <HeaderList entity="editUsers" {headerItems}/>
          {#if user && !user.hasIssuedDirectAwardBundle && currentUser && currentUser.institutionStaff && currentUser.institutionStaff.mayAdministrateUsers}
            <div class="actions">
              <Button text={I18n.t("editUsers.delete")} action={doDeleteUser(true)} secondary={true}/>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>

  <EntityHeaderTabs {tabs}/>
</div>
{#if showDeleteModal}
  <Modal
    submit={doDeleteUser(false)}
    warning={true}
    cancel={() => showDeleteModal = false}
    question={I18n.t("editUsers.deleteConfirmation", {name: `${user.firstName} ${user.lastName}`})}
    title={I18n.t("editUsers.delete")}/>
{/if}
