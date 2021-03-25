import * as React from "react";
import GithubCorner from "react-github-corner";
import { Helmet } from "react-helmet";
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
            <Helmet>
                <meta charSet='utf-8' />
                <title>Java Swing Component Creator</title>
                <link rel='shortcut icon' href='../java-swing-component-creator/static/favicon.ico' />
            </Helmet>
            <Editor />
            <GithubCorner href='https://github.com/SonavAgarwal/java-swing-component-creator' direction='left' octoColor='#eeeeee' size={"3vw"} />
        </main>
    );
};

export default IndexPage;
