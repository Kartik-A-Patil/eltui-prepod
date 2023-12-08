import { React, useContext, useEffect, useState } from 'react'
import CompContext from '../context/compt/compcontext';
import '../css/component.css';
import Preview from './preview.js'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import BackToTopButton from './backtotop';
import Prevnext from './prevnext';
import Navbar from './navbar';
import Footer from './footer'
function Element() {
    const context = useContext(CompContext)
    const { comp, fetchTypeComp, fetchuser, loading, setLastVisitedPage } = context;
    const history = useHistory();
    const location = useLocation();
    const { type } = useParams();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const page = searchParams.get('page') || 1;
        fetchTypeComp(type, page);
    }, [location.search || type]);

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            fetchuser();
        }
    }, [])
    const handleComponentClick = (uniqueName) => {
        history.push(`/components/${uniqueName}`);
    };
    useEffect(() => {
        setLastVisitedPage(location.pathname);
    }, [location]);

    let loaders = [];
    for (let i = 0; i < 6; i++) {
        loaders.push(<div key={i} className="sh-main-card"><div className="sh-card"></div><div className="sh-card-footer"><p></p><p></p></div></div>);
    }

    return (
        <>
            <Navbar />
            <div className="browse-container">
               
                <div className="browse-header">
                    <h2>{type === 'all' ?
                        <b>Browse all</b>
                        : <b className='type-check'>{type === 'toggle' ? type + ' switches' : type}</b>
                    }</h2>
                    <p className='text-white'>Open-Source UI elements made with HTML and CSS</p>
                </div>
                <div className="cards">
                    {loading ?
                        loaders
                        :
                        comp.map((comp) => {
                            return (
                                
                                <div className='main-card' key={comp._id}>
                                    <div className="card" onClick={() => handleComponentClick(comp.uniqueName)} style={{ backgroundColor: comp.theme ? '#e8e8e8' : '#212121' }}>
                                        <Preview htmlCode={comp.html} cssCode={comp.css} />
                                        <div className='codelink'>
                                            <button className='linkToCode' onClick={() => handleComponentClick(comp.uniqueName)}><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"></path></svg> Code</span></button>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <Link className='browse-username' to={`/user/${comp.user.username}`}>@{comp.user.username}</Link>
                                        <p className='likes'>{comp.likedBy.length} Likes</p>
                                    </div>
            
                                </div>
                            )
                        })}
                </div>
                <Prevnext comp={comp} />
                <BackToTopButton />
            </div>
            <Footer />
        </>
    )
}

export default Element
