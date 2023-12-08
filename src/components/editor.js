import '../css/editor.css'
import React, { useState, useContext, useRef } from 'react'
import Editor from "@monaco-editor/react";
import compcontext from '../context/compt/compcontext.js';
import Preview from './preview.js'

const Codeditor = () => {
    var randomWords = require('random-words');
    const context = useContext(compcontext);
    const { AddComp } = context;
    const [alertColor, setAlertColor] = useState('');
    const [Alertmassage, setAlertmassage] = useState('')
    const [fileName, setFileName] = useState("index.html");
    const [type, setType] = useState("button");
    const [typecheck, setTypecheck] = useState("block");
    const [htmlCode, sethtmlCode] = useState('<!-- Add your HTML code here -->');
    const [cssCode, setcssCode] = useState(`/* Add your CSS code here */`);
    const [isChecked, setIsChecked] = useState(false);
    const theme = isChecked;
    const handleCheckboxChange = (event) => {
        setIsChecked(!!event.target.checked);
    };
    const onChangeHtml = (value) => {
        sethtmlCode(value)
    }
    const onChangeCss = (value) => {
        setcssCode(value)
    }
    const addComponent = () => {
        let randomgen = randomWords({ exactly: 1, wordsPerString: 2, separator: '-' })
        let uniqueName = randomgen.shift();
        // eslint-disable-next-line no-restricted-globals
        let confirmed = confirm("Are you sure you want to publish this code ?");
        if (confirmed) {
            try {
                AddComp(type, uniqueName, htmlCode, cssCode, theme);
                setAlertColor('success')
                setAlertmassage('Your code is publish now')
            } catch (error) {
                console.log(error)
                setAlertmassage('something went wrong')
            }

            setTimeout(() => {
                setAlertColor('')
                setAlertmassage('')
            }, 2000);
        }
    }
    const editorRef = useRef(null);
    const handlehtmlEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }
    const handlecssEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }
    return (
        <>
            <div className={`alert alert-${alertColor}`} role="alert">
                {Alertmassage}
            </div>
            <div className="modal fade show" id="typecheck" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: `${typecheck}` }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Choose what you are gonna Make</h1>
                        </div>
                        <div className="modal-body typebuttons">
                            <button onClick={() => { setTypecheck('none'); setType('button'); }}>button</button>
                            <button onClick={() => { setTypecheck('none'); setType('input'); }}>Inputs</button>
                            <button onClick={() => { setTypecheck('none'); setType('checkbox'); }}>Checkboxs</button>
                            <button onClick={() => { setTypecheck('none'); setType('toggle'); }}>Toggle switches</button>
                            <button onClick={() => { setTypecheck('none'); setType('card'); }}>Cards</button>
                            <button onClick={() => { setTypecheck('none'); setType('loader'); }}>Loaders</button>
                            <button onClick={() => { setTypecheck('none'); setType('radio'); }}>Radio buttons</button>
                            <button onClick={() => { setTypecheck('none'); setType('form'); }}>Forms</button>
                            <button onClick={() => { setTypecheck('none'); setType('dropdown'); }}>Dropdowns</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="editor-container" >
                <div className="browser">
                    <div className="browser-card">
                        <div className="browser-circles">
                            <div className="c"></div>
                            <div className="c"></div>
                            <div className="c"></div>
                        </div>

                        <div className="browser-header">
                            <div className="chevrons">
                                <svg viewBox="0 0 20 20" height="20" width="20" xmlns="http://www.w3.org/2000/svg" data-name="20" id="_20">
                                    <path transform="translate(6.25 3.75)" d="M0,6.25,6.25,0l.875.875L1.75,6.25l5.375,5.375L6.25,12.5Z" id="Fill"></path>
                                </svg>
                                <svg viewBox="0 0 20 20" height="20" width="20" xmlns="http://www.w3.org/2000/svg" data-name="20" id="_20">
                                    <path transform="translate(6.625 3.75)" d="M7.125,6.25.875,12.5,0,11.625,5.375,6.25,0,.875.875,0Z" id="Fill"></path>
                                </svg>
                            </div>
                            <div className="search-bar">
                                <svg xmlns="http://www.w3.org/2000/svg" width="7.89" height="7.887" viewBox="0 0 16.89 16.887">
                                    <path id="Fill" d="M16.006,16.887h0l-4.743-4.718a6.875,6.875,0,1,1,.906-.906l4.719,4.744-.88.88ZM6.887,1.262a5.625,5.625,0,1,0,5.625,5.625A5.631,5.631,0,0,0,6.887,1.262Z" transform="translate(0.003 0)"></path>
                                </svg>127.0.0.1<div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="browserPrevieew" style={{ backgroundColor: theme ? '#e8e8e8' : '#212121', color: isChecked ? '#000' : '#fff',transition:'0.4s ease-in-out' }}>
                        <div className="theme-change">
                            <p> Theme : </p>
                            <div className="toggle-switch">
                                <label className="switch-label">
                                    <input type="checkbox" className="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <p>{isChecked ? 'Light' : 'Dark'}</p>
                        </div>
                        <Preview htmlCode={htmlCode} cssCode={cssCode} />
                    </div>
                </div>
                <div className="editor">
                    <div className="editor-card">
                        <div className="tools">
                            <div className="buttons">
                                <button disabled={fileName === "index.html"} onClick={() => setFileName("index.html")}>HTML</button>
                                <button disabled={fileName === "style.css"} onClick={() => setFileName("style.css")}>CSS</button>
                            </div>
                            <div className="saveButton">
                                <button type="submit" className="btn btn-success" onClick={addComponent}>Save & Publish</button>
                            </div>
                        </div>
                        <div className="card__content">
                            {fileName === 'index.html'
                                ?
                                <Editor
                                    height="500px"
                                    width="650px"
                                    theme="vs-dark"
                                    defaultLanguage="html"
                                    path='index.html'
                                    value={htmlCode}
                                    onMount={handlehtmlEditorDidMount}
                                    onChange={onChangeHtml}
                                />
                                :
                                <Editor
                                    height="500px"
                                    width="650px"
                                    theme="vs-dark"
                                    defaultLanguage='css'
                                    path='style.css'
                                    value={cssCode}
                                    onMount={handlecssEditorDidMount}
                                    onChange={onChangeCss}
                                />
                            }

                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Codeditor
