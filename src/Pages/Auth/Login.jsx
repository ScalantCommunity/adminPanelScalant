import React from 'react'
import { UserContext } from '../../Context/UserContext'
import axios from 'axios'

const Login = () => {
  const [allusers, setAllUsers] = React.useState([])
  const { user, setUser } = React.useContext(UserContext)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  React.useEffect(() => {
    const fetchUsers = async ()=>{
      const {data} = await axios.get('https://apiscalant.live/api/images')
      
      const users = data.map(u=> u.email)
      setAllUsers(users)
    } 
    fetchUsers()
  }, [])
  
  const handleLogin = (e)=>{
    e.preventDefault()
    if(allusers.includes(email)){
      if(password=== import.meta.env.VITE_ADMIN_KEY){
        localStorage.setItem('user', JSON.stringify({email, password}));
        setUser({email, password})
      }
    }
  }

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap:'0.5rem', fontSize: '16px'}}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Your Email</span>
        </label>
        <label className="input-group">
          <span>Email</span>
          <input
            type="email"
            placeholder="info@site.com"
            className="input input-bordered"
            value={email}
            onChange={e=>setEmail(e.target.value)}

          />
        </label>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <label className="input-group">
          <span>Pass</span>
          <input
            type="password"
            placeholder="******"
            className="input input-bordered"
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
        </label>
      </div>
      <button className="btn btn-primary mt-4 btn-wide" onClick={handleLogin}>Login</button>
      </div>

    </div>
  )
}

export default Login