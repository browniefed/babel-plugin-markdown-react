const NEW_LINE = "\n";
const SPACE = " ";

import _ from "lodash";
import marked from "marked";
import * as babel from "babel-core";
import hljs from "highlight.js";

function isStringEmpty(str) {
    return !_.trim(str) 
}

function detectSpacing(_stringArray) {

    var stringArray = _.toArray(_stringArray);

    var spacingCount = _(stringArray).map((str) => {
        if (isStringEmpty(str)) return -1;
        var spaceCount = 0;
        _.find(str, (chr) => {
            if(chr !== SPACE) return true;
            spaceCount++;
        });
        return spaceCount;
    })
    .filter((count) => count !== -1).min();

    return spacingCount;
}

export default function ({ Plugin, types: t }) {
  return new Plugin("babel-plugin-markdown-react", {
    metadata: {
      group: "builtin-basic"
    },
    visitor: {
      JSXElement(node) {        
        if (this.isJSXElement(node) && node.openingElement.name.name === 'Markdown' && node.children.length === 1) {
            var renderer = new marked.Renderer();
            var codeRenderer = renderer.code;

            renderer.code = function() {
                var renderCode = codeRenderer.apply(renderer, _.toArray(arguments));
                return renderCode.replace(/\<code\>/g, '<code class="hljs">').split(NEW_LINE).join('{String.fromCharCode(10)}')
            }


            marked.setOptions({
              renderer: renderer,
              gfm: true,
              tables: true,
              breaks: false,
              pedantic: false,
              sanitize: true,
              smartLists: true,
              smartypants: false,
              highlight: function (code) {
                return hljs.highlightAuto(code).value;
              }
            });

            var strings = node.children[0].raw.split(NEW_LINE);
            var spacing = detectSpacing(strings);
            var content = _(strings).map((str) => _.drop(str, spacing).join('')).value().join(NEW_LINE);

            var markdownAST = babel.parse('<div>' + NEW_LINE + marked(content).replace(/class=/g, 'className=') + NEW_LINE + '</div>');

            node.children = [markdownAST.body[0].expression]
        }
      }
    }
  });
}