import React, { useEffect } from 'react';
import { TFilterConfig, TFilterConfigOptions } from '../utils/types';

type Props = {
  filters: any;
  fields: TFilterConfig[];
  setFilters: (filters: { [key: string]: any }) => void;
};

type InputProps = {
  value: any;
  name: string;
  handleChange: (
    name: string,
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => void;
};

type SelectProps = {
  value: any;
  name: string;
  options: TFilterConfigOptions[];
  handleChange: (
    name: string,
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => void;
};

function Input({ value, name, handleChange }: InputProps) {
  return (
    <input
      value={value}
      type="text"
      className="px-2 h-8 rounded-sm"
      onChange={(e) => {
        handleChange(name, e);
      }}
    />
  );
}

function Select({ value, name, options, handleChange }: SelectProps) {
  return (
    <select className="px-2 h-8 rounded-sm border-r-8 border-transparent cursor-pointer" onChange={(e) => handleChange(name, e)} value={value}>
      <option value="">None</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function Filters({ filters, fields, setFilters }: Props) {
  function handleChange(
    field: string,
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) {
    setFilters((curr: any) => {
      const newFilters = {
        ...curr,
        [field]: event.target.value,
      };

      window.localStorage.setItem('filters', JSON.stringify(newFilters));

      return newFilters;
    });
  }

  useEffect(() => {
    const cachedFilters = JSON.parse(window.localStorage.getItem('filters'));

    if (cachedFilters) {
      setFilters(cachedFilters);
    }
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      {fields &&
        fields.length &&
        fields.map((field) => (
          <div key={field.name} className="flex flex-col items-start">
            <label className="text-white">{field.label}</label>
            {field.type === 'Select' ? (
              <Select
                value={filters && filters[field.name] ? filters[field.name] : ''}
                name={field.name}
                options={field.options}
                handleChange={handleChange}
              />
            ) : (
              <Input
                value={filters && filters[field.name] ? filters[field.name] : ''}
                name={field.name}
                handleChange={handleChange}
              />
            )}
          </div>
        ))}
    </div>
  );
}

export default Filters;
