'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, ArrowLeft, MapPin, Phone, Mail, Building2, Globe, LocateFixed } from 'lucide-react';
import AnimatedGridContainer from '@/components/basic/GridBackground';



const UserProfilePage=()=>{
 const [loading,setLoading]=useState(true); 
 const router=useRouter();
 const [user,setUser]=useState([]);
 const searchparams=useSearchParams();
 const id=searchparams.get('id');

 useEffect(()=>{
    const fetchUsers=async()=>{
      try {
        const data=await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const response=await data.json();

        const userData={
            ...response,
            avatar:'https://api.dicebear.com/7.x/avataaars/svg?seed='+response.username
        }
        setUser(userData);
      }
      catch(err)
      {
        console.log('Error fetching users:',err);
      }
      finally{
        setLoading(false);
      }
    };
    if(id)
    fetchUsers();
    else
    router.push('/algo-root');
 },[id]);

 if(loading)
  {
    return (
      <div className="flex justify-center items-center h-full">
       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
  
    );
  }

  if(!user){
    return (
      <div className="flex justify-center font-bold items-center h-screen text-zinc-600">
        User not found
      </div>
    );
 }  

  return (
  <AnimatedGridContainer>
    <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-[1px] border-zinc-200 dark:border-zinc-700">
          <CardHeader className="border-b border-zinc-200 dark:border-zinc-700 p-6">
             <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={()=>router.push('/algo-root/details')}
                className="cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
            </Button>
            <CardTitle className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 text-center flex-grow">
                User Profile
            </CardTitle>
            </div>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
            <div className="flex items-center space-x-6 border-b border-zinc-200 dark:border-zinc-700 pb-6">
            <Avatar className="w-24 h-24 border-4 border-zinc-300 dark:border-zinc-600">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                <User className="w-12 h-12 text-zinc-500" />
                </AvatarFallback>
            </Avatar>
            <div>
                <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">{user.name}</h2>
                <p className="text-zinc-600 dark:text-zinc-400">@{user.username}</p>
            </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                <span className="text-zinc-700 dark:text-zinc-300">{user.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                <span className="text-zinc-700 dark:text-zinc-300">{user.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                <span className="text-zinc-700 dark:text-zinc-300">{user.website}</span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                <span className="text-zinc-700 dark:text-zinc-300">
                    {user.address.street}, {user.address.suite}
                </span>
                </div>
                <div className="flex items-center space-x-3">
                <LocateFixed className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                <span className="text-zinc-700 dark:text-zinc-300">
                    {user.address.city}, {user.address.zipcode}
                </span>
                </div>
                <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                <span className="text-zinc-700 dark:text-zinc-300">
                    {user.company.name}
                </span>
                </div>
            </div>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6 text-center">
            <p className="text-zinc-500 dark:text-zinc-400 italic">
                "{user.company.catchPhrase}"
            </p>
            </div>
        </CardContent>
        </Card>
  </div>
  </AnimatedGridContainer>
  )
}

export default UserProfilePage;