import React from "react";

export default function index() {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: '<div style="width:100px;height:100px;background-color:red">Home</div>',
            }}
        />
    );
}
