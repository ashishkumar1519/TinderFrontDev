import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/store/userSlice'
import { useNavigate } from 'react-router'
import { BaseUrl } from '../utils/constant/constant'

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [errors, setErrors] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [isLoginForm, setIsLoginForm] = React.useState(true)

  const handleLogin = async () => {
    try {
      const res = await axios.post(BaseUrl + "/login", { email, password }, { withCredentials: true });
      dispatch(addUser(res.data))
      navigate('/feed');
    }
    catch (error) {
      setErrors(error?.response?.data || 'Something went wrong')
      console.error('Login failed:', error)
    }
  }

  const handleSignUp = async () => {
    try {
    const res=   await axios.post(BaseUrl + "/signup", {
        firstname: firstName,
        lastname: lastName,
        email,
        password,
      }, { withCredentials: true });
      dispatch(addUser(res.data.data))
      navigate('/profile');
      setErrors('')
    }
    catch (error) {
      setErrors(error?.response?.data || 'Something went wrong')
      console.error('Signup failed:', error)
    }
  }

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      {isLoginForm ? (
        <React.Fragment>
          <legend className="fieldset-legend 2xl:text-lg">Login</legend>

          <label className="label 2xl:text-lg">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="input" placeholder="Email" />

          <label className="label 2xl:text-lg">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="input" placeholder="Password" />

          <p className='text-red-500'>{errors}</p>

          <button onClick={handleLogin} className="btn btn-neutral mt-4">Login</button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <legend className="fieldset-legend 2xl:text-lg">Sign Up</legend>

          <label className="label 2xl:text-lg">First Name</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="input" placeholder="First Name" />

          <label className="label 2xl:text-lg">Last Name</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="input" placeholder="Last Name" />

          <label className="label 2xl:text-lg">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="input" placeholder="Email" />

          <label className="label 2xl:text-lg">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="input" placeholder="Password" />

          <p className='text-red-500'>{errors}</p>

          <button onClick={handleSignUp} className="btn btn-neutral mt-4">Sign Up</button>
        </React.Fragment>
      )}
      <p className="cursor-pointer mt-2 text-center underline" onClick={() => { setIsLoginForm(!isLoginForm); setErrors(''); }}>
        {isLoginForm ? 'New user? Sign Up' : 'Already have an account? Login'}
      </p>
    </fieldset>
  )
}

export default Login