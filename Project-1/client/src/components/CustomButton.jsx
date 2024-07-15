import React from "react";

const CustomButton = ({ title, textStyle, containerStyle, handleClick }) => {
  return (
    <div className={`${containerStyle}`} onClick={handleClick}>
      <p className={`text-2xl ${textStyle} hover:text-gray-200`}>
        {title}
      </p>
    </div>
  );
};

export default CustomButton;
