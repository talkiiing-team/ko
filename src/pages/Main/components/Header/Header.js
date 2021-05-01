import React from 'react'
import styled from 'styled-components'
import Logo from '../../../../assets/img/logo.png'
import { MAIN_URL, PROFILE_URL } from '../../../../constants/routes'
import { ButtonCustom } from '../../../../components/ButtonCustom'
import { Input } from '../../../../components/InputCustom'
import { MenuIcon } from '@heroicons/react/outline'

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
}) => (
  <div className="fixed bg-white backdrop-filter backdrop-blur-lg z-50 top-0 left-0 w-full h-20 flex justify-between p-6 ">
    <div
      onClick={() => {
        if (searchType !== 'ConnectRandom' && searchType !== 'ConnectCode') {
          history.push(MAIN_URL)
          setSearchType('')
        }
      }}
    >
      <img className="w-full max-w-xl h-auto" alt="logo" src={Logo} />
    </div>
    {!profile ? (
      <div>
        <div
          className="grid grid-flow-col"
          onClick={() => {
            if (
              searchType !== 'ConnectRandom' &&
              searchType !== 'ConnectCode'
            ) {
              history.push(PROFILE_URL)
              setSearchType('')
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
          onChange={(e) => setNicknameFunc(e)}
          width="500px"
          mr={40}
          textAlign="left"
          placeholder="Введите ник или номер игрока"
        />
        <ButtonCustom
          className="w-12 h-12"
          onClick={() => {
            history.push(MAIN_URL)
            setSearchType('')
          }}
        >
          <MenuIcon className="w-8 h-8" />
        </ButtonCustom>
      </>
    )}
  </div>
)
