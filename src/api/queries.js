export const headerEntity = `
	entityId,
	name,
	description,
	createdAt
`;

export const headerStaff = `
	staff {
    	user { 
			firstName, 
			lastName,
			email,
			entityId
		}
  	}
`;

export const studentBadgeInstances = `{
    badgeInstances {
      entityId,
      image,
      issuedOn,
      createdAt,
      public,
      revoked,
      acceptance,
      badgeclass {
        name,
        entityId,
        image,
        issuer {
          name,
          image,
          faculty {
            name
          }
        }
      }
    }
  }`;

export function enrollmentsQuery(entityId) {
  return `
    badgeClass(id: "${entityId}") {
      pendingEnrollments {
        dateCreated,
        dateAwarded,
        denied,
        entityId,
        user {
          entityId,
          firstName,
          lastName,
          email
        }
      }
    }
  `;
}
export function assertionsQuery(entityId) {
  return `
    badgeClass(id: "${entityId}") {
      badgeAssertions {
        entityId,
        createdAt,
        revoked,
        acceptance,
        issuedOn,
        user {
          entityId,
          firstName,
          lastName,
          email
        }
      }
    }
  `;
}
