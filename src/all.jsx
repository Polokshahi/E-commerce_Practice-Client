
import { AuthContext } from './AuthContext';

 const AuthProvider = ({children}) => {


    



const authInfo = {

    name: "Polok"

};




   return(


     <AuthContext.Provider value={{authInfo}}>
        {children}
    </AuthContext.Provider>




   )





     
      
    
};

export default AuthProvider;



import { createContext } from "react";

 const AuthContext = createContext();

 export default AuthContext;



 import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Router/router.jsx'
import AuthProvider from './AuthProvider/AuthProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
  <RouterProvider router={router} />
    </AuthProvider>
  
  </StrictMode>,
)
