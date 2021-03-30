import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Draggable from "react-draggable";

const textAlignCSS = {};
textAlignCSS[0] = "left";
textAlignCSS[1] = "center";
textAlignCSS[2] = "right";

function JComponent(props) {
    const [wState, setWState] = useState(200);
    const [hState, setHState] = useState(30);

    const [isDraggable, setIsDraggable] = useState(true);

    useEffect(
        function () {
            console.log("chageee");
            setIsDraggable(false);
            setWState(props.jComponentClass.width);
            setHState(props.jComponentClass.height);
        },
        [props.jComponentClass.width, props.jComponentClass.height, props.jComponentClass.x, props.jComponentClass.y]
    );

    function onDragStart(event, info) {
        setIsDraggable(true);
        console.log("INFO");
        console.log(info);
        props.selectFunction(props.componentNumber);
    }

    function onDragEnd(event, info) {
        console.log(event);
        console.log(info);
        props.jComponentClass.x = info.x;
        props.jComponentClass.y = info.y;

        props.componentDragEnd();
    }

    return (
        <Draggable
            axis={isDraggable ? "both" : "none"}
            bounds={"parent"}
            onStart={onDragStart}
            onStop={onDragEnd}
            position={isDraggable ? undefined : { x: props.jComponentClass.x, y: props.jComponentClass.y }}>
            <div
                style={{
                    display: "inline-block",
                    width: "auto",
                    height: "auto",
                    outline: props.componentNumber === props.selectedNumber ? "2px solid dodgerblue" : "none",
                    position: "absolute",
                    padding: "5px",
                }}>
                <div
                    style={{
                        width: wState + "px",
                        height: hState + "px",
                        cursor: "grab",
                        border: props.jComponentClass.type === "label" ? "none" : "1px solid black",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: props.jComponentClass.type === "button" ? "lightsteelblue" : "white",
                    }}>
                    <h1
                        style={{
                            marginLeft: 1,
                            marginRight: 1,
                            width: "100%",
                            textTransform: "none",
                            textAlign: textAlignCSS[props.jComponentClass.textAlign],
                            fontFamily: "Arial",
                            fontSize: props.jComponentClass.font.size,
                            fontWeight: props.jComponentClass.font.bolded ? "bold" : "normal",
                        }}>
                        {props.jComponentClass.text}
                    </h1>
                    <div
                        style={{
                            width: props.jComponentClass.type === "comboBox" ? 30 : 0,
                            backgroundColor: "lightsteelblue",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                        }}>
                        <h1 style={{ fontWeight: "bolder" }}>▼</h1>
                    </div>
                </div>
            </div>
        </Draggable>
    );

    function checkWidth() {
        console.log("width");
        console.log(props.jComponentClass.width);
        return props.jComponentClass.width;
    }
}

export default JComponent;
