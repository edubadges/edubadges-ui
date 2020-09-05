<script>
  import {queryData} from "../../api/graphql";
  import {onMount} from "svelte";
  import I18n from "i18n-js";
  import {UserManagement} from "../teachers";
  import {staffType, addStaffType} from "../../util/staffTypes";

  export let entity;
  export let entityId;

  let institutionStaffMembers = [];
  let issuerGroupStaffMembers = [];
  let issuerStaffMembers = [];
  let userProvisionments = [];
  let selection = [];
  let permissions;

  const query = `query ($entityId: String){
    issuer(id: $entityId) {
      name,
      userprovisionments {
        email,
        createdAt,
        entityId
      },
      staff {
        entityId,
        mayAdministrateUsers,
        user {
          firstName,
          lastName,
          entityId,
          email
        }
      },
      faculty {
        name,
        staff {
          entityId,
          mayAdministrateUsers,
          user {
            firstName,
            lastName,
            entityId,
            email
          }
        },
        institution {
          name,
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
    queryData(query, {entityId}).then(res => {
      institutionStaffMembers = addStaffType(res.issuer.faculty.institution.staff, staffType.INSTITUTION_STAFF);
      issuerGroupStaffMembers = addStaffType(res.issuer.faculty.staff, staffType.ISSUER_GROUP_STAFF);
      issuerStaffMembers = addStaffType(res.issuer.staff, staffType.ISSUER_STAFF);
      userProvisionments = addStaffType(res.issuer.userprovisionments, staffType.USER_PROVISIONMENT);
      permissions = res.issuer.permissions;
    })
  };


  onMount(reload);
</script>

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
