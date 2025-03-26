import React, { createContext, useEffect, useState } from "react";
import { auth } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// ✅ Define Admin Emails
const adminEmails = ["patwa.bartan.bhandar@gmail.com", "sarthakpatwa972@gmail.com"];

// ✅ Create Context
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      // ✅ Check if Email is in Admin List
      setIsAdmin(currentUser ? adminEmails.includes(currentUser.email) : false);

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading,setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
