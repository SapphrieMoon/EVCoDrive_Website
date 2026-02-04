import type { AppContextInterface } from "@/types/commons/app-context.type";
import { clearLocalStorage, getAccessTokenFromLocalStorage, getProfileFromLocalStorage, LocalStorageEventTarget } from "@/utils/auth";
import { createContext, useState, useEffect } from "react";

const initialAppContext: AppContextInterface = {
    isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
    setIsAuthenticated: () => { },
    profile: getProfileFromLocalStorage(),
    setProfile: () => { },
    resetAuth: () => { },
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated);
    const [profile, setProfile] = useState(initialAppContext.profile);

    const resetAuth = () => {
        setIsAuthenticated(false);
        setProfile(null);
        clearLocalStorage()
    }

    useEffect(() => {
        const handleClearLS = () => {
            setIsAuthenticated(false);
            setProfile(null);
        }
        LocalStorageEventTarget.addEventListener('clearLS', handleClearLS)
        return () => {
            LocalStorageEventTarget.removeEventListener('clearLS', handleClearLS)
        }
    }, [])

    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile, resetAuth }}>
            {children}
        </AppContext.Provider>
    )
}