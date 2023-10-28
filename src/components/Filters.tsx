import React from 'react';
import { TFilterConfig, TFilterConfigOptions } from '../utils/types';

type Props = {
  fields: TFilterConfig[];
  setFilters: (filters: { [key: string]: any }) => void;
};

type InputProps = {
  name: string;
  handleChange: (name: string, event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
};

type SelectProps = {
  name: string;
  options: TFilterConfigOptions[];
  handleChange: (name: string, event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
};

function Input({ name, handleChange }: InputProps) {
  return (
    <input
      type="text"
      className="p-2 rounded-sm"
      onChange={(e) => {
        handleChange(name, e);
      }}
    />
  );
}

function Select({ name, options, handleChange }: SelectProps) {
  return (
    <select className="p-2 rounded-sm" onChange={(e) => handleChange(name, e)}>
      <option value="">None</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}

function Filters({ fields, setFilters }: Props) {
  function handleChange(field: string, event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    setFilters((curr: any) => ({
      ...curr,
      [field]: event.target.value,
    }));
  }

  return (
    <div className="flex flex-wrap gap-2">
      {fields &&
        fields.length &&
        fields.map((field) => (
          <div key={field.name} className="flex flex-col items-start">
            <label className="text-white">{field.label}</label>
            {field.type === 'Select' ? (
              <Select
                name={field.name}
                options={field.options}
                handleChange={handleChange}
              />
            ) : (
              <Input name={field.name} handleChange={handleChange} />
            )}
          </div>
        ))}
    </div>
  );
}

export default Filters;
