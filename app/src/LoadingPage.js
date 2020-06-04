import React, {Component} from 'react';
import loading from './loading.gif';

class LoadingPage extends Component {
  render() {
    return (
      <div className="food-page-loading-container">
        <img className="food-page-loading" src={loading} alt="none"></img>
      </div>
    );
  }
}

export default LoadingPage;
