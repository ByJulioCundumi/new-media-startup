export const isOnline = () => {
  if (typeof navigator === "undefined") return true;
  return navigator.onLine;
};