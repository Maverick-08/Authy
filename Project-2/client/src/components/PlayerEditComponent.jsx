import React from 'react'
import { useRecoilValue } from 'recoil'

const PlayerEditComponent = ({user}) => {
    const player = useRecoilValue()
  return (
    <div className='w-full h-[50vh] pt-32 border-2 border-red-500'>
      <p className="text-4xl font-normal text-gray-400">Edit Player Data </p>
    </div>
  )
}

export default PlayerEditComponent
