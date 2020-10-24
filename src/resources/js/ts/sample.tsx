import React from "react";
import { render } from "react-dom";

const Hoge = () => {

    const hoge: string = "hogehogehoge";
    return (
        <>
            <h1>hoge</h1>
            <h1>{hoge}</h1>
            <h1>aa</h1>
        </>
    )
}

if (document.getElementById('example')) {
    render(<Hoge />, document.getElementById('example'));
}
