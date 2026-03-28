import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice";
import FeedReducer from "./feed.slice";
import ConnectionReducer from "./acceptedconnectionSlice";
import RequestConnectionReducer from "./RequestConnection.Slice";
export const store = configureStore({
    reducer:{
        user: userReducer,
        feed: FeedReducer,
        connection: ConnectionReducer,
        requestConnection: RequestConnectionReducer
    }

})