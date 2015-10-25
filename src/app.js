var React = require("react");
var ReactDOM = require("react-dom");
/*
<div class="col s12 m6 l4">
    <div class="card small hoverable">

        <div class="card-content black-text">
            <span class="card-title black-text">Card Title</span>
            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
            <a href="#">This is a link</a>
        </div>
    </div>
</div>
*/

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
    // loadCommentsFromServer: function() {
    //     $.ajax({
    //         url: this.props.url,
    //         dataType: 'json',
    //         cache: false,
    //         success: function(data) {
    //             this.setState({data: data});
    //         }.bind(this),
    //             error: function(xhr, status, err) {
    //             console.error(this.props.url, status, err.toString());
    //         }.bind(this)
    //     });
    // },
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
