import React from 'react'

const Card = ({children, style}) => {
  return (
    <div className={`bg-white shadow-xl shadow-slate-300 dark:shadow-sky-400 rounded-xl flex flex-col ${style}`}>
      {children}
    </div>
  )
}


export default Card
