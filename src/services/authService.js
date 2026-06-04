import { apiRequest, setStoredToken } from "../util/api.js";

export const syncBackendSession = async (firebaseToken) => {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: { token: firebaseToken },
  });

  if (data.token) {
    setStoredToken(data.token);
  }

  return data;
};

export const fetchProfile = () => apiRequest("/users/me");

export const updateUserProfile = (profile) =>
  apiRequest("/users/me", {
    method: "PUT",
    body: profile,
  });

export const logoutFromBackend = () =>
  apiRequest("/auth/logout", { method: "POST" });
