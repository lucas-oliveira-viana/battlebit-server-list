import React, { useEffect } from 'react';
import { TFilterConfig, TFilterConfigOptions } from '../utils/types';
import Button from './Button';

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

type SelectProps = InputProps & {
  options: TFilterConfigOptions[];
};

function Input({ value, name, handleChange }: InputProps) {
  return (
    <input
      value={value}
      type="text"
      className="text-lg px-4 h-12 font-bold text-zinc-300 bg-semi-transparent rounded-md"
      onChange={(e) => {
        handleChange(name, e);
      }}
    />
  );
}

function Select({ value, name, options, handleChange }: SelectProps) {
  return (
    <select
      className="text-lg px-4 h-12 font-bold text-zinc-300 bg-semi-transparent rounded-md border-r-8 border-transparent cursor-pointer"
      onChange={(e) => handleChange(name, e)}
      value={value}
    >
      <option className="text-black" value="">None</option>
      {options.map((option) => (
        <option className="text-black" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function Filters({ filters, fields, setFilters }: Props) {
  function handleChange(
    field: string,
    event?: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) {
    setFilters((curr: any) => {
      const newFilters = !event
        ? { [field]: '' }
        : {
            ...curr,
            [field]: event.target.value,
          };

      setFilters(newFilters);

      window.localStorage.setItem('filters', JSON.stringify(newFilters));
    });
  }

  useEffect(() => {
    const cachedFilters = JSON.parse(window.localStorage.getItem('filters'));

    if (cachedFilters) {
      setFilters(cachedFilters);
    }
  }, []);

  return (
    <div>
      {fields && fields.length && (
        <div className="flex flex-wrap gap-2 items-end">
          {fields.map((field) => (
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
          <Button
            onClick={() => {
              handleChange('Name');
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}

export default Filters;
