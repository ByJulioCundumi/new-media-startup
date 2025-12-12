const BASE_URL = "http://localhost:4000/api/cv";

export const createCvApi = async (cvTitle: string, templateId: string) => {
  const res = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cvTitle, templateId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error creando CV");

  return data; // { id, cvTitle, templateId }
};


export const getCvByIdApi = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
    credentials: "include", // ← IMPORTANTE para enviar cookie con token
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error obteniendo CV");

  return data;
};
