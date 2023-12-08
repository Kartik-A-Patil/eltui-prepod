import React, { useState, useContext, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import CompContext from '../context/compt/compcontext';
import { useLocation } from 'react-router-dom';
import Feedbackmodal from './feedbackmodal'
const Navbar = () => {
    const context = useContext(CompContext);
    const location = useLocation();
    const { userinfo, fetchuser, host } = context;
    const [buginfo, setbuginfo] = useState({ feedback: "", email: "" })
    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            fetchuser();
        }
    }, [])
    const reportbug = async () => {
        const response = await fetch(`${host}/api/auth/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ feedback: buginfo.feedback, email: buginfo.email })
        });
    console.log(response)
    }
    const onChange = (e) => {
        setbuginfo({ ...buginfo, [e.target.name]: e.target.value })
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-transperent text-white">
                <div className="container-fluid">
                    <Link className="navbar-brand" data-text="Awesome" to="/">
                        <span className="actual-text">&nbsp;EltUI&nbsp;</span>
                        <span className="hover-text" aria-hidden="true">&nbsp;EltUI&nbsp;</span>
                    </Link>
                    {!localStorage.getItem('auth-token')
                        ?
                        <Link className="Login-btn" to='/login'>
                            Sign In
                        </Link>
                        :
                        <Link className="btn btn-success" to='/Profile'>
                            <p className='username'>{userinfo.username}</p>
                        </Link>
                    }
                    <div className="offcanvas text-black offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header text-white">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">EltUI</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link aria-current="page" to="/comp/all" className={location.pathname === '/comp/all' ? 'disabled nav-link' : 'nav-link'}>
                                        <span className="hover-underline-animation" >Browse</span>
                                    </Link>
                                </li>
                                <li className="nav-item create-btn">
                                    {
                                        !localStorage.getItem('auth-token')
                                            ?
                                            <button type="button" className="nav-link" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                <span className="hover-underline-animation">create</span>
                                            </button>
                                            :
                                            <Link type="button" className="nav-link" to='/editor'>
                                                <span className="hover-underline-animation">create</span>
                                            </Link>
                                    }
                                </li>
                                <li className="nav-item">
                                    <button type="button" class="nav-link" data-bs-toggle="modal" data-bs-target="#reportbug" >
                                        <span className="hover-underline-animation">Report Bug</span>
                                    </button>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
                {/* <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Login</h1>
                                <button type="button" className="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                You need to sign in before you can create A Component
                                <Link className="btn btn-primary" to='/login'>login</Link>
                            </div>

                        </div>
                    </div>
                </div> */}
            </nav>
            {/* report bug  */}
            {/* <div class="modal fade" id="reportbug" aria-labelledby="bugreport1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Report Bugs /Feedback</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={reportbug}>
                                <div class="mb-3">
                                    <label for="bugreport" class="col-form-label">Report-Bug:</label>
                                    <textarea type="text" name='feedback' class="form-control" id="bugreport" placeholder='Type your Feedback / Report here' value={buginfo.feedback} onChange={onChange} required/>
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="col-form-label">Email:</label>
                                    <input type='email' name='email' class="form-control" id="email" placeholder='Enter your E-Mail here ' value={buginfo.email} onChange={onChange}required />
                                </div>
                                <button type="submit" class="btn btn-success" data-bs-dismiss="modal" aria-label="Close">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> */}
            <Feedbackmodal/>
        </>
    )
}

export default Navbar;
