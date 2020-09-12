import React from 'react';
import './styles.css';

function Link(props) {
  return (
    <div className="Link">
      <header className="Link">
      <a href='#'>{props.text}</a>
      </header>
    </div>
  );
}

export default Link;