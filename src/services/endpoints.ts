export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
  },
  PLANS: {
    BASE: "/plans",
    BY_ID: (id: string) => `/plans/${id}`,
  },
  USERS: {
    BASE: "/users",
    BY_ID: (id: string) => `/users/${id}`,
  },
  GROUPS: {
    BASE: "/groups",
    BY_ID: (id: string) => `/groups/${id}`,
  },
}; 