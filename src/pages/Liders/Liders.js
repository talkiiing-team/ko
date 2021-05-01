import React, { useState, useEffect } from 'react'
import { Header } from '../Main/components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getLiders } from '../../store/Profile/actions'

export const Liders = ({ history }) => {
  const dispatch = useDispatch()
  const [nickname, setNickname] = useState('')
  const [list, setList] = useState([])
  const liders = useSelector((state) => state.profile.liders)

  useEffect(() => {
    dispatch(getLiders())
  }, [])

  useEffect(() => {
    if (nickname && nickname !== '') {
      setList(
        liders.filter(
          (item) =>
            item.nickname.indexOf(nickname) !== -1 ||
            item.id.toString().indexOf(nickname) !== -1
        )
      )
    } else {
      setList(liders)
    }
  }, [nickname, liders])

  return (
    <div className="container px-6 pt-32">
      <Header
        history={history}
        profile={true}
        setSearchType={() => console.log()}
        setNicknameFunc={(val) => setNickname(val)}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-7 gap-x-12">
        <div className="grid grid-cols-userRating gap-x-5 text-gray-500 items-end">
          <div className="text-right col-start-2">№</div>
          <div>Никнейм</div>
          <div className="text-right">Очки</div>
          <div>Коэф. побед</div>
        </div>
        <div className="hidden lg:grid! grid-cols-userRating gap-x-5 text-gray-500 items-end">
          <div className="text-right col-start-2">№</div>
          <div>Никнейм</div>
          <div className="text-right">Очки</div>
          <div>Коэф. побед</div>
        </div>
        {list.map((item, i) => {
          return (
            <div className="grid grid-cols-userRating gap-x-5 text-lg items-center" key={i}>
              <img className="w-12 h-12 rounded-full" src={item.avatar} />
              <div className="font-thin text-lg text-right">{i+1}</div>
              <div>{item.nickname} ({item.id})</div>
              <div className="text-right">
                {item.pts}pts / {item?.position}th
              </div>
              <div>
                <span className="text-red-500">{item.winrate.split('/')[0]}</span>
                &nbsp;/&nbsp;
                <span className="text-green-500">{item.winrate.split('/')[1]}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Liders
