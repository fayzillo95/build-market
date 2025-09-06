import { create } from "zustand";

export const userRegisterStore = create((set) => {
    return {
        registerData : {
            fullName : "",
            email : "",
            password : "",
            repeat_password : ""
        },
        setRegisterData : (data) => set((state) => ({
            ...state,
            registerData : {
                ...state.registerData,
                ...data
            }
        }))
    }
})

export const userLoginStore = create((set) => {
    return {
        loginData : {
            email : "",
            password : "",
        },
        setLoginData : (data) => set((state) => ({
            ...state,
            loginData : {
                ...state.loginData,
                ...data
            }
        }))
    }
})

export const emailStore = create((set) => {
    return {
        email : null,
        setEmail : (email) => set({email})
    }
})