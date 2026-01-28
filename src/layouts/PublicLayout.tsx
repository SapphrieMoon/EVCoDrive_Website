import { LandingHeader } from "@/components/layout/LandingHeader"
import { Outlet } from "react-router-dom"

export const PublicLayout = () => {
    return (
        <div>
            <LandingHeader />

            <main className="">
                <Outlet />
            </main>
        </div>
    )
}