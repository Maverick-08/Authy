import React from "react";

const PlayerDetails = ({
  title,
  id,
  value,
  placeholder,
  inputBoxStyle,
  onTextChange,
}) => {
  return (
    <div className="flex flex-col gap-1 items-center">
      <p className="text-lg font-light text-gray-500">{title}</p>
      <input
        type="text"
        id={id}
        className={`${inputBoxStyle} border-2 border-gray-200 active:border-gray-400 rounded-md py-1 text-center`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onTextChange(e.target.value)}
      />
    </div>
  );
};

export default PlayerDetails;
