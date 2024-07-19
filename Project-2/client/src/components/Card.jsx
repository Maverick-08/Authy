import React from 'react'

const Card = ({children, containerStyle}) => {
  return (
    <div className={`bg-white shadow-md ${containerStyle}`}>
      {children}
    </div>
  )
}

export default Card
