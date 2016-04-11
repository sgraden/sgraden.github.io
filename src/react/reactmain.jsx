'esversion: 6';

var React = require("react");
var ReactDOM = require("react-dom");

// var CardAction = React.createClass({
//     render: function() {
//         return (
//             <div className="card-action">
//                 <a href="#">This is a link</a>
//             </div>
//         );
//     }
// });
//
// var CardContent = React.createClass({
//     render: function() {
//         return (
//             <div className="card-content black-text">
//                 <span className="card-title black-text">{this.props.project.title}</span>
//                 <p>{this.props.project.desc}</p>
//             </div>
//         );
//     }
// });
//
// var Card = React.createClass({
//     render: function() {
//         return (
//             <div className="col s12 m6 l4">
//                 <div className="card small hoverable">
//                     <CardContent project={this.props.project}/>
//                     <CardAction />
//                 </div>
//             </div>
//         )
//     }
// });
//
// var CardContainer = React.createClass({
// // class CardContainer extends React.Component {
//     getInitialState: function () {
//         return {
//             names: [{
//                 title: "project1",
//                 id: 1,
//                 desc: "this is a project"
//             },
//             {
//                 title: "project2",
//                 id: 2,
//                 desc: "this is a project"
//             },
//             {
//                 title: "project8",
//                 id: 3,
//                 desc: "this is a project"
//             }]
//         }
//     },
//     render: function () {
//         var cards = this.state.names.map(function (project) {
//             return <Card key={project.id} project={project} />;
//         });
//         return (
//             <div className="projectCards">
//                 {cards}
//             </div>
//         );
//     }
// });

import CardContainer from './react-card.jsx';

ReactDOM.render(
    <CardContainer />,
    document.getElementById('portfolio')
);
