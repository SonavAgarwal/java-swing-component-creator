import React, { cloneElement, useRef, useState } from "react";
import CodeCopyModal from "./CodeCopyModal";
import JComponent from "./JavaComponents/JComponent";
import { getDefaultFont, getDefaultTextAlign, getDefaultXDimension, getDefaultYDimension } from "./JavaComponents/JComponentData";
import { makeClassText } from "./JavaComponents/ScreenClassMaker";

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue((value) => value + 1); // update the state to force render
}

function Editor(props) {
    const forceUpdate = useForceUpdate();

    const [jFrameWidth, setJFrameWidth] = useState(800);
    const [jFrameHeight, setJFrameHeight] = useState(400);
    const jFrameRef = useRef();

    const [frameComponents, setFrameComponents] = useState([]);
    const [selectedNumber, setSelectedNumber] = useState(-1);

    const [showCode, setShowCode] = useState(false);

    const componentCount = useRef(0);

    function addJComponent(type) {
        let jComponentClass = new JComponentClass(type, frameComponents.length);
        setFrameComponents([...frameComponents, jComponentClass]);
    }

    function selectComponent(number) {
        setSelectedNumber(number);
        forceUpdate();
    }

    function componentDragEnd() {
        forceUpdate();
    }

    function releaseSelection() {
        setSelectedNumber(-1);
    }

    function getCode() {
        // makeClassText(frameComponents);
        setShowCode(true);
    }

    function classToComponent(jComponentClass, index) {
        return (
            <JComponent
                jFrameRef={jFrameRef}
                selectedNumber={selectedNumber}
                selectFunction={selectComponent}
                componentDragEnd={componentDragEnd}
                componentNumber={index}
                key={index}
                jComponentClass={jComponentClass}></JComponent>
        );
    }

    function getComponentDataEditor() {
        if (frameComponents[selectedNumber] == null) return null;
        return (
            <div
                style={{
                    display: "flex",
                    // flex: 1,
                    justifyContent: "center",
                    width: "100%",
                    padding: "3vw",
                    boxSizing: "border-box",
                    flexDirection: "column",
                    borderBottom: "3px solid #EEEEEE",
                }}>
                <h2>Position</h2>
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <input
                        className='numberInput'
                        type='number'
                        style={{ width: "40%", height: "3vw" }}
                        onChange={function (event) {
                            frameComponents[selectedNumber].x = parseInt(event.target.value);
                            console.log(frameComponents[selectedNumber]);
                            forceUpdate();
                        }}
                        value={frameComponents[selectedNumber].x}></input>
                    <input
                        className='numberInput'
                        type='number'
                        style={{ width: "40%", height: "3vw" }}
                        onChange={function (event) {
                            frameComponents[selectedNumber].y = parseInt(event.target.value);
                            forceUpdate();
                        }}
                        value={frameComponents[selectedNumber].y}></input>
                </div>
                <h2>Dimensions</h2>
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <input
                        className='numberInput'
                        type='number'
                        style={{ width: "40%", height: "3vw" }}
                        onChange={function (event) {
                            frameComponents[selectedNumber].width = parseInt(event.target.value);
                            forceUpdate();
                        }}
                        value={frameComponents[selectedNumber].width}></input>
                    <input
                        className='numberInput'
                        type='number'
                        style={{ width: "40%", height: "3vw" }}
                        onChange={function (event) {
                            frameComponents[selectedNumber].height = parseInt(event.target.value);
                            forceUpdate();
                        }}
                        value={frameComponents[selectedNumber].height}></input>
                </div>
                <h2>Variable Name</h2>
                <input
                    style={{ width: "100%", height: "3vw" }}
                    onChange={function (event) {
                        frameComponents[selectedNumber].variableName = event.target.value;
                        forceUpdate();
                    }}
                    value={frameComponents[selectedNumber].variableName}></input>
                <h2>Text</h2>
                <input
                    style={{ width: "100%", height: "3vw" }}
                    onChange={function (event) {
                        frameComponents[selectedNumber].text = event.target.value;
                        forceUpdate();
                    }}
                    value={frameComponents[selectedNumber].text}></input>

                <h2>Text Alignment</h2>
                <input
                    type='range'
                    style={{ width: "100%", height: "3vw" }}
                    min={0}
                    max={2}
                    onChange={function (event) {
                        frameComponents[selectedNumber].textAlign = parseInt(event.target.value);
                        forceUpdate();
                    }}
                    value={frameComponents[selectedNumber].textAlign}></input>
                <h2>Size / Bold</h2>
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <input
                        type='number'
                        style={{ width: "80%", height: "3vw", marginBottom: 0 }}
                        onChange={function (event) {
                            frameComponents[selectedNumber].font.size = parseInt(event.target.value);
                            forceUpdate();
                        }}
                        value={frameComponents[selectedNumber].font.size}></input>
                    <input
                        type='checkbox'
                        style={{ height: "2vw", width: "2vw", marginBottom: 0 }}
                        min={0}
                        max={2}
                        onChange={function (event) {
                            frameComponents[selectedNumber].font.bolded = event.target.checked;
                            forceUpdate();
                        }}
                        checked={frameComponents[selectedNumber].font.bolded}></input>
                </div>
            </div>
        );
    }

    return (
        <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
            <div style={{ flex: 1, height: "100%", display: "flex" /*, justifyContent: "center", alignItems: "center"*/ }}>
                <div style={{ flex: 1, height: "100%" }} onClick={releaseSelection}></div>
                <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
                    <div style={{ flex: 1 }} onClick={releaseSelection}></div>
                    <div style={{ width: jFrameWidth, height: jFrameHeight + 30, backgroundColor: "white" }}>
                        <div
                            style={{
                                width: "100%",
                                height: 30,
                                backgroundColor: "dodgerblue",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                            <p style={{ color: "white", fontWeight: "bold", userSelect: "none" }}>COOL JAVA PROJECT</p>
                        </div>
                        <div style={{ width: jFrameWidth, height: jFrameHeight, position: "absolute", overflow: "hidden" }} ref={jFrameRef} id={"jFrame"}>
                            {frameComponents.map(classToComponent)}
                        </div>
                    </div>
                    <div style={{ flex: 1 }} onClick={releaseSelection}></div>
                </div>
                <div style={{ flex: 1, height: "100%" }} onClick={releaseSelection}></div>
            </div>
            <div
                style={{
                    width: "25vw",
                    backgroundColor: "white",
                    borderTopLeftRadius: "2vw",
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    height: "100vh",
                    overflowX: "hidden",
                    overflowY: "scroll",
                }}>
                {getComponentDataEditor()}
                <div
                    style={{
                        display: "flex",
                        // flex: 1,
                        alignItems: "center",
                        width: "100%",
                        padding: "3vw",
                        boxSizing: "border-box",
                        flexDirection: "column",
                    }}>
                    <h2 style={{ width: "100%" }}>Frame Dimensions</h2>
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <input
                            className='numberInput'
                            type='number'
                            style={{ width: "40%", height: "3vw" }}
                            onChange={function (event) {
                                setJFrameWidth(parseInt(event.target.value));
                                forceUpdate();
                            }}
                            value={jFrameWidth}></input>
                        <input
                            className='numberInput'
                            type='number'
                            style={{ width: "40%", height: "3vw" }}
                            onChange={function (event) {
                                setJFrameHeight(parseInt(event.target.value));
                                forceUpdate();
                            }}
                            value={jFrameHeight}></input>
                    </div>
                    <button style={{ width: "100%", height: "3vw" }} onClick={() => addJComponent("button")}>
                        Add JButton
                    </button>
                    <button style={{ width: "100%", height: "3vw" }} onClick={() => addJComponent("textField")}>
                        Add JTextField
                    </button>
                    <button style={{ width: "100%", height: "3vw" }} onClick={() => addJComponent("label")}>
                        Add JLabel
                    </button>
                    {/* <JButton></JButton> */}
                    <button className='blueButton' style={{ width: "100%", height: "3vw" }} onClick={getCode}>
                        Get Code
                    </button>
                </div>
            </div>
            <CodeCopyModal show={showCode} closeFunction={() => setShowCode(false)} frameComponents={frameComponents}></CodeCopyModal>
        </div>
    );
}

class JComponentClass {
    constructor(type, indexCreated) {
        this.type = type;
        this.x = 0;
        this.y = 0;
        this.width = getDefaultXDimension(this.type);
        this.height = getDefaultYDimension(this.type);
        this.indexCreated = indexCreated;
        this.variableName = "component" + this.indexCreated;
        this.text = this.type;
        this.textAlign = getDefaultTextAlign(this.type);
        this.font = getDefaultFont(this.type);
    }
}

export default Editor;
