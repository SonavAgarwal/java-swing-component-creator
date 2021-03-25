import React, { useEffect, useState } from "react";
import { CopyBlock, atomOneLight } from "react-code-blocks";
import { makeComponentDeclarations, makeComponentInitializations } from "./JavaComponents/ScreenClassMaker";

function CodeCopyModal(props) {
    const [initCode, setInitCode] = useState("");
    const [declCode, setDeclCode] = useState("");

    useEffect(
        function () {
            setDeclCode(makeComponentDeclarations(props.frameComponents));
            setInitCode(makeComponentInitializations(props.frameComponents));
        },
        [props.show]
    );

    if (!props.show) return null;

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#00000080",
            }}>
            <div style={{ position: "absolute", width: "100vw", height: "100vh" }} onClick={props.closeFunction}></div>
            <div
                style={{
                    height: "80vh",
                    aspectRatio: "16/9",
                    backgroundColor: "white",
                    borderRadius: "2vw",
                    zIndex: 10,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "space-evenly",
                    padding: "5vh",
                    boxSizing: "border-box",
                }}>
                <div style={{ height: "100%", width: "100%", overflow: "scroll" }}>
                    <CopyBlock text={declCode + "\n" + initCode} language='java' theme={atomOneLight} style={{ marginBottom: "5vh" }} />
                    {/* <CodeBlock text={initCode} language='java' theme={atomOneLight}></CodeBlock> */}
                </div>
            </div>
        </div>
    );
}

export default CodeCopyModal;
