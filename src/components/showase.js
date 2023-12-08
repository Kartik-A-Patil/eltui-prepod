import React, { useContext, useEffect, useState } from 'react'
import CompContext from '../context/compt/compcontext';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import parserCss from 'prettier/parser-postcss';
import { Link } from 'react-router-dom';
import Preview from './preview';
import { useHistory } from 'react-router-dom';

const Showase = () => {
    const history = useHistory();
    const context = useContext(CompContext)
    const { host } = context;
    const [comp, setComp] = useState([]);

    // const button = [];
    // const toggle = []
    // const inputs = []
    // const cards = []
    // const loaders = []
    // const radio = []
    // const froms = []
    // const dropdowns = []

    const fetchcomp = async () => {
        const response = await fetch(`${host}/api/components/fetchallcomponents`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const comparray = await response.json();
        setComp(comparray)
    }
    useEffect(() => {
        fetchcomp()
    }, [])
    const handleComponentClick = (uniqueName) => {
        history.push(`/components/${uniqueName}`);
    };
    return (
        <div id="showcase">
            <div className="showcase-box">
                <div className="showbox box1">
                    <div className="loading">
                        <svg width="72px" height="54px">
                            <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
                            <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
                        </svg>
                    </div>
                </div>
                <div className="showbox box2">
                    <div className="animation">
                        <p>Loading</p>
                        <div className="words">
                            <span className="word">buttons</span>
                            <span className="word">forms</span>
                            <span className="word">switches</span>
                            <span className="word">cards</span>
                            <span className="word">buttons</span>
                        </div>
                    </div>
                </div>
                <div className="showbox box3">
                    <div className="loader">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>
            </div>
            <div className="showcase-container">
                <div className="headline">
                    <h2 className='text-white my-3'>Open-source components for any website</h2>
                    <p className='text-secondary'>Create or Use custom Components made with HTML and CSS.</p>
                </div>
                <div className="browse-all">
                    <Link class="browse-btn" to='/comp/all'>
                        <strong>Discover All</strong>
                    </Link>
                </div>
            </div>
            <div className="browse-container">
                <h5>Browse by Category</h5>
                <div className="showcase-card">
                    <div className="button-cards">
                        <p>Buttons</p>
                    </div>
                    <div className="toggle-cards">
                        <p>Toggle switches</p>
                    </div>
                    <div className="input-cards">
                        <p>Inputs</p>
                    </div>
                    <div className="card-cards">
                        <p>Cards</p>
                    </div>
                    <div className="loader-cards">
                        <p>Loaders</p>
                    </div>
                    <div className="radio-cards">
                        <p>Radio Buttons</p>
                    </div>
                    <div className="form-cards">
                        <p>Froms</p>
                    </div>
                    <div className="dropdown-cards">
                        <p>Dropdowns</p>
                    </div>
                </div>
                {/* {comp.map((comp) => {
                    return (
                        <div className='main-card' key={comp._id}>
                            <div className="card" onClick={() => handleComponentClick(comp.uniqueName)} style={{ backgroundColor: comp.theme ? '#e8e8e8' : '#212121' }}>
                                <Preview htmlCode={comp.html} cssCode={comp.css} />
                            </div>
                            <div className="card-footer">
                                <Link className='browse-username' to={`/user/${comp.user.username}`}>@{comp.user.username}</Link>
                                <p className='likes'>{comp.likedBy.length}Likes</p>
                            </div>

                        </div>
                    )
                })} */}
            </div>
        </div>
    )
}

export default Showase;