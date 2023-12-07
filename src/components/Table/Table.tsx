import classNames from "classnames";
import { ReactNode } from "react";

interface Props {
  header: ReactNode[];
  rows: ReactNode[][];
  onClick?: (i: any) => void;
}

function Table({ header, rows, onClick }: Props) {
  const header_element = header.map((e, i) => (
    <th
      key={i}
      className="border-t border-bordergray px-5 py-2 text-left font-primary text-xs font-medium text-graymiddle"
    >
      {e}
    </th>
  ));
  const rows_element = rows.map((r, i) => {
    return (
      <tr
        key={i}
        onClick={() => {
          if (onClick) onClick(r);
        }}
      >
        {r.map((d, j) => {
          return (
            <td
              key={String(i * j + j) + "i"}
              className={classNames(
                "cursor-pointer border-t border-bordergray px-5 py-3 text-left hover:opacity-90",
              )}
            >
              {d}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <div>
      <table className="w-full overflow-auto">
        <thead className="">
          {rows_element.length > 0 && (
            <tr className="text-sm text-darkgray">{header_element}</tr>
          )}
        </thead>
        <tbody>{rows_element}</tbody>
      </table>
    </div>
  );
}

export default Table;
