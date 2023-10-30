import React, { useEffect } from 'react';
import { TFilterConfig, TFilterConfigOptions } from '../../utils/types';
import Button from '../atoms/Button';
import Select from '../atoms/Select';
import Input from '../atoms/Input';

type Props = {
  filters: any;
  fields: TFilterConfig[];
  setFilters: (filters: { [key: string]: any }) => void;
};

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
