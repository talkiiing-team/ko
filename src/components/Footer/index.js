import React from 'react'
import Credits from '../../assets/img/logo.png'
import { useTranslation } from 'react-i18next'

export const Footer = () => {

  const { t } = useTranslation()

  return (
    <footer className="w-full my-24 flex flex-col items-center justify-center">
      <img src={Credits} />
      <div className="pt-5">
        {t('common.us.madeWith')} <span className="animate-pulse">❤️</span> {t('common.us.byTeam')}{' '}
        <a href="https://github.com/talkiiing" className="border-b-2 border-dotted">/talkiiing</a>
      </div>
    </footer>
  )
}
