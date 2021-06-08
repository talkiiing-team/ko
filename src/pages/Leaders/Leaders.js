import React, { useState, useEffect } from 'react'
import { Header } from '../Main/components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getLiders } from '../../store/Profile/actions'
import LoaderPage from '../../components/Loader/LoaderPage'
import { useTranslation } from 'react-i18next'

export const Leaders = ({ history }) => {
  const dispatch = useDispatch()
  const [nickname, setNickname] = useState('')
  const [list, setList] = useState([])
  const leaders = useSelector((state) => state.profile.liders)

  const { t } = useTranslation()

  useEffect(() => {
    dispatch(getLiders())
  }, [])

  useEffect(() => {
    if (nickname !== '') {
      setList(
        leaders.filter(
          (item) =>
            item.nickname.toLowerCase().includes(nickname.toLowerCase()) ||
            item.id.toString() === nickname
        )
      )
    } else {
      setList(leaders)
    }
  }, [nickname, leaders])

  const ellipsis = (str) => (str.length > 10 ? str.slice(0, 10) + '...' : str)

  return (
    <div className="container px-6 pt-24">
      <Header
        history={history}
        profile={true}
        setNicknameFunc={(val) => setNickname(val)}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-12">
        <div className="grid grid-cols-userRating gap-x-2 text-gray-500 items-end">
          <div className="text-right col-start-2">№</div>
          <div>{t('leaders.nickname')}</div>
          <div className="text-right">{t('leaders.points')}</div>
          <div className="text-center">{t('leaders.winrate')}</div>
        </div>
        <div className="hidden lg:grid grid-cols-userRating gap-x-2 text-gray-500 items-end">
          <div className="text-right col-start-2">№</div>
          <div>{t('leaders.nickname')}</div>
          <div className="text-right">{t('leaders.points')}</div>
          <div className="text-center">{t('leaders.winrate')}</div>
        </div>
        {list.length > 0 || nickname ? (
          list.map((item, i) => {
            return (
              <div
                className="w-full max-w-full grid grid-cols-userRating gap-x-2 text-lg items-center"
                key={i}
              >
                <img className="w-12 h-12 rounded-full" src={item.avatar} />
                <div className="font-thin text-lg text-right">{i + 1}</div>
                <div className="w-full flex flex-col lg:flex-row lg:gap-x-3">
                  {ellipsis(item.nickname)}
                  <span className="text-gray-500 text-sm lg:text-lg">#{item.id}</span>
                </div>
                <div className="text-right text-sm lg:text-lg">{item.pts}</div>
                <div className="text-center text-sm lg:text-lg">
                  <span className="text-green-500">
                    {item.winrate.split('/')[1]}
                  </span>
                  &nbsp;|&nbsp;
                  <span className="text-red-500">
                    {item.winrate.split('/')[0]}
                  </span>
                </div>
              </div>
            )
          })
        ) : (
          <LoaderPage text={t('common.downloading')} />
        )}
      </div>
    </div>
  )
}

export default Leaders
