import React, { useEffect, useState } from 'react'
import Logo from '../../../../assets/img/mindgame.png'
import { MAIN_URL, PROFILE_URL } from '../../../../constants/routes'
import { ButtonCustom } from '../../../../components/ButtonCustom'
import { Input } from '../../../../components/InputCustom'
import { HomeIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

export const Header = ({
  history,
  setSearchType,
  searchType,
  nickname,
  pts,
  winrate,
  avatar,
  profile,
  setNicknameFunc,
  onlyLogo,
}) => {

  const { t } = useTranslation()

  return (
    <div
      className={classNames(
        'fixed bg-white border-b-2 border-gray-100 transition-all duration-200 opacity-90 backdrop-filter backdrop-blur-lg z-50 top-0 left-0 w-full h-32 flex gap-x-4 items-center p-6',
        {
          'justify-between': !onlyLogo,
          'justify-center': onlyLogo,
        }
      )}
    >
      <a
        href={
          searchType !== 'ConnectRandom' && searchType !== 'ConnectCode'
            ? MAIN_URL
            : '#'
        }
      >
        <img className="w-auto max-w-xl h-16" alt="logo" src={Logo} />
      </a>
      {!onlyLogo &&
        (!profile ? (
          <div>
            <div
              className="grid grid-flow-col"
              onClick={() => {
                if (
                  searchType !== 'ConnectRandom' &&
                  searchType !== 'ConnectCode'
                ) {
                  history.push(PROFILE_URL)
                }
              }}
            >
              <div className="flex items-center">
                <div className="grid grid-flow-row gap-y-1 text-right">
                  <div className="font-bold text-4xl">{nickname || ''}</div>
                  <div>{pts || 0}pts</div>
                  <div>{winrate || ''}</div>
                </div>
              </div>
              <img
                className="ml-3 w-24 h-24 rounded-full"
                alt="avatar"
                src={avatar}
              />
            </div>
          </div>
        ) : (
          <>
            <Input
              className="max-w-3xl self-center"
              onChange={(e) => setNicknameFunc(e)}
              textAlign="left"
              placeholder={t('leaders.enterNameOrNumber')}
            />
            <ButtonCustom
              className="w-12 h-12 flex-shrink-0"
              onClick={() => {
                history.push(MAIN_URL)
              }}
            >
              <HomeIcon className="w-8 h-8" />
            </ButtonCustom>
          </>
        ))}
    </div>
  )
}
