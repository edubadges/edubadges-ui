import { Badges, Issuers } from "../routes/teachers";

export const teacherMainRoutes = [
  {
    path: '/',
    bookmark: 'badges',
    component: Badges
  },
  {
    path: "/issuers",
    bookmark: 'issuers',
    component: Issuers
  }
]
