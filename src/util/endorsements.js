import {acceptEndorsement, deleteEndorsement, rejectEndorsement, resendEndorsement, revokeEndorsement} from "../api";

export const endorsementStatus = {
    UNACCEPTED: "unaccepted",
    ACCEPTED: "accepted",
    REVOKED: "revoked",
    REJECTED: "rejected"
};

export const endorsementActions = {
    ACCEPT: {
        fn: acceptEndorsement,
        name: "accept",
        includeReason: false
    },
    REJECT: {
        fn: rejectEndorsement,
        name: "reject",
        includeReason: true
    },
    REVOKE: {
        fn: revokeEndorsement,
        name: "revoke",
        includeReason: true
    },
    DELETE: {
        fn: deleteEndorsement,
        name: "delete",
        includeReason: false
    },
    RESEND: {
        fn: resendEndorsement,
        name: "resend",
        includeReason: false
    }


}
