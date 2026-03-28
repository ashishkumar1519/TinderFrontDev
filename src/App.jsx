import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './pages/Login.jsx'
import Body from './components/body.jsx'
import Profile from './pages/Profile.jsx'
import { Provider } from "react-redux"
import { store } from "./utils/store/app.store.js"
import Feed from './pages/feed.jsx'
import Connection from './pages/AcceptedConnection.jsx'
import RequestConnection from './pages/RequestConnection.jsx'
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/connection" element={<Connection />} />
            <Route path="/request-connection" element={<RequestConnection />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </Provider>
  )
}

export default App