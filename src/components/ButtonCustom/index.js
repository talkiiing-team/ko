import React from 'react'
import classNames from 'classnames'

export const ButtonCustom = ({
  onClick,
  children,
  disabled,
  className,
  active,
}) => (
  <button
    className={classNames(
      `h-12 p-3 w-2xl rounded-lg shadow-lg bg-gray-100 hover:bg-gray-200
      hover:shadow-sm transition-all duration-200
      focus:outline-none outline-none
      flex items-center justify-center select-none
      `,
      {
        'opacity-40 pointer-events-none': disabled,
        'opacity-60 bg-gray-200': active,
      },
      className
    )}
    onClick={onClick}
  >
    {children}
  </button>
)
