import React , {useContext, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { auth } from '../Firebase';
const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [loading,Setloading] = useState(true);
 const [user,Setuser] = useState(null);
 const history = useHistory();
  
 useEffect(() =>{
     auth.onAuthStateChanged((user) =>{
         Setuser(user);
         Setloading(false);
         if(user)  history.push('/Chats');
     })
 },[user,history])
 const value = {user};
 return(
     <AuthContext.Provider value={value}>
         {!loading && children}

     </AuthContext.Provider>
 )
}