import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DateTime } from 'luxon'

const Info = ({ turns }) => {
  const { t } = useTranslation()

  const timeConverter = (UNIX_timestamp) => {
    return DateTime.fromMillis(UNIX_timestamp).toFormat(t("timeFormat"))
  }

  return (
    <div className="">
      <p className="w-full p-2 mb-2 text-2xl text-gray-700 font-bold select-none bg-transparent">
        {t('gameHistory')}
      </p>
      <div className="overflow-y-scroll h-full max-h-96 px-4 py-4 bg-gray-100 rounded-md m-1">
        {turns.map((item, i) => {
          const {time, place, turn} = item
          return (
            <p key={i}>
              <span className="text-lg font-light text-gray-800">{timeConverter(time)}</span>
              <span className="text-lg font-light">: {`${t(turn)} ${t('madeAMove')} ${place}`}</span>
            </p>
          )
        })}
      </div>
    </div>
  )
}

export default Info
