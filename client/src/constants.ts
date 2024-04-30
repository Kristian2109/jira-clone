export const BASE_API_URL = "http://localhost:8000";
export const LOGIN_URL = BASE_API_URL + "/auth/login";
export const REGISTER_URL = BASE_API_URL + "/auth/register";
export const GOOGLE_AUTH_URL = BASE_API_URL + "/auth/external";
export const ACCOUNT_URL = BASE_API_URL + "/accounts/me";
export const GOOGLE_AUTH_CALLBACK_URL = BASE_API_URL + "/auth/google/callback";
export const USER_PROJECTS_URL = BASE_API_URL + "/projects/me";

export const JWT_TOKEN_KEY = "jsonWebToken";

export const RESPONSE_TO_DISPLAY_ATTRIBUTES = new Map([
  [
    "name",
    {
      readonly: false,
      fieldDisplayName: "Full Name",
      type: "text",
      order: 1,
    },
  ],
  [
    "email",
    {
      readonly: true,
      fieldDisplayName: "Email Address",
      type: "text",
      order: 2,
    },
  ],
  [
    "displayName",
    {
      readonly: false,
      fieldDisplayName: "Display Name",
      type: "text",
      order: 3,
    },
  ],
  [
    "dateOfBirth",
    {
      readonly: true,
      fieldDisplayName: "Date of Birth",
      type: "date",
      order: 8,
    },
  ],
  [
    "position",
    {
      readonly: false,
      fieldDisplayName: "Position",
      type: "text",
      order: 7,
    },
  ],
  [
    "organization",
    {
      readonly: false,
      fieldDisplayName: "Organization",
      type: "text",
      order: 6,
    },
  ],
  [
    "createdAt",
    {
      readonly: true,
      fieldDisplayName: "Registered On",
      type: "date",
      order: 5,
    },
  ],
  [
    "role",
    {
      readonly: true,
      fieldDisplayName: "Profile Role",
      type: "text",
      order: 4,
    },
  ],
]);
