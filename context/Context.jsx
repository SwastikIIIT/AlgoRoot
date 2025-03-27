'use client'
import React,{createContext,useContext,useState,useEffect} from 'react';
import { toast } from "sonner";

const AuthContext=createContext();

export const AuthProvider=({children})=>{
  const [user,setUser]=useState(null);

  
  useEffect(()=>{
    const storedUser=localStorage.getItem('Session');
    if(storedUser)
      {
        try{
          setUser(JSON.parse(storedUser));
        } 
        catch(err)
        {
          console.error('Failed to parse user from localStorage', error);
          localStorage.removeItem('Session');
        }
    }
  },[]);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
  };

 
  const signup=async(name,email,password)=>{   
      try{
          
          if(!name || !email || !password)
          {
            toast.error('Please fill in all fields');
            return false;
          }
          if(name.length<2)
          {
            toast.error('Name must be at least 2 characters long');
            return false;
          }
          if (!validateEmail(email))
          {
            toast.error('Please enter a valid email address');
            return false;
          }
          if(!validatePassword(password))
          {
            toast.error('Password must be at least 8 characters long, contain uppercase, lowercase, and a number');
            return false;
          }
      

          const users=JSON.parse(localStorage.getItem('users')|| '[]');
          const existingUser=users.find(i=>i.email===email);
          
          if(existingUser)
          {
            toast.error('User with this email already exists');
            return false;
          }
          
          const newUser={
            id:crypto.randomUUID(),
            name:name.trim(),
            email:email,
            password:password 
          };
          
          localStorage.setItem('users',JSON.stringify([...users,newUser]));
          toast.success('Account created successfully');
         console.log("User Database in local storage and session user Try:",{Users:JSON.parse(localStorage.getItem("users")),session:user});
          return true;
      }
      catch(err)
      {
        toast.error('Failed to create account');
        console.log('Signup error:', err);
        console.log("User Database in local storage and session user Catch:",{Users:localStorage.getItem("users"),session:user});
        return false;
      } 
    };

  const login =async(email,password)=>{    

    if (!email || !password) {
      toast.error('Please provide both email and password');
      return false;
    }

   
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    
    if (!validatePassword(password)) {
      toast.error('Password must be at least 8 characters long, contain uppercase, lowercase, and a number');
      return false;
    }

      try {
        const usersData=JSON.parse(localStorage.getItem('users')|| '[]');
        const user=usersData.find(i=>i.email===email && i.password===password);
        
        if(!user)
        {
          toast.error('Invalid email or password');
          return false;
        }
      
        
        const sessionUser={id:user.id,name:user.name,email:user.email};
        localStorage.setItem('Session',JSON.stringify(sessionUser));
        setUser(sessionUser);
        
        toast.success('Logged in successfully');
        console.log("User Database in local storage and session user Try:",{Users:localStorage.getItem("users"),Session:user});
        return true;
      }
      catch(err){
        toast.error('Failed to log in. Please try again.');
        console.log('Login error:', err);
        console.log("User Database in local storage and session user Catch:",{Users:localStorage.getItem("users"),Session:user});
        return false;
      }
  };

  const signout=()=>{
    localStorage.removeItem('Session');
    setUser(null);
    toast.success('Logged out successfully');
  };

  
  const deleteAccount=()=>{
      if(!user)
        return;
      
       try{
          const users=JSON.parse(localStorage.getItem('users') || '[]');
          const updatedUsers=users.filter(i=>i.id!==user.id);
          
          localStorage.setItem('users',JSON.stringify(updatedUsers));
          localStorage.removeItem('Session');
          setUser(null);
          
          toast.success('Account deleted successfully');
         }
       catch(err)
       {
        toast.error('Failed to delete account');
        console.log("Error in delete account:",err);
      }
  };

  return (
    <AuthContext.Provider value={{user,login,signup,signout,deleteAccount}}>
      {children}
    </AuthContext.Provider>
  );
};


export const AuthOptions=()=>{
  const context=useContext(AuthContext);
  return context;
};