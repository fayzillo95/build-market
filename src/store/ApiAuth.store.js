import axios from "axios"
import { create } from "zustand"
import { refreshTokenStore } from "./IsAuth.store"

export const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

export const ApiStore = create((set) => {

    const api = axios.create({
        baseURL: VITE_BASE_URL,
        headers: {
            "Content-Type": "application/json, text/plain, */*",
        },
    })

    // Interseptorni faqat bir marta qo‘shamiz
    api.interceptors.response.use(
        (res) => res.data,
        async (err) => {
            const originalRequest = err.config;
            if (err.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true; // faqat bir marta urinish
                if (originalRequest.url !== "auth/reset-token") {
                    try {
                        const refreshToken = localStorage.getItem("refreshToken");
                        const data = await api.get("auth/reset-token", {
                            headers: { Authorization: "Bearer " + refreshToken },
                        });
                        console.log("Token yangilandi:", data);
                        return api(originalRequest); // original requestni qayta yuborish
                    } catch (e) {
                        console.log("Token yangilashda xato:", e);
                    }
                }
            }
            return Promise.reject(err);
        }
    );

    return {
        api,
        setHeader: (header) =>
            set((state) => {
                state.api.defaults.headers = {
                    ...state.api.defaults.headers,
                    ...header,
                }
                return { api: state.api }
            }),
    }
})
