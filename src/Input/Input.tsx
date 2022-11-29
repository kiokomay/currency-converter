import React, { useState } from 'react';
import '../App.css';

interface NumberType { 
  value: string,
  adjustedValue?: (val: string) => void,
}

export const Input = ({ value, adjustedValue }: NumberType) => {
  const [val, setValue] = useState('');

  const validate = (val: string) => {
    if(!Number(val) && val !== "" && Number(val) !== 0) {
      return;
    }
    setValue(val);
    if(adjustedValue) adjustedValue(val);
  }

  return (
    <input
      className='input'
      placeholder='Type currency amount' 
      value={val} 
      onChange={e => validate(e.target.value)}
    />
  );
}