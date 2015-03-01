var React = require('react/addons');
var TransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({
    mixins:[React.addons.PureRenderMixin],

    getInitialState: function() {
        return {
            slideTransition: "slideLeft"
        }
    },

    componentWillReceiveProps: function(nextProps) {
        if(nextProps.currentSlide > this.props.currentSlide)
            this.setState({slideTransition: "slideLeft"});
        else
            this.setState({slideTransition: "slideRight"});
    },

    render: function() {
        var currentSlide = this.props.currentSlide - 1;
        var slides = this.props.slides;
        var slide = slides[currentSlide];

        return (
            <TransitionGroup style={this.props.style} className="slide-container" component="div" transitionName={this.state.slideTransition}>
                <div key={currentSlide} className="slide">
                    <h2>{slide.title}</h2>
                    <img src={slide.picture} />
                    {slide.text.map(function(point, i) {
                        if(point[0] == " ")
                            return <h4 key={i}>- {point}</h4>;
                        else
                            return <h3 key={i}>- {point}</h3>;
                    })}
                </div>
                <button className="button-to-chat" onClick={this.props.toChat}><img src="img/chatButton.svg" /></button>
            </TransitionGroup>
        )
    }
});