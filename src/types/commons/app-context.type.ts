import type { User } from "../user.type";

export interface AppContextInterface {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    profile: User | null;
    setProfile: (profile: User | null) => void;
    resetAuth: () => void;
}