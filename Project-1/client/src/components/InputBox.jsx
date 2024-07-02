import React from "react";

const InputBox = ({
  containerStyle,
  titleStyle,
  title,
  type,
  placeholder,
  handleTextChange,
  value,
  inputStyle
}) => {
  return (
    <div className={containerStyle}>
      <p className={titleStyle}>{title}</p>
      <input type={type} value={value} className={inputStyle} placeholder={placeholder} onChange={e => handleTextChange(e.target.value)} />
    </div>
  );
};

export default InputBox;
