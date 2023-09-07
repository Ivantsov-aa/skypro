import React from "react";

export default class TouchEffect extends React.Component {

  state = {
    coords: [],
  };

  containerRef = null;

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.containerRef && !this.containerRef.offsetParent) {
      this.state.coords = [];
    }
  }

  handleTouch = (e) => {
    if (this.props.disabled) {
      return;
    }

    const rect = this.containerRef.getBoundingClientRect();
    const touchX = (e.touches && e.changedTouches.length > 0) ? e.changedTouches[0].clientX : e.clientX;
    const touchY = (e.touches && e.changedTouches.length > 0) ? e.changedTouches[0].clientY : e.clientY;

    this.setState({
      coords: [
        ...this.state.coords,
        {
          id: Date.now(),
          x: touchX - rect.left,
          y: touchY - rect.top,
          size: rect.width * 0.1,
        },
      ].slice(-3),
    });
  };

  handleClick = (e) => {
    this.props.onClick && this.props.onClick(e);
  };

  renderEffect = (item) => {
    return <div className="touch-effect__item"
      key={item.id}
      dark={this.props.dark}
      style={{
        left: item.x,
        top: item.y,
        width: item.size,
        height: item.size,
      }}
    />;
  };

  render() {
    const listeners = {
      onClick: this.handleTouch,
    };

    return <div
      {...listeners}
      ref={(ref) => this.containerRef = ref}
      className={"touch-effect__container touch-effect " + (this.props.className || "")}
      children={<React.Fragment>
        {this.props.children}
        {this.state.coords.map(this.renderEffect)}
      </React.Fragment>}
    />;
  }
}
