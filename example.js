import React from "react";
import Markdown from "./markdown";

export default class RenderMarkdown extends React.Component {

    render() {
        return (
            <Markdown>
                ## Hello
                ### World

                ```
                var a = 1;
                var b = 2;
                var c = a + b;
                console.log(c);
                ```
                
            </Markdown>
        )
    }
}