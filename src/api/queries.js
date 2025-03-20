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
			fullName,
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
            imageDutch,
            imageEnglish,
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
          fullName,
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
          fullName,
          email,
          eppns
        }
      }
  `;

export const directAwardBundleQuery = `
      directAwardBundles {
        createdAt,
        entityId,
        identifierType,
        assertionCount,
        directAwardCount,
        directAwardRejectedCount,
        directAwardScheduledCount,
        directAwardRevokedCount
        initialTotal,
        directAwards {
            entityId,
            eppn,
            status,
            recipientEmail,
            resendAt,
            createdAt,
            updatedAt,
            deleteAt
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
    entityId,
    claim,
    description,
    status,
    revocationReason,
    rejectionReason,
    createdAt,
    createdBy {
      firstName, lastName, email
    },
    endorser {
      name,
      description,
      image,
      entityId,
      issuer {
        imageDutch,
        imageEnglish,
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

export const endorsed = `
  endorsed {
    entityId,
    claim,
    description,
    status,
    revocationReason,
    rejectionReason,
    createdAt,
    createdBy {
      firstName, lastName, email
    },
    endorsee {
      name,
      description,
      image,
      entityId,
      issuer {
        nameDutch,
        nameEnglish,
        entityId,
        faculty {
          nameDutch,
          nameEnglish,
          entityId,
          imageDutch,
          imageEnglish,
          onBehalfOf,
          onBehalfOfDisplayName,
          onBehalfOfUrl,
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