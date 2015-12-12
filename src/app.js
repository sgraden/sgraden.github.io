var React = require("react");
var ReactDOM = require("react-dom");

var CardAction = React.createClass({
    render: function() {
        return (
            <div className="card-action">
                <a href="#">This is a link</a>
            </div>
        );
    }
});

var CardContent = React.createClass({
    render: function() {
        return (
            <div className="card-content black-text">
                <span className="card-title black-text">example</span>
                <p>example</p>
            </div>
        );
    }
});

var Card = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
            this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="col s12 m6 l4">
                <div className="card small hoverable">
                    <CardContent />
                    <CardAction />
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <Card />,
    document.getElementById('portfolio')
);
