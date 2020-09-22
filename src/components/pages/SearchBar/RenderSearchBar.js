import React from "react";
import { AutoComplete } from "antd";

export default function RenderSearchBar({
  searchTerm,
  options,
  onChange,
  onSelect
}) {
  return (
    <div className="search-bar">
      <AutoComplete
        value={searchTerm}
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onChange={onChange}
        placeholder="Enter City.."
      />
    </div>
  );
}