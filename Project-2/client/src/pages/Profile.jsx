import React from 'react'
import Card from '../components/Card'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../state/userState'
import ProfileImage from '../assets/images/profile.jpg'

const Profile = () => {
  const user = useRecoilValue(userAtom)
  console.log(user)
  
  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
      <Card>
        <div>
          <img src={ProfileImage} alt="Profile" className='w-12 h-12'/>
          <p>{user.fullName}</p>
        </div>
        <div>
          <p>Username : <span>{user.username}</span></p>
          <p>Role : <span>{user.role}</span></p>
          <p>Create At : <span>{user.createdAt}</span></p>
          <p>Logged In : <span>{user.createdAt ? "Online" : "Offline"}</span></p>
          <p>Active Sessions : <span>{user.activeSessions}</span></p>
        </div>
        <div></div>
      </Card>
    </div>
  )
}

export default Profile
