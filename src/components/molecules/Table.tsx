import React from 'react';

type Props = {
  data: {
    [key: string]: any;
  }[];
  columns: {
    label: string;
    value: string;
  }[];
};

function Table({ data, columns }: Props) {
  return (
    <>
      {data && columns && data.length && columns.length ? (
        <table className="min-w-full bg-zinc-700 bg-opacity-50">
          <thead>
            <tr>
              {columns.map((column, index) => {
                return (
                  <th
                    className={`border-gray-300 p-4`}
                    key={index}
                  >
                    <span className="text-white">{column.label}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => {
                  return (
                    <td
                      className={`overflow-ellipsis overflow-hidden border-zinc-900 p-2 text-center border-t`}
                      key={colIndex}
                    >
                      <span className="text-white">{item[column.value]}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <span className="text-white">No servers found.</span>
      )}
    </>
  );
}

export default Table;
