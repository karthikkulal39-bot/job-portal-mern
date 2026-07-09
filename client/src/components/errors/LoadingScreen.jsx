import React from 'react'
import {Skeleton} from "../ui/skeleton"

const LoadingScreen = () => {

  return (
   <div className="flex items-center justify-center w-full h-screen bg-slate-500">
      <div className="flex flex-col gap-6 w-full max-w-2xl  p-8">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-12 w-full" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-12 w-full" />
        </div>
        <Skeleton className="h-12 w-32" />
      </div>
    </div>
  )
}
export default LoadingScreen