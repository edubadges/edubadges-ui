import { config } from "./config"
import { role } from "./role"

export const getService = (chosenRole) => {
    switch (chosenRole) {
        case role.STUDENT:
            return config.studentDomain
        case role.TEACHER:
            return config.teacherDomain
    }
}