// src/api.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL; // reads from .env

// Specific endpoints
export const ATTENDANCE_API = `${API_BASE}/api/attendance/`;
export const MARKS_API = `${API_BASE}/api/marks/`;
export const AI_CHAT_API = `${API_BASE}/api/ai-chat/`;
export const ADMIN_LOGIN_API = `${API_BASE}/api/admin-login/`;
export const DASHBOARD_API = `${API_BASE}/api/admin-dashboard/`;
export const EVENT_POST_API = `${API_BASE}/api/event-posts/`;
export const ADMISSION_API = `${API_BASE}/api/admissions/`;
export const SHORTS_API = `${API_BASE}/api/shorts/`;
export const CLEAR_DIVISION_MARKS_API = `${API_BASE}/api/marks/clear_division/`;
export const CLEAR_ALL_MARKS_API = `${API_BASE}/api/marks/clear_all/`;

// Axios instance (optional, for general use)
export const axiosInstance = axios.create({
  baseURL: API_BASE,
});
