import React, { useState, useContext } from 'react'
import '../css/login.css'
import { useHistory } from 'react-router-dom';
import compcontext from '../context/compt/compcontext';
import editimg from '../img/edit.svg'
import securelogo from '../img/fingerprint.gif'
import profilepic1 from '../img/profilepic/profilepic1.png'
import profilepic2 from '../img/profilepic/profilepic2.png'
import profilepic3 from '../img/profilepic/profilepic3.png'
import profilepic4 from '../img/profilepic/profilepic4.png'
import profilepic5 from '../img/profilepic/profilepic5.png'


function Login() {
    const context = useContext(compcontext)
    const { host } = context;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [alertColor, setAlertColor] = useState('');
    const [Alertmassage, setAlertmassage] = useState('')
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [ischecked, setischecked] = useState(false)
    const [active, setActive] = useState('')
    let history = useHistory();
    const signUp = () => {
        setActive("right-panel-active");
    }
    const signIn = () => {
        setActive("");
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    //create user
    const signUpSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: credentials.username, email: credentials.email, password: credentials.password, profilepic: currentImageIndex + 1 })
        });
        const json = await response.json()
        console.log(json);
        if (json.status === 'success') {
            // Save the auth token and redirect
            localStorage.setItem('auth-token', json.authtoken);
            history.push('/')
            setAlertColor(json.status);
            setAlertmassage('Thank you for joining Us')
            setTimeout(() => {
                setAlertColor('')
                setAlertmassage('')
            }, 2000);
            window.location.reload(true);
        }
        else {
            setAlertColor(json.status)
            setAlertmassage(json.error)
            setTimeout(() => {
                setAlertColor('')
                setAlertmassage('')
            }, 2000);
        }
    }
    //login with existance user
    const signInSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.status === 'success') {
            // Save the auth token and redirect
            localStorage.setItem('auth-token', json.authtoken);
            history.push('/')
            setAlertColor(json.status)
            setAlertmassage('LogIn Success')
            setTimeout(() => {
                setAlertColor('')
                setAlertmassage('')
            }, 2000);
            window.location.reload(true);
        }
        else {
            setAlertColor(json.status)
            setAlertmassage(json.error)
            setTimeout(() => {
                setAlertColor('')
                setAlertmassage('')
            }, 2000);
        }
    }
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // Array of image URLs
    const images = [
        profilepic1,
        profilepic2,
        profilepic3,
        profilepic4,
        profilepic5
    ];

    // Function to handle next button click
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Function to handle previous button click
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <>
            <div className={`alert alert-${alertColor}`} role="alert">
                {Alertmassage}
            </div>
            <div className='main-form-container'>
                <div className={`login-container ${active}`} id="container">
                    <div className="form-container sign-up-container">
                        <form onSubmit={signUpSubmit}>
                            <div className="profile" onMouseEnter={handleHover}
                                onMouseLeave={handleMouseLeave} data-bs-toggle="modal" data-bs-target="#profilepicpicker">
                                <img
                                    src={images[currentImageIndex]} alt={`Image ${currentImageIndex}`}
                                    className='profilepic'
                                />
                                {isHovered && (
                                    <div className="icon-overlay">
                                        <img src={editimg} />
                                    </div>
                                )}
                            </div>
                            <input type="text" name="username" id="username" placeholder="UserName" value={credentials.username} onChange={onChange} required minLength='5' maxlength="12" />
                            <input type="email" id="email" name="email" aria-describedby="emailHelp" placeholder="Email" value={credentials.email} onChange={onChange} required />
                            <input type={ischecked==="true"?"text":"password"} name="password" id="password" placeholder="Password" value={credentials.password} onChange={onChange} required minLength='6' maxlength="12" />
                            <input type="checkbox" checked={ischecked} onChange={()=>{if(ischecked==='true'){setischecked("false")}else{setischecked("true")}}}/>
                            <button type="submit" class="ui-btn"><span>Sign Up</span></button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form onSubmit={signInSubmit}>
                            <h1>Sign in</h1>
                            <span>or use your account</span>
                            <input type="email" id="email" name="email" aria-describedby="emailHelp" placeholder="Email" value={credentials.email} onChange={onChange} required />
                            <input type={ischecked==="true"?"text":"password"} name="password" id="password" placeholder="Password" value={credentials.password} onChange={onChange} required minLength='6' maxlength="12" />
                            <input type="checkbox" checked={ischecked} onChange={()=>{if(ischecked==='true'){setischecked("false")}else{setischecked("true")}}}/>
                            <a>Forgot your password?</a>
                            <button type="submit" class="ui-btn">
                                <span>
                                    Sign In
                                </span>
                            </button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h2>Hey There!</h2>
                                <p>Enter your personal details to open an account with us</p>

                                <h6>or</h6>
                                <button className="learn-more ghost" onClick={signIn}>
                                    <span className="login-circle" aria-hidden="true">
                                        <span className="icon arrow"></span>
                                    </span>
                                    <span className="button-text">Sign In</span>
                                </button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h2>Welcome Back!</h2>
                                <img className='securelogo' src={securelogo} />
                                <p>To keep connected with us please login with your personal details</p>
                                <h6>or</h6>
                                <button className="learn-more ghost" onClick={signUp}>
                                    <div>
                                    </div>
                                    <span className="login-circle" aria-hidden="true">
                                        <span className="icon arrow"></span>
                                    </span>
                                    <span className="button-text">Sign Up</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="profilepicpicker" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body profilepicmodal">

                            <div>
                                <button onClick={prevImage}>Previous</button>
                                <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex}`} />
                                <button onClick={nextImage}>Next</button>
                            </div>
                        </div>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;