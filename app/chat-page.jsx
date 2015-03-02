var React = require('react/addons');
var TransitionGroup = React.addons.CSSTransitionGroup;

var Firebase = require('firebase');

var Message = React.createClass({
    mixins:[React.addons.PureRenderMixin],

    render: function() {
        var sender = this.props.message.sender;
        var date = new Date(this.props.message.time).toLocaleString('en-US');
        var content = this.props.message.content;
        return (
            <div className="message">
                <h4>{sender} at {date}</h4>
                <p>{content}</p>
            </div>
        );
    }
});

module.exports = React.createClass({
    getInitialState: function() {
        return {
            slideTransition: "slideLeft",
            newMessage: ""
        }
    },

    componentWillReceiveProps: function(nextProps) {
        if(nextProps.currentSlide > this.props.currentSlide)
            this.setState({slideTransition: "slideLeft"});
        else
            this.setState({slideTransition: "slideRight"});
    },

    handleMessage: function(e) {
        this.setState({newMessage: e.target.value});
    },

    sendMessage: function() {
        var message = this.state.newMessage;
        if(message != "") {
            var sender = "Me";
            var time = Date.now();
            var fbRef = new Firebase("https://brilliant-heat-7623.firebaseio.com/slides/" + this.props.currentSlide + "/messages")
            fbRef.push({sender: sender, time: time, content: message});
        }
        this.setState({newMessage: ""});
    },

    render: function() {
        var currentSlide = this.props.currentSlide;
        var slides = this.props.slides;
        var slide = slides[currentSlide];

        var messages;
        if (slide.messages)
            messages = Object.keys(slide.messages).map(function(i) {
                return <Message key={i} message={slide.messages[i]} />;
            });
        else
            messages = <div style={{margin: "20px"}}>No messages yet on this slide</div>

        return (
            <div className="chat-page" style={this.props.style}>
                <TransitionGroup className="message-container" component="div" transitionName={this.state.slideTransition}>
                    <TransitionGroup key={currentSlide} transitionName="messageAppear" component="div" style={{height: 'calc(100% - 10px)'}} transitionLeave={false}>
                        {messages}
                    </TransitionGroup>
                </TransitionGroup>
                <button className="button-to-slide" onClick={this.props.toSlide}><img src="img/slideButton.svg" /></button>
                <textarea value={this.state.newMessage} onChange={this.handleMessage} />
                <button onClick={this.sendMessage}>Send</button>
            </div>
        );
    }
});