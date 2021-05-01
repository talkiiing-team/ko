import React, { useEffect } from 'react'
import styled from 'styled-components'

const Info = ({ turns }) => {
  return (
    <div className="overflow-y-scroll mt-8 h-full max-h-96">
      <div className="px-4 py-4 bg-gray-100 rounded-md m-1">
        {turns.map((item) => {
          const [time, text] = item.split(": ")
          return (
            <p>
              <span className="text-lg font-light text-gray-800">{time}</span>
              <span className="text-lg font-light">: {text}</span>
            </p>
          )
        })}
      </div>
    </div>
  )
}

export default Info
