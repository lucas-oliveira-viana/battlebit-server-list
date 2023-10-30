import React from 'react';
import { TInputProps } from '../../common/types';
import { COMMON_INPUT_STYLES } from '../../common/constants';

export default function Input({ value, name, handleChange }: TInputProps) {
  return (
    <input
      value={value}
      type="text"
      className={COMMON_INPUT_STYLES}
      onChange={(e) => {
        handleChange(name, e);
      }}
    />
  );
}
