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
            return [actions.DELETE];
        case status.DELETED:
            return [actions.UNDELETE, actions.ARCHIVE];
        case status.ARCHIVED:
            return [actions.UNARCHIVE, actions.DELETE];
        case status.ACTIVE:
            return [actions.ARCHIVE, actions.DELETE];
    }
}

