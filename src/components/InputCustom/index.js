import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'
const ErrorText = styled.p`
  text-align: center;
  font-size: 20px;
  color: red;
  margin: 32px 0 0;
`

export const Input = ({
  noError,
  errorMessage,
  onChange,
  type,
  placeholder,
  className,
}) => (
  <>
    <input
      className={classNames(
        'w-full h-12 py-3 px-6 shadow-innerXl rounded-xl focus:shadow-innerXxl outline-none focus:bg-gray-50 transition-all duration-200',
        className
      )}
      type={type}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value, event)}
    />
    {noError ? <ErrorText>{errorMessage}</ErrorText> : null}
  </>
)
