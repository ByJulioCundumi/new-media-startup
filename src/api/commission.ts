// src/api/commission.ts

const COMMISSION_BASE_URL = "http://localhost:4000/api/commission";

// Obtener la solicitud actual del usuario autenticado (puede ser null si no tiene)
export const getMyCommissionRequestApi = async (): Promise<any | null> => {
  try {
    const res = await fetch(`${COMMISSION_BASE_URL}/my-request`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 404 || res.status === 304) {
      return null;
    }

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Error al cargar tu solicitud de comisión");
    }

    return await res.json();
  } catch (err) {
    // Errores de red o CORS también llegan aquí
    console.error("Network error fetching commission request:", err);
    throw new Error("No se pudo conectar con el servidor. Verifica tu conexión.");
  }
};

// Crear una nueva solicitud de incremento
// Crear o actualizar solicitud
export const createCommissionRequestApi = async (data: {
  hotmartUsername: string;
  hotmartEmail: string;
}): Promise<any> => {
  const res = await fetch(`${COMMISSION_BASE_URL}/request`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    // Manejo especial si ya hay una solicitud procesada
    if (res.status === 400 && responseData.currentRequest) {
      throw new Error(
        "Ya tienes una solicitud procesada. Si deseas solicitar un nuevo incremento, espera o contacta al administrador."
      );
    }
    throw new Error(responseData.message || "Error al enviar la solicitud");
  }

  return responseData.request;
};

// Cancelar solicitud pendiente
export const cancelCommissionRequestApi = async (requestId: string): Promise<void> => {
  const res = await fetch(`${COMMISSION_BASE_URL}/request/${requestId}`, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Error cancelando solicitud");
  }
};

export const getAllCommissionRequestsApi = async (): Promise<any[]> => {
  const res = await fetch(`${COMMISSION_BASE_URL}/request`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Error obteniendo solicitudes");
  }

  return await res.json();
};

export const reviewCommissionRequestApi = async (
  requestId: string,
  status: "APPROVED" | "REJECTED",
  approvedCommission?: number,
  denyReason?: string
): Promise<any> => {
  const res = await fetch(`${COMMISSION_BASE_URL}/request/${requestId}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      status,
      approvedCommission,
      denyReason,
    }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Error revisando solicitud");
  }

  return await res.json();
};

export const getCommissionRequestByIdApi = async (requestId: string): Promise<any> => {
  const res = await fetch(`${COMMISSION_BASE_URL}/request/${requestId}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Error al obtener la solicitud");
  }

  return await res.json();
};