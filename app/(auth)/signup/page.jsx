import SignupForm from '@/components/auth/SignupForm'
import React from 'react'

const SignupPaage = () => {
  return (
    <div
      className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm/>
      </div>
    </div>
  )
}

export default SignupPaage