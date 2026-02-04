import path from "@/constants/path"
import { AppContext } from "@/contexts/app.context"
import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"

/**
 * Guard: Chỉ cho phép vào nếu ĐÃ đăng nhập (Dành cho Admin/CMS)
 */
export function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

/**
 * Guard: Chỉ cho phép vào nếu CHƯA đăng nhập (Dành cho trang Login)
 */

export function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to={path.station} />
}