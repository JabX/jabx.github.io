var React = require('react/addons');
var ReactFireMixin = require('reactfire');
var Swipe = require('react-swipe');

var Firebase = require('firebase');

var TopBar = require('./top-bar.jsx');
var SlidePage = require('./slide-page.jsx');
var ChatPage = require('./chat-page.jsx');

var App = React.createClass({
    mixins: [ReactFireMixin],

    getInitialState: function() {
        return {
            slides: [],
            currentSlide: 1,
            user: "",
            userBox: "",
            password: ""
        };
    },

    changeSlide: function(slide) {
        this.setState({ currentSlide: slide });
    },

    toChat: function() {
        this.refs.carousel.next();
    },

    toSlide: function() {
        this.refs.carousel.prev();
    },

    componentDidMount: function() {
        this.bindAsArray(new Firebase("https://brilliant-heat-7623.firebaseio.com/slides/"), "slides");
    },

    handleUserBox: function(e) {
        this.setState({userBox: e.target.value});
    },

    handlePassword: function(e) {
        this.setState({password: e.target.value});
    },

    logIn: function() {
        if(this.state.userBox != "" && this.state.password == "ilovehmidesign")
            this.setState({user: this.state.userBox});
    },

    render: function() {
        var render;
        if(this.state.user == "")
            render = (
                <div style={{margin: 'auto', marginTop: '10px', textAlign: 'center'}}>
                    <h3>Username</h3>
                    <input value={this.state.userBox} onChange={this.handleUserBox} />
                    <h3>Password</h3>
                    <input type="password" value={this.state.password} onChange={this.handlePassword} /><br />
                    <button onClick={this.logIn}>Log In</button>
                </div>
            );
        else if(this.state.slides.length == 0)
            render = <div>Loading...</div>;
        else
            render = (
                <div className="app">
                    <TopBar currentSlide={this.state.currentSlide} onClick={this.changeSlide} />
                    <Swipe ref="carousel" className="main" edgeFlick={false}>
                        <SlidePage slides={this.state.slides} currentSlide={this.state.currentSlide} toChat={this.toChat} />
                        <ChatPage slides={this.state.slides} currentSlide={this.state.currentSlide} user={this.state.user} toSlide={this.toSlide} />
                    </Swipe>
                </div>
            );
        return render;
    }
});

React.render(<App />, document.body);