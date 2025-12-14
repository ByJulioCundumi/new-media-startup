// api/user.ts

const USER_BASE_URL = "http://localhost:4000/api/user";

// Obtener las plantillas favoritas del usuario
export const getFavoriteTemplatesApi = async (): Promise<string[]> => {
  const res = await fetch(`${USER_BASE_URL}/favorites`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error obteniendo favoritos");

  return data.favoriteTemplates; // → array de strings (IDs de plantillas)
};

// Agregar una plantilla a favoritos
export const addFavoriteTemplateApi = async (templateId: string): Promise<string[]> => {
  const res = await fetch(`${USER_BASE_URL}/favorites/add`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ templateId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error agregando favorito");

  return data.favoriteTemplates;
};

// Quitar una plantilla de favoritos
export const removeFavoriteTemplateApi = async (templateId: string): Promise<string[]> => {
  const res = await fetch(`${USER_BASE_URL}/favorites/remove`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ templateId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error quitando favorito");

  return data.favoriteTemplates;
};