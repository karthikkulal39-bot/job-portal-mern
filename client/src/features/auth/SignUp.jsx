import React from 'react'
import { useForm } from 'react-hook-form'
const SignUp = () => {
    const {
        registry,
        handleSubmit,
        formState:{errors}
    }=useForm();


  return (
    <div>
        <form onSubmit={handleSubmit(onsubmit)}>
            <input type='text' placeholder='email old'
            {...registry("email",{required:"Email is required"})}
                />
           <input type='email' placeholder='email'
            {...registry("email",{required:"Email is required"})}
                />
        </form>
    </div>
  )
}

export default SignUp