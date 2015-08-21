var React = require('react');

var Markdown = React.createClass({
    render: function() {
        var DIV = React.DOM.div;
        return (
            <DIV>{this.props.children}</DIV>
        )
    }
});

module.exports = Markdown;