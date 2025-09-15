import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { LuImage, LuX } from 'react-icons/lu'

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [open] = useState(true)
  return (
    <div className='relative z-50'>
      <button
        className='w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-md shadow-gray-200/50 absolute -top-2 -right-2 z-10 cursor-pointer'
        onClick={onSelect.bind(null, icon)}
      >
        <LuX />
      </button>
      <EmojiPicker
        open={open}
        onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || '')}
      />
    </div>
  )
}

export default EmojiPickerPopup
