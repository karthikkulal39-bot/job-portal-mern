import React from 'react'

const PageNotFound = ({message}) => {
    {console.log("iam called");}
    {console.log(message.status)}

  return (
   
    <div className='bg-red-400'> 404 PageNotFound,    {message.message} {message.status}</div>
  )
}

export default PageNotFound