import React from 'react'
import { useTranslation } from 'react-i18next'
import { XIcon } from '@heroicons/react/outline'

export const LangSelector = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  return (
    <div className="fixed flex flex-row right-6 bottom-8 w-36 rounded-lg px-3 py-2 shadow-2xl bg-gray-100 items-center">
      <div className="flex flex-col items-center">
        <div className="flex flex-row gap-2 select-none">
          {['en', 'ru'].map((v, i) => (
            <div
              key={i}
              onClick={() => changeLanguage(v)}
              className={v === i18n.language ? 'font-bold' : 'cursor-pointer'}
            >
              {v.toUpperCase()}
            </div>
          ))}
        </div>
        <p className="select-none">{t('lang')}</p>
      </div>
    </div>
  )
}

export const Toast = ({ heading, description, onClose, show }) => {
  const [recentTimeout, setRecentTimeout] = useState()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    clearTimeout(recentTimeout)
    if (show) {
      setTimeout(() => setVisible(true), 1)
    } else {
      handleClose()
    }
  }, [show])

  const handleClose = () => {
    setVisible(false)
    setRecentTimeout(setTimeout(onClose, 500))
  }

  return (
    <div
      className={classNames(
        'h-28 px-5 border-2 border-gray-100 w-full max-w-sm fixed bottom-0 -left-full m-4 bg-white rounded-xl flex flex-row gap-x-5 bg-gray-50 items-center justify-between shadow-2xl transition-all duration-500'
      )}
      style={{
        left: visible && '0',
      }}
    >
      <QuestionMarkCircleIcon className="h-16 w-16" />
      <div className="flex-shrink-0 flex-1">
        <h1 className="text-2xl font-thin">{heading}</h1>
        <p className="font-light">{description}</p>
      </div>
      <div
        className="w-5 h-5 mb-8 opacity-50 hover:opacity-100 transition-all duration-200 cursor-pointer"
        onClick={handleClose}
      >
        <XIcon />
      </div>
    </div>
  )
}
