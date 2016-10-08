# THIS IS DEPRECATED | NO MAINTENANCE
This targets babel 5 and was just a fun idea. Do not use this seriously. 

## babel-plugin-markdown-react

This plugin will use remarkable to pre-process all markdown within a Markdown component. Then we parse that HTML with babel into an AST and just replace the Markdown children node with the parsed AST.

## Example

`npm install babel babel-core babel-plugin-markdown-react --save`

Follow the guidelines here [https://babeljs.io/docs/advanced/plugins/](https://babeljs.io/docs/advanced/plugins/) to work the plugin into your asset pipeline.



```
import React from "react";
import Markdown from "babel-plugin-markdown-react/markdown";


export default class RenderMarkdown extends React.Component {

    render() {
        return (
            <Markdown>
                ## Something

                ## Something else as important

                ```
                var a = 1;
                var b = 2;
                var c = a + b;

                console.log(c) //3 => Math
                ```
            </Markdown>
        )
    }
}
```
