import React, { useState, useEffect } from "react";

export default function useMousePosition() {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });
    useEffect(() => {
        const move = (e: any) => {
            let { x, y } = e;
            setPosition({ x, y });
        };

        document.addEventListener("mousemove", move);
        return () => {
            document.removeEventListener("mousemove", move);
        };
    }, []);
    return position;
}
