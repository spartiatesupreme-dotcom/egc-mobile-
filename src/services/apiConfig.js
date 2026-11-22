const PRODUCTION_API_URL = "https://egc-api-production-89c8acaf.up.railway.app";

export const API_URL = (
  import.meta.env.VITE_API_URL
  || (import.meta.env.DEV ? "http://localhost:8080" : PRODUCTION_API_URL)
).replace(/\/+$/, "");

export const YOUTUBE_CHANNEL_URL =
  import.meta.env.VITE_YOUTUBE_CHANNEL_URL
  || "https://www.youtube.com/@egliseglorieuseduchrist";
