import React, { useEffect, useState } from 'react'

function UserName() {
   
    const [uname,setUname] = useState();

    useEffect(()=>{
      let user =   JSON.parse(localStorage.getItem('bookmyslot'));
      setUname(user.userName)
    },[])
    
  return (
    <div>{uname}</div>
  )
}

export default UserName