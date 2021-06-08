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
  value,
  readonly,
  disabled,
  maxLength,
}) => (
  <>
    <input
      className={classNames(
        'w-full h-12 py-3 px-6 shadow-innerXl rounded-xl focus:shadow-innerXxl outline-none focus:bg-gray-50 transition-all duration-200',
        className,
        {
          'opacity-50 pointer-events-none': disabled,
        }
      )}
      type={type}
      placeholder={placeholder}
      value={value}
      readOnly={!!readonly}
      disabled={!!disabled}
      maxLength={maxLength || undefined}
      onChange={(event) => onChange(event.target.value, event)}
    />
    {noError ? <ErrorText>{errorMessage}</ErrorText> : null}
  </>
)
