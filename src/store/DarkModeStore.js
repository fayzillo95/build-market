import {create} from "zustand"

export const useDarck = create((set) => {
    return {
        isDark : false,
        setIsDark : (isDark) => set({isDark})
    }
})

export const useThemePrimary = create((set) => ({
    primary: {},
    setPrimary: (primary) => set((state) => ({
        ...state,
        primary: {
            ...state.primary,
            ...primary,
        },
    })),
}));
