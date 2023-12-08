import React, { useState, useContext, useEffect, useRef } from 'react'
import Editor from "@monaco-editor/react";
import { useHistory, useLocation, useParams } from 'react-router-dom';
import compcontext from '../context/compt/compcontext.js';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import parserCss from 'prettier/parser-postcss';
import Preview from './preview.js'
import Navbar from './navbar.js';
import copyBtnDark from '../img/copyBtnDark.png'
const Codeditor = (props) => {
    const lastLocationRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        lastLocationRef.current = location;
    }, [location]);

    const context = useContext(compcontext)
    const { host, lastVisitedPage, userinfo } = context;
    const compsinitial = {
        html: '<h1>Loading....</h1>',
        css: 'h1{color:white;}'
    };
    const userId = userinfo._id;

    const [component, setComponent] = useState(compsinitial);
    const { uniqueName } = useParams();
    const history = useHistory();
    const [htmlCode, sethtmlCode] = useState(component.html)
    const [cssCode, setcssCode] = useState(component.css)
    const [isChecked, setIsChecked] = useState(false);
    const [likes, setLikes] = useState([]);
    const [likeChecked, setLikeChecked] = useState(false);
    const fetchComponent = async () => {
        const response = await fetch(`${host}/api/components/${uniqueName}`);
        const data = await response.json();
        setComponent(data);
        let forHtml = prettier.format(data.html, { parser: 'html', plugins: [parserHtml] });
        let forCss = prettier.format(data.css, { parser: 'css', plugins: [parserCss] });
        sethtmlCode(forHtml.replace(/^\s*$[\n\r]{1,}/gm, ''))
        setcssCode(forCss.replace(/^\s*$[\n\r]{1,}/gm, ''))
        setIsChecked(data.theme)
        setLikes(data.likedBy)
        setLikeChecked(data.likedBy.includes(userId));
    };
    useEffect(() => {
        fetchComponent();
    }, []);
    const handleCheckboxChange = (event) => {
        setIsChecked(!!event.target.checked);
    };
    const [fileName, setFileName] = useState("style.css");
    const handlehtmlEditorDidMount = (editor) => {
        editorRef.current = editor;
    }
    const editorRef = useRef(null);
    const handlecssEditorDidMount = (editor) => {
        editorRef.current = editor;
    }
    const handleHtmlChange = () => {
        sethtmlCode(editorRef.current.getValue())
        setcopybtntext('Copy')
    }
    const handleCssChange = () => {
        setcssCode(editorRef.current.getValue())
        setcopybtntext('Copy')
    }

    function redirectToLastLocation() {
        if (lastVisitedPage) {
            history.push(lastVisitedPage);
        }
        else {
            history.push('/comp/all')
        }
    }
    const updateLikes = async () => {
        const response = await fetch(`${host}/api/components/complikes/${component._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ userId })
        });
        const data = await response.json();
        setLikes(data)
    }
    const handleLikebtn = () => {
        setLikeChecked(!likeChecked)
        updateLikes();
    }
    const [copybtntext, setcopybtntext] = useState('Copy')
    const copyCode = () => {
        setcopybtntext('Copied')
        if (fileName === "index.html") {
            navigator.clipboard.writeText(htmlCode);
        }
        else {
            navigator.clipboard.writeText(cssCode);
        }
    }
    return (
        <>
            <Navbar />
            <div className="side-navbar sidenav-editer my-5">
                <div className="back-btn">
                    <button onClick={redirectToLastLocation}>
                        <p>Go Back</p>
                    </button>
                </div>
                <div className="code-container">

                    <div className="livepreview" style={{ backgroundColor: isChecked ? '#e8e8e8' : '#212121', color: isChecked ? '#000' : '#fff' }}>
                        <div className="livepreview-tools">
                            <div className="likes" >
                                <p>{likes.length}</p>
                                <span class="d-inline-block" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Disabled popover">
                                    <input type="checkbox" checked={likeChecked} id="favorite" name="favorite-checkbox" value="favorite-button" onChange={handleLikebtn} />
                                    <label for="favorite" class="container" data-bs-toggle="Favorite" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isChecked ? "currentColor" : '#fff'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                    </label>
                                </span>
                            </div>
                            <div className="theme-change" >
                                <p>Theme : </p>
                                <div className="toggle-switch">
                                    <label className="switch-label">
                                        <input type="checkbox" className="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <p>{isChecked ? 'Light' : 'Dark'}</p>
                            </div>
                        </div>
                        <Preview htmlCode={htmlCode} cssCode={cssCode} />
                    </div>
                    <div className="editer">
                        <div className="editer-card">
                            <div className="tools">
                                <div className="circles">
                                    <div className="circle">
                                        <span className="red box"></span>
                                    </div>
                                    <div className="circle">
                                        <span className="yellow box"></span>
                                    </div>
                                    <div className="circle">
                                        <span className="green box"></span>
                                    </div>
                                </div>
                                <div className="copy-btn">
                                    <button onClick={copyCode}>
                                        <img src={copyBtnDark} /> {copybtntext}
                                    </button>
                                </div>
                                <div className="buttons">
                                    <button disabled={fileName === "index.html"} onClick={() => { setFileName("index.html"); setcopybtntext('Copy') }}>HTML</button>
                                    <button disabled={fileName === "style.css"} onClick={() => { setFileName("style.css"); setcopybtntext('Copy') }}>CSS</button>
                                </div>
                            </div>
                            <div className="card__content">
                                {fileName === 'index.html'
                                    ?
                                    <Editor
                                        height="500px"
                                        theme="vs-dark"
                                        defaultLanguage="html"
                                        path='index.html'
                                        value={htmlCode}
                                        onMount={handlehtmlEditorDidMount}
                                        onChange={handleHtmlChange}
                                        options={{
                                            minimap: {
                                                enabled: false,
                                            },
                                            lineNumbersMinChars: 3, // Set the minimum number of characters for line numbers
                                            glyphMargin: false, 
                                            wordWrap: 'on',
                                        }} />
                                    :
                                    <Editor
                                        height="500px"
                                        theme="vs-dark"
                                        defaultLanguage='css'
                                        path='style.css'
                                        value={cssCode}
                                        onMount={handlecssEditorDidMount}
                                        onChange={handleCssChange}
                                        options={{
                                            minimap: {
                                                enabled: false,

                                            },
                                            lineNumbersMinChars: 3, // Set the minimum number of characters for line numbers
                                            glyphMargin: false,
                                            wordWrap: 'on',
                                        }} />
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Codeditor
