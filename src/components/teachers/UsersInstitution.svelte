<script>
  import {entityType} from "../../util/entityTypes";
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {Button, CheckBox} from "../../components";
  import {UsersTable} from "../teachers";
  import {sortType} from "../../util/sortData";
  import I18n from "i18n-js";
  import {makeUserInstitutionAdmin, removeUserInstitutionAdmin} from "../../api";
  import Spinner from "../Spinner.svelte";
  import {flash} from "../../stores/flash";
  import {Modal} from "../forms";
  import ListLink from "./ListLink.svelte";
  import {institutionIcon} from "../../icons"

  export let userId;

  let user;
  let userNameDict;
  let currentUser;
  let institution;
  let institutionStaff = [];
  let institutionSearch;

  let loaded = false;

  let showModal = false;
  let modalTitle;
  let modalQuestion;
  let modalAction;

  const query = `query ($userId: String){
    currentInstitution {
      name,
      entityId,
      image,
      staff {
        entityId
      }
    },
    currentUser {
      institutionStaff {
        mayAdministrateUsers
      }
    },
    user(id: $userId) {
      firstName,
      lastName,
      institutionStaff {
        entityId,
        mayAdministrateUsers
      }
    }
 }`;


  const refresh = () => {
    loaded = false;
    queryData(query, {userId}).then(res => {
      institution = res.currentInstitution;
      institutionStaff = institution.staff;
      user = res.user;
      currentUser = res.currentUser;
      userNameDict = {name: `${user.firstName} ${user.lastName}`};
      loaded = true;
    });
  };

  onMount(refresh);


  const doMakeUserInstitutionAdmin = showConfirmation => () => {
    if (showConfirmation) {
      modalTitle = I18n.t("editUsers.institution.makeUserInstitutionAdmin", userNameDict);
      modalQuestion = I18n.t("editUsers.institution.makeUserInstitutionAdminQuestion", userNameDict);
      modalAction = doMakeUserInstitutionAdmin(false);
      showModal = true;
    } else {
      showModal = false;
      makeUserInstitutionAdmin(institution.entityId, userId)
        .then(() => {
          refresh();
          flash.setValue(I18n.t("editUsers.flash.makeUserInstitutionAdmin", userNameDict));
        });
    }
  };

  const doRemoveUserInstitutionAdmin = showConfirmation => () => {
    if (showConfirmation) {
      modalTitle = I18n.t("editUsers.institution.removeUserInstitutionAdmin", userNameDict);
      modalQuestion = I18n.t("editUsers.institution.removeUserInstitutionAdminQuestion", userNameDict);
      modalAction = doRemoveUserInstitutionAdmin(false);
      showModal = true;
    } else {
      showModal = false;
      removeUserInstitutionAdmin(user.institutionStaff.entityId)
        .then(() => {
          refresh();
          flash.setValue(I18n.t("editUsers.flash.removeUserInstitutionAdmin", userNameDict));
        });
    }
  };

  const tableHeaders = [
    {
      name: "5%",
      width: ""
    },
    {
      name: I18n.t("editUsers.institution.header"),
      attribute: "name",
      reverse: false,
      sortType: sortType.ALPHA,
      width: "25%"
    },
    {
      name: I18n.t("editUsers.role"),
      attribute: "roles",
      reverse: false,
      sortType: sortType.COLLECTION,
      width: "20%"
    },
    {
      name: "",
      width: "50%"
    }
  ];

  $: table = {
    entity: "user",
    title: `${I18n.t("editUsers.institutionPermissions", {instance: I18n.t("editUsers.institution.header")})}`,
    tableHeaders: tableHeaders
  };

  const isInstitutionAdmin = () => user.institutionStaff && user.institutionStaff.entityId;

  const toggleInstitutionAdmin = () => {
    if (isInstitutionAdmin()) {
      doRemoveUserInstitutionAdmin(true)();
    } else {
      doMakeUserInstitutionAdmin(true)();
    }
  };

  $: buttons = [
    {
      'action': toggleInstitutionAdmin,
      'text': I18n.t(['editUsers', 'permissions', 'setInstitutionAdmin']),
      'allowed': (currentUser && currentUser.institutionStaff && currentUser.institutionStaff.mayAdministrateUsers && user && !isInstitutionAdmin()),
    },
    {
      'action': toggleInstitutionAdmin,
      'text': I18n.t(['editUsers', 'permissions', 'removeInstitutionAdmin']),
      'allowed': (currentUser && currentUser.institutionStaff && currentUser.institutionStaff.mayAdministrateUsers && user && isInstitutionAdmin()),
      'disabled': institutionStaff.length === 1
    }
  ];

</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }

  .icon {
    display: block;
    height: 30px;
  }

  .img-container {
    flex-shrink: 0;
    height: 55px;
    width: 55px;
    background: white;
    display: flex;
    justify-content: space-around;
  }

  .img-icon {
    height: 50px;
    width: 50px;
    background-color: white;
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
</style>

{#if loaded}
  <div class="container">
    <UsersTable
        {...table}
        isEmpty={false}
        bind:search={institutionSearch}
        withCheckAll={false}
        bind:buttons={buttons}
    >
      <tr>
        <td>
          {#if institution.image}
            <div class="img-container">
              <div class="img-icon">
                <img src={institution.image} alt=""/>
              </div>
            </div>
          {:else}
            <div class="img-container">
              <div class="img-icon">
                <span class="icon">{@html institutionIcon}</span>
              </div>
            </div>
          {/if}
        </td>
        <td>
          <ListLink path="/manage/institution/issuers" name={institution.name}/>
        </td>
        <td>
          {I18n.t(['editUsers', 'institution', user.institutionStaff ? 'allRights' : 'noRights'])}
        </td>
      </tr>
    </UsersTable>
  </div>
{:else}
  <Spinner/>
{/if}

{#if showModal}
  <Modal
      submit={modalAction}
      warning={isInstitutionAdmin()}
      cancel={() => showModal = false}
      question={modalQuestion}
      title={modalTitle}/>
{/if}