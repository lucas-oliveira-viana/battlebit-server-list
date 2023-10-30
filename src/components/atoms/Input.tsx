import React from 'react';
import { TInputProps } from '../../common/types';
import { COMMON_INPUT_STYLES } from '../../common/constants';

export default function Input({ value, name, placeholder, handleChange }: TInputProps) {
  return (
    <input
      value={value}
      type="text"
      placeholder={placeholder}
      className={COMMON_INPUT_STYLES}
      onChange={(e) => {
        handleChange(name, e);
      }}
    />
  );
}
