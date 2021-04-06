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
        let jComponentClass = new JComponentClass(type, componentCount.current);
        componentCount.current = componentCount.current + 1;
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

                <h2
                    style={{
                        height: frameComponents[selectedNumber].type !== "comboBox" ? null : 0,
                        overflow: "hidden",
                        marginBottom: frameComponents[selectedNumber].type !== "comboBox" ? null : 0,
                    }}>
                    Text Alignment
                </h2>
                <input
                    type='range'
                    style={{
                        width: "100%",
                        height: frameComponents[selectedNumber].type !== "comboBox" ? "3vw" : 0,
                        overflow: "hidden",
                        marginBottom: frameComponents[selectedNumber].type !== "comboBox" ? null : 0,
                    }}
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
                        style={{ width: "80%", height: "3vw" }}
                        onChange={function (event) {
                            frameComponents[selectedNumber].font.size = parseInt(event.target.value);
                            forceUpdate();
                        }}
                        value={frameComponents[selectedNumber].font.size}></input>
                    <input
                        type='checkbox'
                        style={{ height: "2vw", width: "2vw" }}
                        min={0}
                        max={2}
                        onChange={function (event) {
                            frameComponents[selectedNumber].font.bolded = event.target.checked;
                            forceUpdate();
                        }}
                        checked={frameComponents[selectedNumber].font.bolded}></input>
                </div>
                <button
                    style={{ width: "100%", height: "3vw", marginBottom: "1vw" }}
                    onClick={function () {
                        duplicateSelectedJComponent();
                        console.log(frameComponents);
                        forceUpdate();
                    }}>
                    Duplicate
                </button>
                <button
                    style={{ width: "100%", height: "3vw", marginBottom: "1vw" }}
                    onClick={function () {
                        frameComponents[selectedNumber].reset();
                        forceUpdate();
                    }}>
                    Reset
                </button>
                <button
                    style={{ width: "100%", height: "3vw" }}
                    onClick={function () {
                        setFrameComponents(frameComponents.filter((item, index) => index !== selectedNumber));
                        releaseSelection();
                    }}>
                    Delete Component
                </button>
            </div>
        );
    }

    function duplicateSelectedJComponent() {
        let jComponentClass = frameComponents[selectedNumber];
        let newJComponentClass = jComponentClass.copy(componentCount.current);
        componentCount.current = componentCount.current + 1;
        setSelectedNumber(frameComponents.length);
        frameComponents.push(newJComponentClass);
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
                    <button style={{ width: "100%", height: "3vw" }} onClick={() => addJComponent("comboBox")}>
                        Add JComboBox
                    </button>
                    {/* <JButton></JButton> */}
                    <button className='blueButton' style={{ width: "100%", height: "3vw" }} onClick={getCode}>
                        Get Code
                    </button>
                </div>
                <div
                    style={{
                        width: "100%",
                        height: "2vh",
                        display: "flex",
                        alignSelf: "flex-end",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "auto",
                        paddingBottom: "2vh",
                        color: "lightgray",
                    }}>
                    <h1 style={{ color: "lightgray !important", fontSize: 10 }}>
                        v 1.5 | To report issues, contact{" "}
                        <a style={{ color: "lightgray" }} href='mailto: me@sonavagarwal.com'>
                            me
                        </a>
                        .
                    </h1>
                </div>
            </div>
            <CodeCopyModal show={showCode} closeFunction={() => setShowCode(false)} frameComponents={frameComponents}></CodeCopyModal>
        </div>
    );
}

class JComponentClass {
    constructor(type, indexCreated) {
        this.type = type;
        this.indexCreated = indexCreated;
        this.x = 0 + this.indexCreated * 10;
        this.y = 0 + this.indexCreated * 10;
        this.width = getDefaultXDimension(this.type);
        this.height = getDefaultYDimension(this.type);
        this.variableName = "component" + this.indexCreated;
        this.text = this.type;
        this.textAlign = getDefaultTextAlign(this.type);
        this.font = getDefaultFont(this.type);
    }

    reset() {
        this.x = 0 + this.indexCreated * 10;
        this.y = 0 + this.indexCreated * 10;
        this.width = getDefaultXDimension(this.type);
        this.height = getDefaultYDimension(this.type);
        this.variableName = "component" + this.indexCreated;
        this.text = this.type;
        this.textAlign = getDefaultTextAlign(this.type);
        this.font = getDefaultFont(this.type);
    }

    copy(newIndex) {
        let newClass = new JComponentClass(this.type, newIndex);
        newClass.x = this.x + 10;
        newClass.y = this.y + 10;
        newClass.width = this.width;
        newClass.height = this.height;
        newClass.text = this.text;
        newClass.textAlign = this.textAlign;
        newClass.font = this.font.copy();
        return newClass;
    }
}

export default Editor;
