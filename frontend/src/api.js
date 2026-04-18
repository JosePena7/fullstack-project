const configuredApiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
const defaultApiUrl = import.meta.env.PROD ? "/api" : "http://127.0.0.1:5000";

export const API_URL = configuredApiUrl || defaultApiUrl;

export const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL}${normalizedPath}`;
};
