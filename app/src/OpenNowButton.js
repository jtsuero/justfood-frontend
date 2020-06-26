import React, {Component} from 'react';

class OpenNowButton extends Component {
  render() {
    let cls = 'search-open-now';
    if (this.props.openNow) {
      cls += ' active';
    }
    return (
      <div
        className={cls}
        onClick={() => {
          this.props.handleOpenNowChange(!this.props.openNow);
        }}
      >
        Open Now
      </div>
    );
  }
}

export default OpenNowButton;
