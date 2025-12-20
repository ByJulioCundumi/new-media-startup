// src/api/admin.ts

const BASE_URL = "http://localhost:4000/api/admin";

const apiFetch = async (endpoint: string) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    credentials: "include", // Necesario para enviar la cookie con el token
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al cargar datos del admin");
  }

  return data;
};

// Estadísticas del día actual
export const getTodayStatsApi = async () => {
  return await apiFetch("/stats/today");
};

// Estadísticas de los últimos 7 días (por día)
export const getLast7DaysStatsApi = async () => {
  return await apiFetch("/stats/last-7-days");
};

// Lista de usuarios con su actividad de hoy (para futuros usos, como tabla de usuarios)
export const getUsersWithTodayActivityApi = async () => {
  return await apiFetch("/users/today-activity");
};

export const getGeneralMetricsApi = async () => {
  return await apiFetch("/metrics/general");
};