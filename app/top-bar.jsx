var React = require('react/addons');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            currentSlide: 1
        };
    },

    render: function() {
        var id = this.props.currentSlide;
        return (
          <div className="top-bar">
              <button className="button-first" onClick={this.props.onClick.bind(null, 1)}>1</button>
              <button className="button-back" onClick={this.props.onClick.bind(null, Math.max(1, id - 1))} />
              <button className="button-middle">{this.props.currentSlide}</button>
              <button className="button-next" onClick={this.props.onClick.bind(null, Math.min(3, id + 1))}/>
              <button className="button-last" onClick={this.props.onClick.bind(null, 3)}>3</button>
          </div>
        );
    }
});