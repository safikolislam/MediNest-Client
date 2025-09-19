import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

 
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  const addToCart = (medicine) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item._id === medicine._id
      );

      if (existingItemIndex !== -1) {
      
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        
        return [...prevCart, { ...medicine, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (_id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== _id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (_id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === _id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );



  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };




  const logOut = () => {
    setLoading(true);
    clearCart();
    return signOut(auth);
  };

 const updateUserProfile = async (profileInfo) => {
    if (auth.currentUser) {
      setLoading(true);
    
      await updateProfile(auth.currentUser, profileInfo);

   
   
      setUser((prevUser) => ({
        ...prevUser,
        ...profileInfo, 
      }));
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("CurrentUser -->", currentUser?.email);

      if (currentUser?.email) {
        setUser(currentUser);

        const existingToken = localStorage.getItem("access-token");

        if (!existingToken) {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            { email: currentUser?.email }
          );

          localStorage.setItem("access-token", data.token);
        }
      } else {
        setUser(null);
        localStorage.removeItem("access-token");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);



  const authInfo = {
    user,
    loading,
    logOut,
    createUser,
    signIn,
    signInWithGoogle,
  
   updateUserProfile,
    cart,
    setCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    clearCart,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

















































































































































































