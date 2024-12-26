import React from 'react'

const ContactCard = ({name, email, phone, message}) => {
  return (
    <div className='w-full p-5 flex flex-col justify-center bg-gray-200 shadow-md rounded'>
        <p className='text-base'><strong>Name:</strong> {name}</p>
        <p className='text-base'><strong>Email:</strong> {email}</p>
        <p className='text-base'><strong>Phone:</strong> {phone}</p>
        <p className='text-base'><strong>Message:</strong> {message}</p>
    </div>
  )
}

export default ContactCard