import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BaseUrl } from '../utils/constant/constant';
import { useEffect } from 'react';
import { addRequestConnection, removeRequestConnection } from '../utils/store/RequestConnection.Slice';
import { removeConnection } from '../utils/store/acceptedconnectionSlice';

export default function RequestConnection() {

  const dispatch = useDispatch();
  const userRequest = useSelector((store) => store.requestConnection);
  console.log("User Request from Redux Store:", userRequest);
   const  reviewRequest = async (status, _id) => {
    console.log("Reviewing request with status:", status, "and ID:", _id);
      try {
          const res = await axios.post(BaseUrl + "/request/review/" + status + "/" + _id, {}, { withCredentials: true })
          dispatch(removeRequestConnection(_id))
          console.log("Review request response:", res.data);
      }
      catch (error) {
        console.error("Error in review request:", error)
      }

  }

  const fetchRequestConnection = async () => {
    try {
      const res = await axios.get(BaseUrl + "/user/request/received", { withCredentials: true });
      dispatch(addRequestConnection(res.data.data))
      dispatch(removeConnection());
    }
    catch (error) {
      console.error("Error fetching request connection data:", error)
    }
  }
  useEffect(() => {
    fetchRequestConnection();
  }, [])

  return (
    <div>

      <h1 className='text-2xl font-bold'>Request Connection</h1>

      <ul className="list bg-base-100 rounded-box shadow-md">

        {
          userRequest && userRequest.length > 0 ? (
            userRequest.map((request) => {
              const { id, firstname, lastname, age, skills, about, photoUrl } = request.fromUserId;
              return (
                <li key={id} className="list-row">
                  <div><img className="size-30 rounded-box" src={photoUrl} /></div>
                  <div>
                    <div className="text-xs uppercase font-semibold opacity-60">{firstname}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">{lastname}</div>
                     <div>
                    <p className="list-col-wrap text-xs">
                      {age}
                    </p></div>
                  <div><p className="list-col-wrap text-xs">
                    {skills}
                  </p></div>
                  <div><p className="list-col-wrap text-xs">
                    {about}
                  </p></div>
                  </div>
                 
                  <button className="btn btn-primary" onClick={() => reviewRequest("accepted", request._id)}>
                   Accept
                  </button>
                  <button className="btn btn-secondary" onClick={() => reviewRequest("rejected", request._id)}>
                   Reject
                  </button>
                </li>
              )
            })
          ) : (
            <p>No connection requests found.</p>
          )
        }

      </ul>

    </div>
  )
}
