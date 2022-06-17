import React from 'react'
import axios from 'axios'
import { UserContext } from '../../Context/UserContext'
import { useHistory } from 'react-router-dom'
import toast from 'react-hot-toast'
import Popup from 'reactjs-popup';
const Dashboard = () => {
  const { user, setUser } = React.useContext(UserContext)
  const history = useHistory()
  const [allusers, setAllUsers] = React.useState([])

  React.useEffect(() => {
    const fetchUsers = async ()=>{
      const {data} = await axios.get('https://scalantformapi-dishant5570-gmailcom-scalant.vercel.app/api/images')
      setAllUsers(data)
    } 
    fetchUsers()
  }, [])

  const handleDelete = async (id)=>{
    const res = await axios.delete(`https://scalantformapi-dishant5570-gmailcom-scalant.vercel.app/api/user/${id}`)
    const {deletedUser} = res.data

    const {data} = await axios.get('https://scalantformapi-dishant5570-gmailcom-scalant.vercel.app/api/images')
    setAllUsers(data)
    toast.success(`Removed user ${deletedUser.name} Successfully!`)
  }

  return (
    <div className='relative'>
      <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Domain</th>
        <th>isTeamMember</th>
        <th />
        <th/>
      </tr>
    </thead>
    <tbody>
      {allusers.map(u=>{
        return <tr key={u._id}>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-circle w-12 h-12">
                <img
                  src={u.photo}
                  alt={u.name}
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{u.name}</div>
              <div className="text-sm opacity-50">{u.domain}</div>
            </div>
          </div>
        </td>
        <td>
          {u.domain}
          <br />
        </td>
        <td>{u.isTeamMember ? 'True' : 'False'}</td>
        <th>
          <button className="btn btn-ghost btn-xs" onClick={()=> history.push(`/edituser/${u._id}`)}>Edit User</button>
        </th>
        <th>
          <Popup trigger={<button  className="btn btn-ghost btn-xs">Remove</button>} nested>
            <div style={{backgroundColor:'black', padding:'1rem', borderRadius:'20px', display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', gap:'0.5rem'}}>Are you sure you want to remove {u.name.split(' ')[0].toUpperCase()}? 
            <button className="btn btn-ghost btn-block" style={{backgroundColor:'#fff', color:'red', fontWeight:'600'}} onClick={()=>handleDelete(u._id)}>Yes</button>
            </div>
          </Popup>
        </th>
      </tr>
      })}
    </tbody>
    {/* foot */}
    <tfoot>
      <tr>
        <th />
        <th>Name</th>
        <th>Domain</th>
        <th>isTeamMember</th>
        <th />
        <th/>
      </tr>
    </tfoot>
  </table>
</div>

    </div>
  )
}

export default Dashboard