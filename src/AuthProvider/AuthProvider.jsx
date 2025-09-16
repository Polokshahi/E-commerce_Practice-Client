import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, } from "firebase/auth";
import AuthContext from "./AuthContext";
import app from "../Firebase/Firebase.init";


const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register user and update displayName
  const register = (email, password, firstName, lastName) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Update Firebase displayName
        return updateProfile(result.user, {
          displayName: `${firstName} ${lastName}`,
        }).then(() => result);
      })
      .finally(() => setLoading(false));
  };


  // login

  // Login user
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
    .finally(() => setLoading(false));
  };


  // logOut-User
  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };









  // Track user state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    register,
    login,
    logOut
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
