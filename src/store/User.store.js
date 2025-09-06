import { create } from "zustand";


export const userStorage = create((set) => {
    return {
        user : null,
        setUser : (user) => set({user})
    }
})