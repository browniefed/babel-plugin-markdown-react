var React = require('react');

var Markdown = React.createClass({
    render: function() {
        return (React.Children.only(this.props.children));
    }
});

module.exports = Markdown;