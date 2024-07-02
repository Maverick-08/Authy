import React from 'react'

const CustomButton = ({title, textStyle, containerStyle, handleClick}) => {
  return (
    <div className={`${containerStyle}`} onClick={handleClick}>
      <p className={`text-2xl font-semibold ${textStyle}`}>{title}</p>
    </div>
  )
}

export default CustomButton
