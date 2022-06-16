import React from 'react'
import {useParams} from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
const EditUser = () => {
  const [member, setMember] = React.useState({})
  const [btnloading, setBtnloading] = React.useState(false)
  const {id} = useParams()
  const [formData, setFormData] = React.useState({
    name:'',
    email:'',
    domain:'',
    linkedin:'',
    github:'',
    twitter:'',
    instagram:'',
    isTeamMember: undefined
  })
  
  React.useEffect(()=>{
    const fetchUsers = async ()=>{
      const {data} = await axios.get(`http://localhost:3001/api/user/${id}`)
      setMember(data.user)
      setFormData({
        name:'',
        email:'',
        domain:'',
        linkedin:'',
        github:'',
        twitter:'',
        instagram:'',
        isTeamMember: data.user.isTeamMember
      })
    } 
    fetchUsers()
    
  },[])

  const handleSubmit = async ()=>{
    setBtnloading(true)
    const finalFormData = {
      name: formData.name===''? member.name:formData.name,
      email:formData.email===''? member.email:formData.email,
      domain:formData.domain===''? member.domain:formData.domain,
      linkedin:formData.linkedin===''? member.linkedin:formData.linkedin,
      github:formData.github===''? member.github:formData.github,
      twitter:formData.twitter===''? member.twitter:formData.twitter,
      instagram:formData.instagram===''? member.instagram:formData.instagram,
      isTeamMember: formData.isTeamMember===undefined? member.isTeamMember:formData.isTeamMember
    }

   const res = await axios.put(`https://scalantformapi-dishant5570-gmailcom-scalant.vercel.app/api/user/${id}`, finalFormData)
   console.log(res)

   const {data} = await axios.get(`https://scalantformapi-dishant5570-gmailcom-scalant.vercel.app/api/user/${id}`)
    setMember(data.user)

    setFormData({
      name:'',
      email:'',
      domain:'',
      linkedin:'',
      github:'',
      twitter:'',
      instagram:'',
      isTeamMember: data.user.isTeamMember
    })

    setBtnloading(false)
    toast.success('Updated Successfully!')
  }
 
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {member=={} && <h1>Loading...</h1>}
      {member!={} && 
       <div style={{width:'80vw', display: 'flex', flexDirection:'column', gap:'1rem'}}>
        <div className="form-control">
          <label className="input-group input-group-vertical">
            <span>Name</span>
            <input
              type="text"
              placeholder={member.name}
              className="input input-bordered"
              value={formData.name}
              onChange={e=>setFormData({...formData, name: e.target.value})}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group input-group-vertical">
            <span>Email</span>
            <input
              type="text"
              placeholder={member.email}
              className="input input-bordered"
              value={formData.email}
              onChange={e=>setFormData({...formData, email: e.target.value})}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group input-group-vertical">
            <span>Domain</span>
            <input
              type="text"
              placeholder={member.domain}
              className="input input-bordered"
              value={formData.domain}
              onChange={e=>setFormData({...formData, domain: e.target.value})}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group input-group-vertical">
            <span>LinkedIn</span>
            <input
              type="text"
              placeholder={member.linkedin}
              className="input input-bordered"
              value={formData.linkedin}
              onChange={e=>setFormData({...formData, linkedin: e.target.value})}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group input-group-vertical">
            <span>Github</span>
            <input
              type="text"
              placeholder={member.github}
              className="input input-bordered"
              value={formData.github}
              onChange={e=>setFormData({...formData, github: e.target.value})}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group input-group-vertical">
            <span>Twitter</span>
            <input
              type="text"
              placeholder={member.twitter}
              className="input input-bordered"
              value={formData.twitter}
              onChange={e=>setFormData({...formData, twitter: e.target.value})}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group input-group-vertical">
            <span>Instagram</span>
            <input
              type="text"
              placeholder={member.instagram}
              className="input input-bordered"
              value={formData.instagram}
              onChange={e=>setFormData({...formData, instagram: e.target.value})}
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text text-lg">isTeamMember</span>
            <input type="checkbox" checked={formData.isTeamMember} onChange={e=> {console.log(e.target.checked); setFormData({...formData, isTeamMember:e.target.checked})}} className="checkbox" />
          </label>
        </div>
       {!btnloading && <button className="btn btn-accent btn-block" onClick={handleSubmit}>Update User Data</button>}
        {btnloading && <button className="btn btn-accent btn-block btn-disabled loading">Please Wait...</button>}
       </div>
      }
    </div>
  )
}

export default EditUser