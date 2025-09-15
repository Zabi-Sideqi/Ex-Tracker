
import React from 'react'

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
        <p className='text-sm'>{content}</p>
        <div className='flex justify-end gap-4 mt-6'>
            <button
            type='button'
            className='add-btn'
            onClick={onDelete}
            >
                Delete
            </button>

    </div>
    </div>
  )
}

export default DeleteAlert