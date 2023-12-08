import React, { useContext, useEffect, useState } from 'react'
import CompContext from '../context/compt/compcontext';
import { useHistory, useParams } from 'react-router-dom';
import Navbar from './navbar';
import profilePic from '../img/profile-pic.png'
import Preview from './preview';
const Users = () => {
    const context = useContext(CompContext)
    const { host, usercomp, getusersCompes } = context;
    const { username } = useParams();
    const history = useHistory();
    const [userinfo, setUserinfo] = useState([])

    //fetch user by it's username 
    const FetchUsers = async (username) => {
        const response = await fetch(`${host}/api/auth/user/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const userdata = await response.json()
        getusersCompes(userdata._id);
        setUserinfo(userdata);
    }
    function handleComponentClick(uniqueName) {
        history.push(`/components/${uniqueName}`);
    }
    useEffect(() => {
        FetchUsers(username)
    }, [])
    // useEffect(() => {
    //     getCompes(userinfo.userId);
    // }, [userinfo])
    return (
        <>
            <Navbar />
            <div className='user-container'>
                <div className="sidenavbar">
                </div>
                <div className="user">
                    <img src={profilePic} />
                    <div className="user-info">
                        <h4 style={{ textTransform: 'capitalize' }}>{userinfo.username}</h4>
                    </div>
                </div>

                <div className="profile-card">
                    {
                        usercomp.map((usercomp) => {
                            return (
                                <div className="card" style={{ backgroundColor: usercomp.theme ? '#e8e8e8' : '#212121' }} key={usercomp._id}>
                                    <p style={{ color: usercomp.theme ? '#000' : '#fff', textTransform: 'capitalize', position: 'absolute', top: '10px', left: '10px' }}>{usercomp.type}</p>
                                    <Preview htmlCode={usercomp.html} cssCode={usercomp.css} />
                                    <div className='codelink'>
                                        <button className='linkToCode' onClick={() => handleComponentClick(usercomp.uniqueName)}><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"></path></svg> Code</span></button>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </>
    )
}

export default Users;