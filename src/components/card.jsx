import React from 'react'
import { useDispatch } from 'react-redux';
import { BaseUrl } from '../utils/constant/constant';
import axios from 'axios';
import { removeUserFromFeed } from '../utils/store/feed.slice';
function Card({userInfo,profileCard = true}) {
  const {firstname,lastname ,photoUrl,gender,age ,_id} =userInfo;
  const dispatch = useDispatch();

  const handleUserRequest = async (status,id)=>{
      try{
          const res = await axios.post(BaseUrl + "/request/send/" + status + "/" + id, {}, { withCredentials: true })
          dispatch(removeUserFromFeed(id))
      }
      catch(error){
        console.error("Error in sending request:", error)
      }
  }


  return (
  <div className="card bg-base-300 w-96 shadow-lg">
  <figure>
    <img className='h-[200px]'
      src={photoUrl  }
      alt="Profile" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstname || "First Name"} {lastname || "Last Name"}</h2>
    <p>{age} years old</p>
    <p>{gender} </p>
   {
    !profileCard ?  <div className="card-actions justify-center"> 
      <button className="btn btn-primary" onClick={() => handleUserRequest("ignored", _id)}>ignore</button>
      <button className="btn btn-secondary" onClick={() => handleUserRequest("interested", _id)}>send Request</button>
    </div> : ''
   }
  </div>
</div>
  )
}

export default Card