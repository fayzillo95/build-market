import { create } from "zustand";

// 🔹 Auth store
export const authStore = create((set) => ({
    isAuth: false,
    setIsAuth: (isAuth) => set({ isAuth }),
}));

// 🔹 Access token store
export const accessTokenStore = create((set) => ({
    accessToken: localStorage.getItem("accessToken") || null,

    setaccessToken: (token) => {
        if (token) {
            localStorage.setItem("accessToken", token);
            set({ accessToken : token });
        } else {
            localStorage.removeItem("accessToken");
            set({ accessToken: null });
        }
    },

    getAccessToken: () => localStorage.getItem("accessToken"),

    deleteAccessToken: () => {
        localStorage.removeItem("accessToken");
        set({ accessToken: null });
    },
}));

// 🔹 Refresh token store
export const refreshTokenStore = create((set) => ({
    refreshToken: localStorage.getItem("refreshToken") || null,

    setrefreshToken: (token) => {
        if (token) {
            localStorage.setItem("refreshToken", token);
            set({ refreshToken : token });
        } else {
            localStorage.removeItem("refreshToken");
            set({ refreshToken: null });
        }
    },

    getRefreshToken: () => localStorage.getItem("refreshToken"),

    deleteRefreshToken: () => {
        localStorage.removeItem("refreshToken");
        set({ refreshToken: null });
    },
}));


