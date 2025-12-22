/**
 * Verifica si la suscripción aún está vigente según la fecha de expiración.
 * 
 * @param subscriptionExpiresAt - Puede ser Date, string (ISO), o null/undefined
 * @returns true si la fecha es futura (suscripción vigente), false si ya expiró o no existe
 */
export function hasValidSubscriptionTime(subscriptionExpiresAt: Date | string | null | undefined): boolean {
  // Si no hay fecha de expiración → no tiene suscripción válida
  if (!subscriptionExpiresAt) {
    return false;
  }

  let expiresDate: Date;

  // Si es string, convertir a Date
  if (typeof subscriptionExpiresAt === "string") {
    expiresDate = new Date(subscriptionExpiresAt);
  } else {
    expiresDate = subscriptionExpiresAt;
  }

  // Verificar si la fecha es válida
  if (isNaN(expiresDate.getTime())) {
    return false; // Fecha inválida → consideramos no vigente
  }

  const now = new Date();

  // Comparar: si expiresAt > now → aún vigente
  return expiresDate > now;
}