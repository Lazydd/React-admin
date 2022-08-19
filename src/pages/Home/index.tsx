import useMousePosition from "hooks/useMousePosition";
import React from "react";

export default function index() {
    const position = useMousePosition();
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: `<div style="width:100px;height:100px;background-color:red">
            x:${position.x}
            y:${position.y}
            </div>`,
            }}
        />
    );
}
