// ProfilePhotoInput.jsx
import React from 'react'
import { FiUpload, FiTrash } from 'react-icons/fi'
import { FaUserCircle } from 'react-icons/fa'

const ProfilePhotoInput = ({ image, setImage }) => {
  const handleRemoveImage = () => setImage(null)

  return (
    <div className='flex flex-col items-center w-full mb-4'>
      <label htmlFor='profile-photo-upload' className='relative cursor-pointer'>
        <div className='w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-purple-300 shadow-md overflow-hidden'>
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt='Profile Preview'
              className='w-full h-full object-cover rounded-full border border-gray-300'
            />
          ) : (
            <FaUserCircle className='text-6xl text-gray-400' />
          )}
        </div>
        <input
          id='profile-photo-upload'
          type='file'
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
          className='absolute inset-0 opacity-0 cursor-pointer w-24 h-24'
        />
      </label>
      {image && (
        <button
          type='button'
          onClick={handleRemoveImage}
          className='mt-2 flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200 shadow'
          title='Remove profile photo'
        >
          <FiTrash className='text-lg' />
        </button>
      )}
      <div className='flex flex-col items-center mt-2'>
        <FiUpload className='text-2xl text-purple-400 mb-1' />
        <span className='text-xs text-gray-600 font-medium'>
          Upload profile photo
        </span>
      </div>
    </div>
  )
}

export { ProfilePhotoInput }
