const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  // User endpoints
  REGISTER: `${BASE_URL}/users/register`,
  LOGIN: `${BASE_URL}/users/login`,

  // Main endpoints
  CHAT: `${BASE_URL}/main/chat`,
  HISTORIES: `${BASE_URL}/main/histories`,
};

export default BASE_URL;
