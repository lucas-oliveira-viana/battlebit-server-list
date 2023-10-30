import React, { useEffect } from 'react';
import { TFilterConfig } from '../../common/types';
import Button from '../atoms/Button';
import Select from '../atoms/Select';
import Input from '../atoms/Input';

type Props = {
  filters: { [key: string]: string };
  fields: TFilterConfig[];
  setFilters: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string;
    }>
  >;
};

function Filters({ filters, fields, setFilters }: Props) {
  function handleChange(
    field: string,
    event?: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) {
    setFilters((curr) => {
      const newFilters = !event
        ? { [field]: '' }
        : {
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
    <div>
      {fields && fields.length && (
        <div className="flex flex-wrap gap-2 items-end">
          {fields.map((field) => {
            const value = filters && filters[field.name] ? filters[field.name] : '';

            return (
              <div key={field.name} className="flex flex-col gap-2 items-start">
                <label className="text-white">{field.label}</label>
                {field.type === 'Select' ? (
                  <Select
                    value={value}
                    name={field.name}
                    options={field.options}
                    handleChange={handleChange}
                  />
                ) : (
                  <Input value={value} name={field.name} handleChange={handleChange} />
                )}
              </div>
            );
          })}
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
