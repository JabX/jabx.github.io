var React = require('react/addons');
var TransitionGroup = React.addons.CSSTransitionGroup;

var Slides = require('./slides');

var Message = React.createClass({
    mixins:[React.addons.PureRenderMixin],

    render: function() {
        var sender = this.props.message.sender;
        var date = this.props.message.time.toLocaleString('en-US');
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
        Slides.Actions.PostMessage(this.props.currentSlide - 1, this.state.newMessage);
        this.setState({newMessage: ""});
    },

    render: function() {
        var currentSlide = this.props.currentSlide - 1;
        var slides = this.props.slides;
        var slide = slides[currentSlide];

        var messages;
        if (slide.messages.length > 0)
            messages = slide.messages.map(function(message, i) {
                return <Message key={i} message={message} />;
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