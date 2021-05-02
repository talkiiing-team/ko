import React, { useEffect, useState } from 'react'
import { QuestionMarkCircleIcon, XIcon } from '@heroicons/react/outline'
import classNames from 'classnames'

export const Toast = ({ heading, description, onClose }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 1)
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 500)
  }

  return (
    <div
      className={classNames(
        'h-28 px-5 border-2 border-gray-100  w-full max-w-sm fixed bottom-0 -left-full m-4 bg-white rounded-xl flex flex-row gap-x-5 bg-gray-50 items-center justify-between shadow-2xl transition-all duration-500'
      )}
      style={{
        left: visible && '0',
      }}
    >
      <QuestionMarkCircleIcon className="h-16 w-16" />
      <div className="flex-shrink-0 flex-1">
        <h1 className="text-2xl font-thin">{heading}</h1>
        <p className="font-light">{description}</p>
      </div>
      <div
        className="w-5 h-5 mb-8 opacity-50 hover:opacity-100 transition-all duration-200 cursor-pointer"
        onClick={handleClose}
      >
        <XIcon />
      </div>
    </div>
  )
}
