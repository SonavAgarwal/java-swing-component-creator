import * as React from "react";
import Editor from "../components/Editor";

// styles
const pageStyles = {
    backgroundColor: "#EEEEEE",
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

// markup
const IndexPage = () => {
    return (
        <main style={pageStyles}>
            <title>Home Page</title>
            <Editor />
        </main>
    );
};

export default IndexPage;
