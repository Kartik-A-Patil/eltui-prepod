import { React, useContext, useEffect, useState } from 'react'
import compcontext from '../context/compt/compcontext';
import Preview from './preview.js'
import { useHistory } from 'react-router-dom';
import dltImg from '../img/delete.png';
import profilePic from '../img/profile-pic.png'
import { Link } from "react-router-dom";

const User = () => {
  const context = useContext(compcontext)
  const { host, userinfo, deleteComp ,profilecomp,setprofilecomp} = context;
  const history = useHistory();
  const handleComponentClick = (uniqueName) => {
    history.push(`/components/${uniqueName}`);
  };
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    history.push('/');

  }
  useEffect(() => {
    const getCompes = async () => {
      const response = await fetch(`${host}/api/components/userComp`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('auth-token')
        }
      });
      const json = await response.json()
      setprofilecomp(json)
    }
    getCompes();
  }, [])
  const getTotalComponents = () => {
    return profilecomp.length;
  }

  const getComponentCountByType = (type) => {
    return profilecomp.filter((c) => c.type === type).length;
  }

  const getComponentPercentByType = (type) => {
    const totalCount = getTotalComponents();
    const count = getComponentCountByType(type);
    return totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
  }

  return (
    <div className='user-container'>
      <div className="sidenavbar">
      </div>
      <div className="user">
        <img src={profilePic} />
        <div className="user-info">
          <h4 style={{ textTransform: 'capitalize' }}> {userinfo.username}</h4>
          <h5>{userinfo.email}</h5>
          <div className="user-btn">
            <Link className="cta" to='/editor'>
              <button>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg> Create
                </span>
              </button>
            </Link>
            <button onClick={logout}>
              <span>
                <svg style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" fill="white"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Logout
              </span>
            </button>
            <button >
              <span>
                Edit profile
              </span>
            </button>
          </div>
        </div>
        <div className="skill-card">
          <div className="header-title">
            <span>  My Components</span>
            <span>Total Posts : &nbsp;<span style={{fontSize:'22px'}}>{profilecomp.length}</span></span>

          </div>
          <div className="body-skill">
            {profilecomp.map((c) => c.type).filter((v, i, a) => a.indexOf(v) === i).map((type) => (
              <div className="skill" key={type}>
                <div className="skill-name">{type + 's'}</div>
                <div className="skill-level">
                  <div className="skill-percent" style={{ width: `${getComponentPercentByType(type)}%` }}></div>
                </div>
                <div className="skill-percent-number">{getComponentPercentByType(type)}%</div>
              </div>
             
            ))}
          </div>
        </div>

      </div>

      <div className="profile-card">
        {
          profilecomp ?
          profilecomp.map((profilecomp) => {
              return (
                <div className="card" style={{ backgroundColor: profilecomp.theme ? '#e8e8e8' : '#212121' }} key={profilecomp._id}>
                  <p style={{ color: profilecomp.theme ? '#000' : '#fff', textTransform: 'capitalize', position: 'absolute', top: '10px', left: '10px' }}>{profilecomp.type}</p>
                  <Preview htmlCode={profilecomp.html} cssCode={profilecomp.css} />
                  <div className='codelink'>
                    <button className='linkToCode' onClick={() => handleComponentClick(profilecomp.uniqueName)}><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"></path></svg> Code</span></button>
                  </div>
                  <div className="dlt-comp">
                    <span class="d-inline-block" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Disabled popover">
                      <button className='dlt-btn' data-bs-toggle="Delete" title="Delete" onClick={() => { deleteComp(profilecomp._id) }}><img src={dltImg} /></button>
                    </span>
                  </div>
                </div>
              )
            })
            :
            <p className='text-white'>Seems like you haven't made any posts yet. Click on create button to create a new post and show the world your unique design</p>}
      </div>
    </div>
  )
}

export default User;