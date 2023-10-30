import React from 'react';
import { TFilterConfigOptions, TInputProps } from '../../common/types';

type SelectProps = TInputProps & {
  options: TFilterConfigOptions[];
};

function Select({ value, name, options, handleChange }: SelectProps) {
  return (
    <select
      className={`${COMMON_INPUT_STYLES} border-r-8 border-transparent cursor-pointer`}
      onChange={(e) => handleChange(name, e)}
      value={value}
    >
      <option className="text-black" value="">
        None
      </option>
      {options.map((option) => (
        <option className="text-black" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
