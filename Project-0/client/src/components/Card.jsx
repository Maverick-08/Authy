import React from 'react'

export default function Card({children,style}) {
  return (
    <div className={`bg-white shadow-md rounded-xl ${style}`}>
      {children}
    </div>
  )
}
