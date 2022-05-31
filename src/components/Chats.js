import React, {useRef,useState,useEffect}from 'react';
import {useHistory} from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import { auth } from '../Firebase';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';


function Chats() {
  const history = useHistory();
  const {user} = useAuth();
  const [loading,setloading] = useState(true);
  console.log(useAuth(),'+++');
  console.log(user,'+++');

  const handlelogout =async () =>{
 await auth.signOut();

 history.push('/')
  }
  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userphoto.jpg",{type:"image/jpg"})

  }
  useEffect(() =>{
    if(!user){
      history.push('/');
      return
    }
   axios.get('https://api.chatengine.io/users/me',{
     headers:{
       "project-ID" : "ae97e5f6-d8ca-4c6d-b511-f9004c4a5f41",
       "user-name" : user.email,
       "user-secert": user.uid,
     }
   })
   .then(() =>{
     setloading(false);
   })
   .catch(() =>{
     let formdata = new FormData();
     formdata.append('email',user.email);
     formdata.append('username',user.email);
     formdata.append('secret',user.uid);
     getFile(user.photoURL)
     .then((avatar) => {
       formdata.append('avatar',avatar,avatar.name);
       axios.post('https//api.chatengine.io/users',
       formdata,
       {headers:{"private-key":"ec53800e-66c6-4203-b6a2-22283c7862ba"}}
       )
       .then(() => setloading(false))
       .catch((error) =>{console.log(error);})

     })
     
   })

  },[user,history])
  
  if(!user) return "loading...";
     
  console.log(user);
  console.log(user.email);
  console.log(user.uid);
  return (
    <div className='chats-page'>
        <div className='nav-bar'>
            <div className='logo-tab'>
                unichat
            </div>
            <div  onClick={handlelogout} className='logout-tab'>
                logout
            </div>
        </div>
        <ChatEngine height = "calc(100vh - 66px)" 
        projectID = "ae97e5f6-d8ca-4c6d-b511-f9004c4a5f41"
        userName= {user.email}
        userSecret= {user.uid}
        ></ChatEngine>
    </div>
  )
}

export default Chats