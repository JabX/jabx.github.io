var React = require('react/addons');
var Reflux = require('reflux');
var Swipe = require('react-swipe');

var TopBar = require('./top-bar.jsx');
var SlidePage = require('./slide-page.jsx');
var ChatPage = require('./chat-page.jsx');

var Slides = require('./slides');

var App = React.createClass({
    mixins: [Reflux.connect(Slides.Store, "slides")],

    getInitialState: function() {
        return {
            slides: Slides.Store.slides,
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

    render: function() {
        return (
            <div className="app">
                <TopBar currentSlide={this.state.currentSlide} onClick={this.changeSlide} />
                <Swipe ref="carousel" className="main" edgeFlick={false}>
                    <SlidePage slides={this.state.slides} currentSlide={this.state.currentSlide} toChat={this.toChat} />
                    <ChatPage slides={this.state.slides} currentSlide={this.state.currentSlide} toSlide={this.toSlide} />
                </Swipe>
            </div>
        );
    }
});

React.render(<App />, document.body);