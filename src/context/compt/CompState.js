import CompContext from "./compcontext";
import { React, useState } from "react";


const CompState = (props) => {
    const [comp, setComp] = useState([])
    const [usercomp, setUsercomp] = useState([])
    const [userinfo, setUserinfo] = useState([])
    const [profilecomp, setprofilecomp] = useState([])
    // const host = "http://localhost:5000";
    const host = "https://eltui-server.onrender.com";
    const authtoken = localStorage.getItem('auth-token');
    const [loading, setLoading] = useState(true);
    const [lastVisitedPage, setLastVisitedPage] = useState(null);
    //fetch user data
    const fetchuser = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": authtoken
            },
        });
        const userdata = await response.json()
        setUserinfo(userdata)
    }



    //add a new components
    const AddComp = async (type, uniqueName, html, css, theme) => {
        const response = await fetch(`${host}/api/components/addcomponent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ type, uniqueName, html, css, theme })
        });

        const note = await response.json();
        setComp(comp.concat(note))
    }
    //delete comp
    const deleteComp = async (id) => {
        let confirmed = window.confirm("Are you sure you want to Delete this Component ?");
        if (confirmed) {
            const response = await fetch(`${host}/api/components/deletecomponent/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('auth-token')
                }
            });
            const json = response.json();
            const Newcomps = profilecomp.filter((comps) => { return comps._id !== id })
            setprofilecomp(Newcomps)
            console.log(Newcomps)
            // window.location.reload(true);
        }

    }
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const fetchTypeComp = async (type, page) => {
        try {
            setLoading(true);
            const response = await fetch(`${host}/api/components/${type}/${page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setComp(data.components);
            setCurrentPage(page);
            setTotalPages(data.pages);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
   
    const getCompes = async (userId) => {
        const response = await fetch(`${host}/api/components/component/userComp/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json()
        setUsercomp(json)
    } ;
    return (
        <CompContext.Provider value={{ setprofilecomp,profilecomp,usercomp,host, comp, setComp, AddComp, userinfo, fetchuser, deleteComp, fetchTypeComp, currentPage, totalPages, loading, setLastVisitedPage, lastVisitedPage,getCompes}}>
            {props.children}
        </CompContext.Provider>
    )
}
export default CompState;