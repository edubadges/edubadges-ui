export const status = {
    ACTIVE: "active",
    ARCHIVED: "archived",
    DELETED: "deleted",
    NEW: "new"
}

export const actions = {
    ARCHIVE: "archive",
    DELETE: "delete",
    UNARCHIVE: "unarchive",
    UNDELETE: "undelete",
}

export const convertActionToStatus = action => {
    switch (action) {
        case actions.ARCHIVE:
            return status.ARCHIVED;
        case actions.DELETE:
            return status.DELETED;
        case actions.UNARCHIVE:
        case actions.UNDELETE:
            return status.ACTIVE;
    }
}

export const tagActions = tag => {
    switch (tag.status) {
        case status.NEW:
            return [status.DELETED];
        case status.DELETED:
            return [status.ACTIVE, status.ARCHIVED];
        case status.ARCHIVED:
            return [status.ACTIVE, status.DELETED];
        case status.ACTIVE:
            return [status.ARCHIVED, status.DELETED];
    }
}

