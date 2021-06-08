import React from 'react'
import Credits from '../../assets/img/logo.png'
import { useTranslation } from 'react-i18next'

export const Footer = () => {

  const { t } = useTranslation()

  return (
    <footer className="w-full my-20 mb-20 flex flex-col items-center justify-center">
      <div className="pt-5">
        {t('common.us.madeWith')}{' '}<span className="animate-pulse">❤️</span>{' '}{t('common.us.byTeam')}{' '}
        <a href="https://github.com/talkiiing" className="border-b-2 border-dotted border-gray-500">/talkiiing</a>
      </div>
      <img className="mt-4 px-8" src={Credits} />
    </footer>
  )
}
