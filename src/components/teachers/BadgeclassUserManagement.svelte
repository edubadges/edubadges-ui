<script>
  import {queryData} from "../../api/graphql";
  import {onMount} from "svelte";
  import I18n from "i18n-js";
  import {UserManagement} from "../teachers";
  import {staffType, addStaffType} from "../../util/staffTypes";
  import {translateProperties} from "../../util/utils";

  export let entity;
  export let entityId;

  let institutionStaffMembers = [];
  let issuerGroupStaffMembers = [];
  let issuerStaffMembers = [];
  let badgeClassStaffMembers = [];
  let userProvisionments = [];
  let selection = [];
  let permissions;

  const query = `query ($entityId: String){
    badgeClass(id: $entityId) {
      name,
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
          fullName,
          entityId,
          email
        }
      },
      issuer {
        nameEnglish,
        nameDutch,
        staff {
          entityId,
          mayAdministrateUsers,
          mayUpdate,
          mayAward,
          user {
            firstName,
            lastName,
            fullName,
            entityId,
            email
          }
        },
        faculty {
          nameEnglish,
          nameDutch,
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
              fullName,
              entityId,
              email
            }
          },
          institution {
            nameEnglish,
            nameDutch,
            staff {
              entityId,
              mayAdministrateUsers,
              user {
                firstName,
                lastName,
                fullName,
                entityId,
                email
              }
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
      translateProperties(res.badgeClass.issuer);
      translateProperties(res.badgeClass.issuer.faculty);
      translateProperties(res.badgeClass.issuer.faculty.institution);

      institutionStaffMembers = addStaffType(res.badgeClass.issuer.faculty.institution.staff, staffType.INSTITUTION_STAFF);
      issuerGroupStaffMembers = addStaffType(res.badgeClass.issuer.faculty.staff, staffType.ISSUER_GROUP_STAFF);
      issuerStaffMembers = addStaffType(res.badgeClass.issuer.staff, staffType.ISSUER_STAFF);
      badgeClassStaffMembers = addStaffType(res.badgeClass.staff, staffType.BADGE_CLASS_STAFF);
      userProvisionments = addStaffType(res.badgeClass.userprovisionments, staffType.USER_PROVISIONMENT);
      permissions = res.badgeClass.permissions;
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
    badgeClassStaffs={badgeClassStaffMembers}
    {userProvisionments}
    {reload}
/>
