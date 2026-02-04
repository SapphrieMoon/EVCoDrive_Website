import authApi from "@/apis/auth.api";
import { AppContext } from "@/contexts/app.context";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

export const useLoginMutation = () => {
    const { setIsAuthenticated, setProfile } = useContext(AppContext)
    return useMutation({
        mutationFn: authApi.login,
        onSuccess: (res) => {
            const { user } = res.data.data
            setIsAuthenticated(true)
            setProfile(user)
        }
    })
}

export const useLogoutMutation = () => {
    const { resetAuth } = useContext(AppContext)
    return useMutation({
        mutationFn: authApi.logout,
        onSettled: () => {
            resetAuth()
        }
    })
}