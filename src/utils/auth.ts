import type { User } from "@/types/user.type";

const ACCESS_TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';
const PROFILE_KEY = 'profile';
const STATION_ID_KEY = 'stationId';
const STATION_NAME_KEY = 'stationName';

export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLocalStorage = (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const setRefreshTokenToLocalStorage = (token: string) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const clearLocalStorage = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(PROFILE_KEY)
    localStorage.removeItem(STATION_ID_KEY)
    localStorage.removeItem(STATION_NAME_KEY)
    LocalStorageEventTarget.dispatchEvent(new Event('clearLS'))
}

export const getAccessTokenFromLocalStorage = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshTokenFromLocalStorage = () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const removeRefreshTokenFromLocalStorage = () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getProfileFromLocalStorage = () => {
    const profile = localStorage.getItem(PROFILE_KEY);
    return profile ? JSON.parse(profile) : null;
};

export const setProfileToLocalStorage = (profile: User) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const getStationIdFromLocalStorage = () => {
    return localStorage.getItem(STATION_ID_KEY);
};

export const setStationIdToLocalStorage = (stationId: string) => {
    localStorage.setItem(STATION_ID_KEY, stationId);
};

export const getStationNameFromLocalStorage = () => {
    return localStorage.getItem(STATION_NAME_KEY);
};

export const setStationNameToLocalStorage = (stationName: string) => {
    localStorage.setItem(STATION_NAME_KEY, stationName);
};
