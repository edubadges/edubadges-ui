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
