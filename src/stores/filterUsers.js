import { writable, derived } from "svelte/store";

export const institution = writable();
export const users = writable([]);
export const userSearch = writable();
export const selectedRole = writable([]);
export const facultyIds = writable([]);
export const issuerIds = writable([]);
export const userIds = writable([]);

function filterBySearch(users, search) {
  if (search && search.length > 0) {
    return users.filter(user => {
      const userName = user.firstName.toLowerCase() + " " + user.lastName.toLowerCase();
      return userName.indexOf(search.toLowerCase()) !== -1;
    })
  }
  return users;
}

function sort(collection, count = false) {
  return collection.sort((a, b) => {
    if (!count) return a.name.localeCompare(b.name);
    return b.count - a.count || a.name.localeCompare(b.name);
  });
}

export const userTree = derived(
  [userSearch, selectedRole, institution, users, facultyIds, issuerIds],
  ([userSearch, selectedRole, institution, users, facultyIds, issuerIds]) => {

    let tree = {
      issuers: [],
      faculties: [],
      roles: [
        {'role': 'Institution Admin', count: 0},
        {'role': 'Issuer Group Admin', count: 0},
        {'role': 'Issuer Admin', count: 0},
        {'role': 'Badgeclass Owner', count: 0},
        {'role': 'Badgeclass Editor', count: 0},
        {'role': 'Badgeclass Awarder', count: 0},
        {'role': 'Viewer', count: 0}
      ],
      users: []
    };

    if(!institution) {
      return tree;
    }

    for(const faculty of institution.faculties) {
      faculty.count = 0;
      for (const issuer of faculty.issuers) {
        issuer.count = 0;
      }
    }

    for (const {user} of institution.staff) {
      user.role = 'Institution Admin';
      tree.users = [user, ...tree.users];

      tree.roles.find(el => el.role === 'Institution Admin').count++;

      for(const faculty of institution.faculties) {
        faculty.count++;
        for (const issuer of faculty.issuers) {
          issuer.count++;
        }
      }
    }

    for (const faculty of institution.faculties) {
      if (facultyIds.length > 0 && facultyIds[0] !== faculty.entityId) {
        continue;
      }

      for (const {user} of faculty.staff) {
        if (!tree.users.some(_user => _user.entityId === user.entityId)) {
          user.role = 'Issuer Group Admin';
          tree.users = [user, ...tree.users];
          tree.roles.find(el => el.role === 'Issuer Group Admin').count++;
        }

        faculty.count++;
        for (const issuer of faculty.issuers) {
          issuer.count++;
        }
      }

      for (const issuer of faculty.issuers) {
        if (issuerIds.length > 0 && issuerIds[0] !== issuer.entityId) {
          continue;
        }

        for (const {user} of issuer.staff) {
          if (!tree.users.some(_user => _user.entityId === user.entityId)) {
            user.role = 'Issuer Admin';
            tree.users = [user, ...tree.users];
            tree.roles.find(el => el.role === 'Issuer Admin').count++;
          }

          issuer.count++;
        }

        for (const badgeClass of issuer.badgeclasses) {
          for (const {user, mayAdministrateUsers, mayUpdate, mayAward} of badgeClass.staff) {
            if (mayAdministrateUsers) {
              user.role = 'Badgeclass Owner';
              if (!tree.users.some(_user => _user.entityId === user.entityId)) {
                tree.users = [user, ...tree.users];
                tree.roles.find(el => el.role === 'Badgeclass Owner').count++;
              }
            } else if (mayUpdate) {
              user.role = 'Badgeclass Editor';
              if (!tree.users.some(_user => _user.entityId === user.entityId)) {
                tree.users = [user, ...tree.users];
                tree.roles.find(el => el.role === 'Badgeclass Editor').count++;
              }
            } else if (mayAward) {
              user.role = 'Badgeclass Awarder';
              if (!tree.users.some(_user => _user.entityId === user.entityId)) {
                tree.users = [user, ...tree.users];
                tree.roles.find(el => el.role === 'Badgeclass Awarder').count++;
              }
            }
          }
        }
      }
    }

    if (!issuerIds.length > 0 && !facultyIds.length > 0) {
      for(const user of users) {
        if (!user.institutionStaff.mayAdministrateUsers && user.facultyStaffs.length === 0 && user.issuerStaffs.length === 0 && user.badgeclassStaffs.length === 0) {
          user.role = 'Viewer';
          if (!tree.users.some(_user => _user.entityId === user.entityId)) {
            tree.users = [user, ...tree.users];
            tree.roles.find(el => el.role === 'Viewer').count++;
          }
        }
      }
    }

    if (selectedRole.length > 0) {
      tree.users = tree.users.filter(user => user.role === selectedRole[0]);
    }

    let issuers = [];
    for (const faculty of institution.faculties) {
      for (const issuer of faculty.issuers) {
        issuers = [issuer, ...issuers];
      }
    }

    tree.users = filterBySearch(tree.users, userSearch);

    return {
      faculties: sort(institution.faculties, true),
      issuers: sort(issuers, true),
      roles: tree.roles,
      users: tree.users
    };
  },
  { faculties: [], issuers: [], roles: [], users: [] }
);
