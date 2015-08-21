import _ from "lodash";
import Remarkable from "remarkable";

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
  return new Plugin("plugin-markdown-to-html", {
    metadata: {
      group: "builtin-basic"
    },
    visitor: {
      JSXElement(node) {
        
        if (this.isJSXElement(node) && node.openingElement.name.name === 'Markdown' && node.children.length === 1) {
            var md = new Remarkable("full");
            var strings = node.children[0].raw.split(NEW_LINE);
            var spacing = detectSpacing(strings);
            var content = _(strings).map((str) => _.drop(str, spacing).join('')).value().join(NEW_LINE);

            node.children[0].value = node.children[0].raw = md.render(content);
        }
      }
    }
  });
}
