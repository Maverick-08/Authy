import React from 'react'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../state/userState'
import PlayerEditComponent from '../components/PlayerEditComponent'
import PlayerInfoComponent from '../components/PlayerInfoComponent'

const Stats = () => {
  const user = useRecoilValue(userAtom)
  return (
    <div className='w-full'>
     <PlayerEditComponent user={user}/>
     <PlayerInfoComponent user={user}/>
    </div>
  )
}

export default Stats
