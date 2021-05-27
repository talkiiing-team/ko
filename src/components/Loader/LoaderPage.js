import React from 'react'
import Loader from 'react-loader-spinner'

const LoaderPage = ({ text }) => {
  return (
    <div className="w-full h-full absolute left-0 top-0 bg-white bg-opacity-50 z-50 flex justify-center items-center">
      <div className="grid grid-flow-row gap-y-6 items-center text-center justify-center p-8 rounded-xl bg-white shadow-lg animate-bounce">
        <Loader
          className="mx-auto"
          type="Grid"
          color="#3b3b3b"
          height={56}
          width={56}
        />
        <p className="font-light text-xl">{text || 'Применение...'}</p>
      </div>
    </div>
  )
}

export default LoaderPage
