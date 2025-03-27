'use client'
import Details from '@/components/auth/Details'
import { 
  AlertDialog, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogHeader, 
  AlertDialogFooter, 
  AlertDialogTitle, 
  AlertDialogAction 
} from '@/components/ui/alert-dialog'
import { AuthOptions } from '@/context/Context'
import { useRouter } from 'next/navigation'
import React from 'react'
import { TriangleAlert } from 'lucide-react'

const DetailsPage = () => {
  const { user } = AuthOptions();
  const router = useRouter();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-black transition-colors duration-300">
      <AlertDialog defaultOpen={true}>
        <AlertDialogContent 
          className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl border-[1px] border-zinc-200 dark:border-zinc-700 max-w-md mx-auto p-8 space-y-6 transform transition-all duration-300 ease-in-out hover:shadow-xl"
        >
          <AlertDialogHeader className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <TriangleAlert 
                className="text-zinc-700 dark:text-zinc-300" 
                size={28} 
                strokeWidth={2}
              />
              <AlertDialogTitle 
                className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 text-center tracking-tight" 
              >
                Authentication Required
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription 
              className="text-zinc-600 dark:text-zinc-400 text-base" 
            >
                You need to be logged in to access this page. Please authenticate to continue to the dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter 
            className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3"
          >
            <AlertDialogCancel 
              className="cursor-pointer w-full sm:w-auto 
                bg-zinc-100 dark:bg-zinc-700 
                text-zinc-700 dark:text-zinc-200 
                hover:bg-zinc-200 dark:hover:bg-zinc-600 
                border border-zinc-300 dark:border-zinc-600
                transition-all duration-300 ease-in-out
                focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-500"
              onClick={() => router.push('/algo-root')}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              className="cursor-pointer w-full sm:w-auto 
                bg-zinc-800 dark:bg-zinc-700 
                text-white 
                hover:bg-black dark:hover:bg-zinc-600
                transition-all duration-300 ease-in-out
                focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-300
                shadow-md hover:shadow-lg"
              onClick={() => router.push('/login')}
            >
              Login
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    )
  }
  
  return <Details />
}

export default DetailsPage