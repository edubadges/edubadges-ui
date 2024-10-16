<script>
    import {queryData} from "../../api/graphql";
    import {onMount} from "svelte";
    import I18n from "i18n-js";
    import {UserManagement} from "../teachers";
    import {staffType, addStaffType} from "../../util/staffTypes";
    import {translateProperties} from "../../util/utils";
    import Spinner from "../Spinner.svelte";

    export let entity;
    export let entityId;
    export let loaded;

    let institutionStaffMembers = [];
    let issuerGroupStaffMembers = [];
    let issuerStaffMembers = [];
    let userProvisionments = [];
    let selection = [];
    let permissions;

    const query = `query ($entityId: String){
    issuer(id: $entityId) {
      nameDutch,
      nameEnglish,
      userprovisionments {
        email,
        createdAt,
        entityId,
        data
      },
      staff {
        entityId,
        mayAdministrateUsers,
        mayUpdate,
        mayAward,
        user {
          firstName,
          lastName,
          entityId,
          email
        }
      },
      faculty {
        nameDutch,
        nameEnglish,
        imageDutch,
        imageEnglish,
        onBehalfOf,
        onBehalfOfDisplayName,
        onBehalfOfUrl,
        staff {
          entityId,
          mayAdministrateUsers,
          mayUpdate,
          mayAward,
          user {
            firstName,
            lastName,
            entityId,
            email
          }
        },
        institution {
          nameDutch,
          nameEnglish,
          staff {
            entityId,
            mayAdministrateUsers,
            user {
              firstName,
              lastName,
              entityId,
              email
            }
          }
        }
      },
      permissions {
        mayAdministrateUsers
      }
		}
  }`;

    const reload = () => {
        loaded = false;
        queryData(query, {entityId}).then(res => {
            translateProperties(res.issuer);
            translateProperties(res.issuer.faculty);
            translateProperties(res.issuer.faculty.institution);

            institutionStaffMembers = addStaffType(res.issuer.faculty.institution.staff, staffType.INSTITUTION_STAFF);
            issuerGroupStaffMembers = addStaffType(res.issuer.faculty.staff, staffType.ISSUER_GROUP_STAFF);
            issuerStaffMembers = addStaffType(res.issuer.staff, staffType.ISSUER_STAFF);
            userProvisionments = addStaffType(res.issuer.userprovisionments, staffType.USER_PROVISIONMENT);
            permissions = res.issuer.permissions;
            loaded = true;
        })
    };

    onMount(reload);

</script>
{#if loaded}
    <UserManagement
            {entity}
            {entityId}
            {permissions}
            institutionStaffs={institutionStaffMembers}
            issuerGroupStaffs={issuerGroupStaffMembers}
            issuerStaffs={issuerStaffMembers}
            {userProvisionments}
            {reload}
    />
{:else}
    <Spinner/>
{/if}