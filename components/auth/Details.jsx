'use client'
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ArrowUpDown, 
  User, 
  Phone
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from 'next/link';
import AnimatedGridContainer from '../basic/GridBackground';

const Details=()=>{
  const [loading,setLoading]=useState(true);
  const [users,setUsers]=useState([]);
  const [filteredUsers,setFilteredUsers]=useState([]);
  const [searchField,setSearchField]=useState('');
  const [sortConfig,setSortConfig]=useState({ 
    key:null, 
    direction:'ascending' 
  });
  const [currentPage,setCurrentPage]=useState(1);
  const itemsPerPage=5;

  useEffect(()=>{
    const fetchUsers=async()=>{
      try {
        const data=await fetch('https://jsonplaceholder.typicode.com/users');
        const response=await data.json();
        
        const UserData=response.map(user=>({
          ...user,
          avatar:`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
          companyDetails:user.company.name,
          city: user.address.city
        }));

        setUsers(UserData);
        setFilteredUsers(UserData);
      }
      catch(err)
      {
        console.log('Error fetching users:',err);
      }
      finally{
        setLoading(false);
      }
    };
    fetchUsers();
  },[]);

  const handleSearch=(value)=>{
    setSearchField(value);
    const filtered=users.filter(user=> 
      Object.values(user).some(item=> 
        String(item).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleSort=(key)=>{
    let direction='ascending';
    if (sortConfig.key===key && sortConfig.direction==='ascending'){
      direction = 'descending';
    }
    
    const sortedUsers=[...filteredUsers].sort((a,b)=>{
      if (a[key]<b[key]) return direction==='ascending'? -1 : 1;
      if (a[key]>b[key]) return direction==='descending'? -1 :1;
      return 0;
    });

    setFilteredUsers(sortedUsers);
    setSortConfig({key,direction});
  };

  const indexOfLastItem=currentPage*itemsPerPage;
  const indexOfFirstItem=indexOfLastItem-itemsPerPage;
  const currentUsers=filteredUsers.slice(indexOfFirstItem,indexOfLastItem);

  const pageNumbers=[];
  for (let i=1;i<=Math.ceil(filteredUsers.length/itemsPerPage);i++){
    pageNumbers.push(i);
  }

  if(loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AnimatedGridContainer>
    <div className="container mx-auto px-6 py-12 md:py-18 flex items-center justify-center">
      <Card className="w-full max-w-6xl mx-auto shadow-lg"> 
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-black-600 -mb-6">
            User Management Dashboard
          </CardTitle>
        </CardHeader>
      
        <CardContent>
          <div className="flex items-center py-4 pb-6">
            <div className="relative w-full max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchField}
                onChange={(e)=>handleSearch(e.target.value)}
                className="pl-10 pr-4 w-full"
              />
            </div>
          </div>

          <Table className="border rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-[100px]">Avatar</TableHead>
                <TableHead 
                  onClick={()=>handleSort('name')}
                  className="cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  <div className="flex items-center">
                    Name 
                    {sortConfig.key==='name'&&(
                      sortConfig.direction==='ascending' 
                        ? <ChevronUp className="ml-2 h-4 w-4" /> 
                        : <ChevronDown className="ml-2 h-4 w-4" />
                    )}
                    {sortConfig.key!=='name' && (
                      <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  onClick={()=>handleSort('username')}
                  className="cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  <div className="flex items-center">
                  Username
                  {sortConfig.key==='username'&& (
                    sortConfig.direction==='ascending' 
                        ? <ChevronUp className="ml-2 h-4 w-4" /> 
                        : <ChevronDown className="ml-2 h-4 w-4" />
                  )}
                  {sortConfig.key!=='username' && (
                      <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400"/>
                  )}
                  </div>
                  </TableHead>
                <TableHead>Email</TableHead>
                <TableHead 
                    onClick={()=>handleSort('city')}
                    className="cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  <div className="flex items-center">
                  Company
                  {sortConfig.key==='city'&& (
                    sortConfig.direction==='ascending' 
                        ? <ChevronUp className="ml-2 h-4 w-4" /> 
                        : <ChevronDown className="ml-2 h-4 w-4" />
                  )}
                  {sortConfig.key!=='city' && (
                      <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400"/>
                  )}
                  </div>
                  </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-100 transition-colors">
                  <TableCell>
                    <Avatar className="w-11 h-11 border-2 border-blue-500">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        <User className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium text-base text-blue-600">{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.companyDetails}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger >
                        <Button className="cursor-pointer" variant="outline" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center">
                          <User className="w-5 h-5" />
                          <Link href={`/algo-root/profile?id=${user.id}`}>View Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex items-center cursor-pointer"
                          onClick={()=>navigator.clipboard.writeText(user.phone)}
                          >
                          <Phone className='w-5 h-5'/>
                          {user.phone}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    className="cursor-pointer"
                    onClick={()=>setCurrentPage(initial=>Math.max(initial-1,1))}
                    disabled={currentPage===1}
                  />
                </PaginationItem>
                {pageNumbers.map(item=>(
                  <PaginationItem className="cursor-pointer" key={item}>
                    <PaginationLink
                      isActive={item===currentPage}
                      onClick={()=>setCurrentPage(item)}
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    className="cursor-pointer"
                    onClick={()=>setCurrentPage(prev=>Math.min(prev+1,pageNumbers.length))}
                    disabled={currentPage===pageNumbers.length}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

        
          <div className="text-center text-sm text-gray-500 mt-2">
            Showing {indexOfFirstItem+1} to {Math.min(indexOfLastItem,filteredUsers.length)} 
            {' '}of {filteredUsers.length} users
          </div>
        </CardContent>
      </Card>
    </div>
    </AnimatedGridContainer>
  );
};

export default Details;