import React from 'react';

type Props = {
  fields: string[];
  setFilters: (filters: { [key: string]: any }) => void;
};

function Filters({ fields, setFilters }: Props) {
  function handleChange(field: string, event: React.ChangeEvent<HTMLInputElement>) {
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
          <div key={field} className="flex flex-col items-start">
            <label className="text-white">{field}</label>
            <input
              type="text"
              className="p-2 rounded-sm"
              onChange={(e) => {
                handleChange(field, e);
              }}
            />
          </div>
        ))}
    </div>
  );
}

export default Filters;
