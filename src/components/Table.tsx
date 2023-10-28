import React from 'react';

type Props = {
  data: {
    [key: string]: any;
  }[];
  columns: string[];
};

function Table({ data, columns }: Props) {
  return (
    <>
      {data && columns && data.length && columns.length ? (
        <table className="min-w-full bg-gray-800">
          <thead>
            <tr>
              {columns.map((column, index) => {
                const isFirstColumn = index === 0;
                const isLastColumn = index === columns.length - 1;
                return (
                  <th
                    className={`border-gray-300 p-4 ${!isFirstColumn ? 'border-l' : ''} ${
                      !isLastColumn ? 'border-r' : ''
                    }`}
                    key={index}
                  >
                    <span className="text-white">{column}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => {
                  const isFirstColumn = colIndex === 0;
                  const isLastColumn = colIndex === columns.length - 1;
                  return (
                    <td
                      className={`overflow-ellipsis overflow-hidden border-gray-300 p-2 text-center border-t ${
                        !isFirstColumn ? 'border-l' : ''
                      } ${!isLastColumn ? 'border-r' : ''}`}
                      key={colIndex}
                    >
                      <span className="text-white">{item[column]}</span>
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
