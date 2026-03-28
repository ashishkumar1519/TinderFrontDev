import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router'
import Footer from './Footer'
import { BaseUrl } from '../utils/constant/constant'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/store/userSlice'

function Body() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
   const userReduxData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      if(userReduxData) return;
      const userData = await axios.get(BaseUrl + "/profile", { withCredentials: true });
      dispatch(addUser(userData.data))
    }

    catch (error) {
      if(error.status ===401){
        console.log("Unauthorized access - redirecting to login page");
      }
      navigate("/login");
        console.error("Error fetching user data:", error);
    }
  }
  useEffect(() => {
    if(!userReduxData) {
      fetchUser();
    }
  }, [])


  return (
    <div className="h-full flex flex-col w-full">
      <Navbar />
      {/* main */}
      <main className="flex-1 flex justify-center items-start pt-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body