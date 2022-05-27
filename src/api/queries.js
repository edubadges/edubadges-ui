export const headerEntity = `
	entityId,
	name,
	description,
	createdAt
`;

export const headerEntityMultiLanguage = `
	entityId,
	nameDutch,
	nameEnglish,
	descriptionEnglish,
	descriptionDutch,
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

export const studentBadgeInstances = `query {
    badgeInstances {
      entityId,
      image,
      issuedOn,
      createdAt,
      public,
      revoked,
      expiresAt,
      acceptance,
      badgeclass {
        name,
        entityId,
        image,
        extensions {
          name,
          originalJson
        },
        issuer {
          nameDutch,
          nameEnglish,
          imageDutch,
          imageEnglish,
          faculty {
            nameDutch,
            nameEnglish,
            onBehalfOf,
            onBehalfOfDisplayName,
            onBehalfOfUrl,
            institution {
              nameDutch,
              nameEnglish,
            }
          }
        }
      }
    },
    directAwards {
      entityId,
      createdAt,
      badgeclass {
        name,
        entityId,
        image,
        extensions {
          name,
          originalJson
        },
        issuer {
          nameDutch,
          nameEnglish,
          imageDutch,
          imageEnglish,
          faculty {
            nameDutch,
            nameEnglish,
            institution {
              nameDutch,
              nameEnglish,
            }
          }
        }
      }
    }
  }`;

export const revokedStudentBadgeInstances = `query {
    revokedBadgeInstances {
      entityId,
      image,
      issuedOn,
      createdAt,
      public,
      revoked,
      expiresAt,
      acceptance,
      badgeclass {
        name,
        entityId,
        image,
        extensions {
          name,
          originalJson
        },
        issuer {
          nameDutch,
          nameEnglish,
          imageDutch,
          imageEnglish,
          faculty {
            nameDutch,
            nameEnglish,
            institution {
              nameDutch,
              nameEnglish,
            }
          }
        }
      }
    }
  }`;

export const enrollmentsQuery = `
   pendingEnrollmentsIncludingDenied {
        dateCreated,
        dateAwarded,
        denied,
        denyReason,
        evidenceUrl,
        narrative,
        entityId,
        user {
          entityId,
          firstName,
          lastName,
          email
        }
      }
  `;

export const assertionsQuery = `
      badgeAssertions {
        entityId,
        createdAt,
        updatedAt,
        revoked,
        acceptance,
        expiresAt,
        awardType,
        issuedOn,
        user {
          entityId,
          firstName,
          lastName,
          email
        }
      }
  `;

export const directAwardBundleQuery = `
      directAwardBundles {
        createdAt,
        entityId,
        assertionCount,
        directAwardCount,
        directAwardRejectedCount,
        directAwardRevokedCount
        initialTotal,
        directAwards {
            entityId,
            eppn,
            status,
            recipientEmail,
            createdAt,
            updatedAt
          }
      }
   `;

export const alignments = `
      alignments {
        targetName,
        targetUrl,
        targetCode,
        targetFramework,
        targetDescription
      }
`;

export const endorsements = `
  endorsements {
    claim,
    description,
    status,
    endorser {
        name,
        image,
        issuer {
            nameDutch,
            nameEnglish,
            entityId,
            faculty {
              nameDutch,
              nameEnglish,
              entityId,
              institution {
                nameDutch,
                nameEnglish,
                imageDutch,
                imageEnglish,
                entityId
            }
          }
        }
    }
  }

`;