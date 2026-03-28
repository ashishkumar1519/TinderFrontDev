import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BaseUrl } from '../utils/constant/constant';
import { addFeed } from '../utils/store/feed.slice';
import axios from 'axios';
import Card from '../components/card';
function Feed() {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

 

  const fetchFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BaseUrl + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data))
    }

    catch (error) {
      console.error("Error fetching feed data:", error)
    }
  }

  useEffect(() => {
    if(!feed){
fetchFeed();
    }
  }, [])  


  if(!feed) return (
    <div className='flex h-full justify-center items-center gap-4 '>
      <h1 className='text-2xl font-bold'>Loading...</h1>
    </div>
  );

  if(feed.length === 0){
    return (
      <div className='flex h-full justify-center items-center gap-4 '>
      <h1 className='text-2xl font-bold'>No more users to show</h1>
      </div>
    )
  }

  return (
    <div className='flex h-full justify-center items-center gap-4 '>
   <Card userInfo={feed[0]} profileCard={false} />
    </div>
  )
}

export default Feed