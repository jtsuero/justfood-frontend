import React from 'react';

function SearchDistanceButton({miles, onClick, active, source}) {
  let cls;
  if (source === 'mobile') {
    cls = 'mobile-search-distance-button';
  } else {
    cls = 'search-distance-button';
  }
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
