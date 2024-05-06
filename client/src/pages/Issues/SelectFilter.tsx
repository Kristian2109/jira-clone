import { ChangeEvent, FC } from "react";

const SelectFilter: FC<{
  onChangeFilter: (event: ChangeEvent<HTMLSelectElement>) => void;
  columns: any[];
  additionalFilterOptions?: { value: number; text: string }[];
  label: string;
  name: string;
}> = ({ onChangeFilter, columns, label, name, additionalFilterOptions }) => {
  return (
    <div className="col-auto small-font">
      <label htmlFor={name}>{label}</label>
      <select
        className="form-select select-issue-type"
        name={name}
        onChange={onChangeFilter}
        id={name}
      >
        <option value={0}>No Filter</option>
        {additionalFilterOptions &&
          additionalFilterOptions.map((option) => {
            return (
              <option value={option.value} key={option.value}>
                {option.text}
              </option>
            );
          })}
        {columns.map((column) => {
          return (
            <option key={column.id} value={column.id}>
              {column.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectFilter;
