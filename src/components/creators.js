import React, { useEffect, useState,useContext } from 'react'
import compcontext from '../context/compt/compcontext';

const Creators = () => {
  const context = useContext(compcontext)
  const { host} = context;
  const [creators, setCreators] = useState('')
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${host}/api/auth/creators`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      setCreators(data);
    }
    fetchUsers();
  }, [])
  console.log(creators)
  return (
    <div>
      
    </div>
  )
}

export default Creators
