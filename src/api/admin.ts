// src/api/admin.ts

const BASE_URL = "http://localhost:4000/api/admin";

// Helper robusto para todas las peticiones
const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || `Error ${response.status}`);
  }

  return data;
};

// === Estadísticas existentes ===
export const getTodayStatsApi = async () => apiFetch("/stats/today");
export const getLast7DaysStatsApi = async () => apiFetch("/stats/last-7-days");
export const getUsersWithTodayActivityApi = async () => apiFetch("/users/today-activity");
export const getUserLast7DaysActivityApi = async (userId: string) => apiFetch(`/users/${userId}/last-7-days`);
export const getGeneralMetricsApi = async () => apiFetch("/metrics/general");

// === NUEVAS APIs PARA RESTRICCIONES Y LOGOUT ===
export const updateUserRestrictionsApi = async (
  userId: string,
  restrictions: { loginsPerDay: boolean; passwordRecoveriesPerDay: boolean }
) => {
  return await apiFetch(`/users/${userId}/restrictions`, {
    method: "PUT",
    body: JSON.stringify(restrictions),
  });
};

export const logoutUserApi = async (userId: string) => {
  return await apiFetch(`/users/${userId}/logout`, {
    method: "POST",
  });
};

// === APIs para AdminActions (Control del Sistema) ===
export const getSystemSettingsApi = async () => {
  return await apiFetch("/settings");
};

export const updateSystemSettingsApi = async (settings: {
  loginEnabled: boolean;
  signupEnabled: boolean;
  passwordRecoveryEnabled: boolean;
}) => {
  return await apiFetch("/settings", {
    method: "PUT",
    body: JSON.stringify(settings),
  });
};

export const forceLogoutAllApi = async () => {
  return await apiFetch("/force-logout-all", {
    method: "POST",
  });
};

export const verifyAdminPasswordApi = async (password: string) => {
  if (!password?.trim()) {
    throw new Error("La contraseña es requerida");
  }
  return await apiFetch("/verify-password", {
    method: "POST",
    body: JSON.stringify({ password: password.trim() }),
  });
};