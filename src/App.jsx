import React from 'react'
import './App.css'
import Login from './Pages/Auth/Login'
import { UserContext } from './Context/UserContext'
import { BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import EditUser from './Pages/EditUserPage/EditUser'
import { Toaster } from 'react-hot-toast';
import { ExportToCsv } from 'export-to-csv';
import axios from 'axios'

const App = () => {
  const { user, setUser } = React.useContext(UserContext)

  const handleLogout = ()=>{
    localStorage.removeItem('user');
    setUser(null)
  }

  const handleDownloadCsv = async ()=>{
    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'My Awesome CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
   
  const csvExporter = new ExportToCsv(options);
   
  const {data}=await axios.get('https://cedar-chemist-350213.de.r.appspot.com/api/images')
  console.log(data)
  csvExporter.generateCsv(data);
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
        {user && <div style={{marginLeft:'1rem'}} className="flex-none">
          <button className="btn" onClick={handleDownloadCsv}>
            Download as CSV
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