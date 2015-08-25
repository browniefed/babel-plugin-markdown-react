import _ from "lodash";
import Remarkable from "remarkable";
import * as babel from "babel-core";

var hljs = require('highlight.js');

const NEW_LINE = "\n";
const SPACE = " ";

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
            var md = new Remarkable("full", {
                highlight: function (str, lang) {
                    var code = '';
                    if (lang && hljs.getLanguage(lang)) {
                      try {
                        code = hljs.highlight(lang, str).value;
                      } catch (err) {}
                    }

                    try {
                      code = hljs.highlightAuto(str).value;
                    } catch (err) {}
                    
                    return code.replace(/class=/g, 'className=').split(NEW_LINE).join('{String.fromCharCode(10)}')
                }
            });
            var strings = node.children[0].raw.split(NEW_LINE);
            var spacing = detectSpacing(strings);
            var content = _(strings).map((str) => _.drop(str, spacing).join('')).value().join(NEW_LINE);

            var markdownAST = babel.parse('<div>' + NEW_LINE + md.render(content) + NEW_LINE + '</div>');

            node.children = [markdownAST.body[0].expression]
        }
      }
    }
  });
}