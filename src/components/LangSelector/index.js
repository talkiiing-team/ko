import React from 'react'
import { useTranslation } from 'react-i18next'

export const LangSelector = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  return (
    <div className="fixed right-6 bottom-8 w-36 rounded-lg px-3 py-2 shadow-2xl bg-gray-100 flex flex-col items-center">
      <div className="flex flex-row gap-2 select-none">
        {['en', 'ru'].map((v) => (
          <div
            onClick={() => changeLanguage(v)}
            className={
              (v === i18n.language ? 'font-bold' : 'cursor-pointer')
            }
          >
            {v.toUpperCase()}
          </div>
        ))}
      </div>
      <p>{t('lang')}</p>
    </div>
  )
}
