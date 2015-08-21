var React = require('react');

var Markdown = React.createClass({
    render: function() {
        var DIV = React.DOM.div;
        return (
            <DIV key={this.props.children} dangerouslySetInnerHTML={{ __html: this.props.children}} />
        )
    }
});

module.exports = Markdown;