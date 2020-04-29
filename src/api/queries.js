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
