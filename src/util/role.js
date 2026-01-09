export const role = {
    GUEST: "guest",
    STUDENT: "student",
    TEACHER: "teacher",
};

export const roleFromString = (roleString) => {
    if (roleString === "guest") {
        return role.GUEST;
    } else if (roleString === "student") {
        return role.STUDENT;
    } else if (roleString === "teacher") {
        return role.TEACHER;
    } else {
        throw new Error(`Invalid role string: ${roleString}`);
    }
};
