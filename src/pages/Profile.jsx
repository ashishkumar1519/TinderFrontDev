import React from 'react'
import Editprofile from '../components/Editprofile'
import { useSelector } from 'react-redux'

function Profile() {
  const user = useSelector((store) => store.user);
  return (
    user && <Editprofile userInfo={user} />
  )
}

export default Profile