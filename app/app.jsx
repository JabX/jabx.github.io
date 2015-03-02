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
            currentSlide: 1
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

    render: function() {
        var render;
        if(this.state.slides.length == 0)
            render = <div>Loading...</div>;
        else
            render = (
                <div className="app">
                    <TopBar currentSlide={this.state.currentSlide} onClick={this.changeSlide} />
                    <Swipe ref="carousel" className="main" edgeFlick={false}>
                        <SlidePage slides={this.state.slides} currentSlide={this.state.currentSlide} toChat={this.toChat} />
                        <ChatPage slides={this.state.slides} currentSlide={this.state.currentSlide} toSlide={this.toSlide} />
                    </Swipe>
                </div>
            );
        return render;
    }
});

React.render(<App />, document.body);