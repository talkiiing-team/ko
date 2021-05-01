import React from 'react'
import classNames from 'classnames'

export const ButtonCustom = ({ onClick, children, disabled, className }) => (
  <button
    className={classNames(
      `h-12 w-2xl rounded-lg shadow-xl bg-gray-50 hover:bg-gray-100
      hover:shadow-lg transition-all duration-200
      focus:outline-none outline-none
      flex items-center justify-center
      `,
      {
        'opacity-40 pointer-events-none': disabled,
      },
      className
    )}
    onClick={onClick}
  >
    {children}
  </button>
)
