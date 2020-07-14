<script>
  import I18n from "i18n-js";
  import {EntityHeaderTabs, HeaderList} from "../teachers";
  import {flash} from "../../stores/flash";
  import {issuerIcon, facultyIcon, userManagementIcon, institutionIcon} from "../../icons";
  export let user = {};
  export let entityId;

  const tabs = [
    {
      entity: "institution",
      href: `/users/${entityId}/institution`,
      icon: institutionIcon
    },
    {
      entity: "faculties",
      href: `/users/${entityId}/issuerGroups`,
      icon: facultyIcon
    },
    {
      entity: "issuers",
      href: `/users/${entityId}/issuers`,
      icon: issuerIcon
    },
    {
      entity: "badgeclasses",
      href: `/users/${entityId}/badgeclasses`,
      icon: userManagementIcon
    },
  ];

  let headerItems = [
    {
      'attr': 'memberSince',
      'type': 'date',
      'value': user.dateJoined
    },
    {
      'attr': 'email',
      'type': 'email',
      'value': user.email
    },
  ];

  let imageId = "";
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

      .list {
        margin: var(--ver-padding-m) 0;
      }
    }
  }
</style>

<div class="entity">
  <div class="content">
    <div class="info">
      <h2>{I18n.t("userManagement.permissions",{name:`${user.firstName} ${user.lastName}`})}</h2>
      <div class="list">
        <HeaderList entity="editUsers" {headerItems}/>
      </div>
    </div>
  </div>

  <EntityHeaderTabs {tabs}/>
</div>
