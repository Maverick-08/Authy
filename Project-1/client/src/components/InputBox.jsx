import React from "react";

export default function InputBox({
  type,
  style,
  placeholder,
  onChange,
  value,
}) {
  return (
    <div>
      <input
        type={type}
        className={`${style}`}
        placeholder={placeholder}
        onChange={onChange ?? null}
        value={value ?? ""}
      />
    </div>
  );
}
