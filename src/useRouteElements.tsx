import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import Login from "@/pages/Login";
import Home from "./pages/Home/Home";
import { MainLayout } from "./layouts/MainLayout";


export default function useRouteElements() {
    const routeElements = useRoutes([
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: (
                        <Suspense>
                          <Home />
                        </Suspense>
                      )
                }
            ]
        }
    ])
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {routeElements}
        </Suspense>
    )
}