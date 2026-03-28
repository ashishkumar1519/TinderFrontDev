import axios from 'axios'
import React, { useEffect } from 'react'
import { BaseUrl } from '../utils/constant/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/store/acceptedconnectionSlice';

function Connection() {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);
    const fetchConnections = async () => {

        try {
            const res = await axios.get(BaseUrl + "/user/connection", { withCredentials: true });
            dispatch(addConnection(res.data.data))
console.log("Connections fetched successfully:", res.data.data);            
        }
        catch (error) {
            console.error("Error fetching connections:", error)
        }

    }
    useEffect(() => {
        fetchConnections();
    }, [])

    if (!connections) {
        return <p>Loading connections...</p>
    }
    if (connections.length === 0) {
        return <p>You have no connections yet.</p>
    }
    return (
        <div className='container mx-auto p-4 flex flex-col items-center'>
            <h1 className='text-2xl font-bold'>Your Connections</h1>

            <div className='flex flex-col w-1/2'>
                <ul className="list bg-base-300 mt-3 rounded-box shadow-lg">
                    {connections.map((connection) => (
                              <li className="list-row">
                        <div><img className="size-20 rounded-box" src={connection.photoUrl} /></div>
                        <div>
               
                            <div className="text-xs uppercase font-semibold opacity-60">{connection.firstname} {connection.lastname}</div>
                            <div className="text-xs mt-2 font-semibold opacity-60">{connection.about}</div>
                            <div className="text-xs mt-2 font-semibold opacity-60">{connection.skills}</div>
                        </div>
                      
                    </li>
                    ))}                   
                </ul>
            </div>

        </div>
    )
}

export default Connection