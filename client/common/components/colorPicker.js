import React, { Component } from 'react';
import { ChromePicker } from 'react-color';


const ColorPicker = (props) => {
  return (
    <div>
      <div className="swatch--outer">
        <div className="swatch--inner"
             style={{background: `${props.color}`}}
             onClick={props.handleClick} />
      </div>
      {props.showPicker &&
        <ChromePicker color={props.color} onChange={props.handleColorChange} />
      }
    </div>
  );
}

export default ColorPicker;
