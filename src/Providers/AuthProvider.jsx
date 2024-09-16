import React, { useEffect, useState } from 'react'
import { createContext } from 'react';
import auth from '../Firebase/Firebase.config';
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import useAxiosCommon from '../Hooks/useAxiosCommon';

export const AuthContext = createContext(null)

export default function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const axiosCommon = useAxiosCommon();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = (name, image) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName : name,
            photoURL : image
        })
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const facebookLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, facebookProvider)
    }

    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if(currentUser){
                setUser(currentUser)
                try{
                    const {data} = await axiosCommon.post('/jwt', {email : currentUser?.email})
                    localStorage.setItem('access_token', data?.token);
                }catch(error){
                    console.log(error.message);
                }
            }else{
                localStorage.removeItem('access_token')
                console.log('Logged Out')
            }
            setLoading(false);
        })
        
        return () => {
            unsubscribe();
        }
    })

    const authObject = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        updateUserProfile,
        logOut,
        login,
        googleLogin,
        facebookLogin,
        resetPassword
    }
  return (
    <AuthContext.Provider value={authObject}>
        {children}
    </AuthContext.Provider>
  )
}
