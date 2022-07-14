import React from 'react'
import './App.css'
import Login from './Pages/Auth/Login'
import { UserContext } from './Context/UserContext'
import { BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import EditUser from './Pages/EditUserPage/EditUser'
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { user, setUser } = React.useContext(UserContext)

  const handleLogout = ()=>{
    localStorage.removeItem('user');
    setUser(null)
  }

  return (
    <Router>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" to="/">ScalantAdmin</Link>
        </div>
        {user && <div className="flex-none">
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>}
      </div>

    <div>
      <Switch>
      <Route path='/' exact>
        {user && <Dashboard/>}
        {user===null && <Redirect to='/login'/>}
      </Route>
      <Route path='/edituser/:id'>
        {user && <EditUser/>}
        {user===null && <Redirect to='/login'/>}
      </Route>
      <Route path='/login'>
        {user===null && <Login/>}
        {user && <Redirect to='/'/>}
      </Route>
      </Switch>
    </div>
    <Toaster />
    </Router>
  )
}

export default App