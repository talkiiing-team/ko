import React, { useEffect, useState } from 'react'
import Logo from '../../../../assets/img/mindgame.png'
import { MAIN_URL, PROFILE_URL } from '../../../../constants/routes'
import { ButtonCustom } from '../../../../components/ButtonCustom'
import { useTranslation } from 'react-i18next'

export const Header = ({
  gameId
}) => {
  const { t } = useTranslation()

  return (
    <div className="fixed bg-white border-b-2 border-gray-100 bg-opacity-95 backdrop-filter backdrop-blur-lg z-50 top-0 left-0 w-full h-20 flex justify-between gap-x-4 items-center p-6 py-2">
      <a href={MAIN_URL}>
        <img className="w-auto max-w-xl h-12" alt="Mind Games" src={Logo} />
      </a>
      <div className="w-full flex flex-row justify-end">
        <p className="text-lg my-2 text-gray-400">ID: {gameId}</p>
      </div>
    </div>
  )
}
