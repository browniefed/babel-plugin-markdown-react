# markdown-react-babel-plugin

This plugin will use remarkable to pre-process all markdown within a Markdown component to HTML.
It is then set with `dangerouslySetInnerHTML`.

## Future?

Future work will hopefully be done to convert to React elements so we can take advantage of React diffing, although just setting innerHTML might be faster(?).

## Example

`npm install babel babel-core markdown-react-babel-plugin --save`

Follow the guidelines here [https://babeljs.io/docs/advanced/plugins/](https://babeljs.io/docs/advanced/plugins/) to work the plugin into your asset pipeline.



```
import React from "react";
import Markdown from "markdown-react-babel-plugin/markdown";


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