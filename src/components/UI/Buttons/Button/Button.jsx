import React from 'react';
import "./Button.css";

function Button( props ) {
  console.log(props.name);
  return (
    <div className='btn normal-button '> {props.name}</div>
  )
}

export default Button