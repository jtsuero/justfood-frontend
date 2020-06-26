import React from 'react';

function SearchDistanceButton({miles, onClick, active}) {
  let cls = 'search-distance-button';
  if (active) {
    cls += ' active';
  }
  if (miles === 1) {
    return (
      <div className={cls} onClick={onClick}>
        {miles} mile
      </div>
    );
  } else {
    return (
      <div className={cls} onClick={onClick}>
        {miles} miles
      </div>
    );
  }
}

export default SearchDistanceButton;
