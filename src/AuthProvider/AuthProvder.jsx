
import { AuthContext } from './AuthContext';

const AuthProvder = ({children}) => {



const authInfo = {

    name: "Polok"

};




   return(


     <AuthContext.Provider value={{authInfo}}>
        {children}
    </AuthContext.Provider>




   )





     
      
    
};

export default AuthProvder;