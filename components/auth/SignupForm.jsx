'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthOptions } from "@/context/Context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const SignupForm=()=>{

     const {signup}=AuthOptions();
     const router=useRouter();
    
     const handleSignup=async(formData)=>{
        const name=formData.get('username');
        const email=formData.get('email');
        const password=formData.get('password');
        
        const toastId=toast.loading("Processing request...");

        try{
            const result=await signup(name,email,password);
            
            if(result){
                router.push('/login');
            }
        }
        catch(err){
            console.log("Error in signup",err)
        }
        finally{
            setTimeout(()=>{
                toast.dismiss(toastId);
            },3000)
        }
     }

  return (
     <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">

          <form action={handleSignup} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Signup to your AlgoAuth account
                </p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="username">Name</Label>
                <Input name="username" type="text" placeholder="John Singh" required />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input name="email" type="email" placeholder="john@example.com" required />
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input name="password" type="password" required />
              </div>

              <Button type="submit" className="w-full cursor-pointer">
                Signup
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/signup1.avif"
              alt="Image"
              className="absolute inset-0 h-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>
      <div
        className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
    )
}

export default SignupForm;