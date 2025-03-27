import UserProfile from "@/components/auth/UserProfile";
import { Suspense } from "react";

const UserProfilePage=()=>{
    return (
        <Suspense fallback={<div>Loading...</div>}>
           <UserProfile/>
        </Suspense>
    ) 
}

export default UserProfilePage;