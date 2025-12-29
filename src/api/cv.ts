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


export const getAllCvsApi = async () => {
  const res = await fetch(`${BASE_URL}/all`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error cargando CVs");

  return data; // debe ser un array de CVs
};


export const updateCvApi = async (id: string, data: any) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error actualizando CV");
  }

  return res.json();
};


// api/cv.ts
export const deleteCvApi = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error eliminando CV");
  }

  return res.json();
};

// api/cv.ts

export const getCvCountApi = async (): Promise<number> => {
  const res = await fetch(`${BASE_URL}/count`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error obteniendo conteo de CVs");
  }

  return data.cvCount; // → número entero
};

export const getPublicCvById = async (publicId: string) => {
  if (!publicId?.trim()) {
    throw new Error("publicId inválido");
  }

  const res = await fetch(`${BASE_URL}/public/${publicId}`, {
    method: "GET",
    // NO enviamos credentials → es público
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "No se pudo cargar el CV");
  }

  return data; // Todo el objeto CV completo
};