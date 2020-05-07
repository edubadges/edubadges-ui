import { writable, derived } from "svelte/store";

export const users = writable([]);

export const userSearch = writable();
export const selectedRole = writable();
export const facultyIds = writable([]);
export const issuerIds = writable([]);
export const userIds = writable([]);
export const roles = writable([]);

function filterBySearch(users, search) {
  if (!search) {
    return users;
  }

  return users.filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase())
  );
}

function sort(collection, count = false) {
  return collection.sort((a, b) => {
    if (!count) return a.name.localeCompare(b.name);
    return b.count - a.count || a.name.localeCompare(b.name);
  });
}

export const userTree = derived(
  [users, userSearch, facultyIds, issuerIds],
  ([users, userSearch, facultyIds, issuerIds]) => {
    const tree = users.reduce(
      (acc, cur) => {
        if (facultyIds.length > 0) {
          if (!cur.facultyStaffs.some(el => facultyIds.includes(el.faculty.entityId))) {
            return acc;
          }
        }
        if (issuerIds.length > 0) {
          if (!cur.issuerStaffs.some(el => issuerIds.includes(el.issuer.entityId))) {
            return acc;
          }
        }

        let highestRole;

        if (cur.institutionStaff.mayAdministrateUsers) {
          highestRole = 'Institution Admin';
        }

        for (const facultyMembership of cur.facultyStaffs) {
          const faculty = facultyMembership.faculty;

          if (!facultyIds.length || (facultyIds.length && facultyIds.includes(faculty.entityId))) {
            if (!highestRole) {
              const facultyAdmin = cur.facultyStaffs.reduce((acc, facultyMembership) => facultyMembership.mayAdministrateUsers || acc, false);
              if (facultyAdmin) {
                highestRole = 'Issuer Group Admin';
              }
            }

            if (!acc.faculties.some(_faculty  => _faculty.entityId === faculty.entityId)) {
              faculty.count = 1;
              acc.faculties.push(faculty);
            } else {
              const _faculty = acc.faculties.find(el => el.entityId === faculty.entityId);
              _faculty.count++;
            }
          }
        }

        for (const issuerMembership of cur.issuerStaffs) {
          if (!highestRole) {
            const issuerAdmin = cur.facultyStaffs.reduce((acc, facultyMembership) => facultyMembership.mayAdministrateUsers || acc, false);
            if (issuerAdmin) {
              highestRole = 'Issuer Group Admin';
            }
          }

          const issuer = issuerMembership.issuer;

          if (!issuerIds.length || (issuerIds.length && issuerIds.includes(issuer.entityId))) {
            if (!acc.issuers.some(_issuer => _issuer.entityId === issuer.entityId)) {
              issuer.count = 1;
              acc.issuers.push(issuer);
            } else {
              const _issuer = acc.issuers.find(el => el.entityId === issuer.entityId);
              _issuer.count++;
            }
          }
        }

        if (!highestRole) {
          const badgeClassOwner = cur.badgeclassStaffs.reduce((acc, badgeClassMembership) => badgeClassMembership.mayAdministrateUsers || acc, false);
          if (badgeClassOwner) {
            highestRole = 'Badgeclass Owner'
          }
        }
        if (!highestRole) {
          const badgeClassAwarder = cur.badgeclassStaffs.reduce((acc, badgeClassMembership) => badgeClassMembership.mayAward || acc, false);
          if (badgeClassAwarder) {
            highestRole = 'Badgeclass Awarder'
          }
        }

        if (highestRole) {
          acc.roles.find(el => el.role === highestRole).count++;
          acc.users = [...acc.users, cur];
        }

        return acc;
      },
      {
        issuers: [],
        faculties: [],
        roles: [
          {'role': 'Institution Admin', count: 0},
          {'role': 'Issuer Group Admin', count: 0},
          {'role': 'Issuer Admin', count: 0},
          {'role': 'Badgeclass Owner', count: 0},
          {'role': 'Badgeclass Awarder', count: 0}
        ],
        users: []
      }
    );

    return {
      faculties: sort(tree.faculties, true),
      issuers: sort(tree.issuers, true),
      roles: tree.roles,
      users: tree.users
    };
  },
  { faculties: [], issuers: [], roles: [], users: [] }
);
