import React from 'react';

function SearchDistanceButton({miles, onClick, active}) {
  let cls = 'search-distance-button';
  if (active) {
    cls += ' active';
  }
  return (
    <div className={cls} onClick={onClick}>
      {miles} miles
    </div>
  );
}

export default SearchDistanceButton;
