import { useEffect, useState } from "react";
import CubeLoader from "./CubeLoader";

export default function RoutePending() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const showDelay = setTimeout(() => {
            setVisible(true);
        }, 120);

        return () => clearTimeout(showDelay);
    }, []);

    // giữ loader tối thiểu 500ms
    useEffect(() => {
        if (!visible) return;

        const minTime = setTimeout(() => { }, 500);
        return () => clearTimeout(minTime);
    }, [visible]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <CubeLoader />
        </div>
    );
}
