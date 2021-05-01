import React from 'react'
import Credits from '../../assets/img/logo.png'

export const Footer = () => (
  <footer className="w-full my-24 flex flex-col items-center justify-center">
    <img src={Credits} />
    <div className="pt-5">
      Сделано с <span className="animate-pulse">❤️</span> командой{' '}
      <a href="https://github.com/talkiiing">/talkiiing</a>
    </div>
  </footer>
)
