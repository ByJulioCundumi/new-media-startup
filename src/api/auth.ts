export interface AuthUser {
  id: string;
  email: string;
  userName: string;
  favoriteTemplates: string[]
}

interface AuthResponse {
  message: string;
  user?: AuthUser;
}

interface CheckSessionResponse {
  logged: boolean;
  user?: AuthUser;
}

const normalizeAuthUser = (user: any): AuthUser => ({
  id: user.id,
  email: user.email,
  userName: user.userName,
  favoriteTemplates: Array.isArray(user.favoriteTemplates)
    ? user.favoriteTemplates
    : [],
});


const BASE_URL = "http://localhost:4000/api";

export const signup = async (email: string, username: string, password: string): Promise<AuthResponse> => {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    credentials: "include", // para que se envíen cookies
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username, password }),
  });

  return res.json();
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

export const checkSession = async (): Promise<CheckSessionResponse> => {
  const res = await fetch(`${BASE_URL}/auth/check`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
};

export const logout = async (): Promise<{ message: string }> => {
  const res = await fetch(`${BASE_URL}/auth/logout`, { 
    method: "POST",
    credentials: "include",
  });

  return res.json();
};

export const requestPasswordReset = async (email: string) => {
  const res = await fetch(`${BASE_URL}/auth/password/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
};

export const verifyPasswordCode = async (email: string, code: string) => {
  const res = await fetch(`${BASE_URL}/auth/password/code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });

  return res.json();
};

export const resetPassword = async (email: string, code: string, newPassword: string) => {
  const res = await fetch(`${BASE_URL}/auth/password/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code, newPassword }),
  });
  return res.json();
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
): Promise<{ message: string }> => {
  if (newPassword !== confirmPassword) {
    throw new Error("Las contraseñas no coinciden");
  }

  const res = await fetch(`${BASE_URL}/auth/password/change`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al cambiar la contraseña");
  }

  return data; // { message: "Contraseña actualizada correctamente" }
};


// Obtener comisión actual del usuario (útil para mostrar en perfil o panel)
export const getMyCommissionApi = async (): Promise<number> => {
  const res = await fetch(`${BASE_URL}/auth/my-commission`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Error obteniendo comisión");
  }

  const data = await res.json();
  return data.commission; // → número como 20 o 50
};