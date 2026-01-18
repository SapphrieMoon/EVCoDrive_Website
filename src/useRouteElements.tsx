import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import Login from "@/pages/Login";
import Home from "./pages/Home/Home";


export default function useRouteElements() {
    const routeElements = useRoutes([
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/",
            element: <Home />
        }
    ])
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {routeElements}
        </Suspense>
    )
}