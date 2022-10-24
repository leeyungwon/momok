import Script from 'next/script'
import {
  useRouter,
} from 'next/router'
import {
  useState,
} from 'react'
import _ from 'lodash'

import {
  axios,
} from '~/utils'

import {
  PageWrap,
  SubmitBtn,
} from '~/styles/restaurant/add'

import Header from './Header'
import Form from './Form'
import AddressPopup from './AddressPopup'

const APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY

const AddRestaurantComponent = () => {
  const router = useRouter()

  const [
    Kakao,
    setKakao,
  ] = useState(null)
  const [
    isShowAddressPopup,
    setIsShowAddressPopup,
  ] = useState(false)
  const [
    datas,
    setDatas,
  ] = useState([
    {
      order: 1,
      title: '식당이름',
      type: 'input',
      name: 'name',
      value: '',
    },
    {
      order: 2,
      title: '종류',
      type: 'select',
      name: 'type',
      options: [
        '양식', '한식', '일식',
        '중식', '퓨전', '기타',
      ],
      value: '',
    },
    {
      order: 3,
      title: '대표메뉴',
      type: 'input',
      name: 'popular_menu',
      value: '',
    },
    {
      order: 4,
      title: '주소',
      type: 'address',
      name: 'address',
      value: {},
    },
    {
      order: 5,
      title: '맵기',
      type: 'select',
      name: 'spicy',
      options: [
        '안매워요',
        '매콤해요',
        '매워요',
      ],
      value: '',
    },
  ])

  const handleSetPlace = place => {
    handleChangeData('address', place)
  }

  const handlePopup = status => {
    setIsShowAddressPopup(status)
  }

  const handleChangeData = (name, value) => {
    setDatas(oldDatas => {
      const target = _.find(oldDatas, data => data.name === name)
      const others = _.filter(oldDatas, data => data.name !== name)

      target.value = value

      const newDatas = _.sortBy(_.concat(target, others), 'order')

      return newDatas
    })
  }

  const handleSubmitData = async () => {
    let notInputted = _.find(datas, d => !d.value)
    if (notInputted) {
      alert(`${notInputted.title}를 입력해주세요`)
      return
    }

    let data = {}
    let address = {}
    _.forEach(datas, d => {
      if (d.name === 'spicy') {
        let spicyIndex = _.findIndex(d.options, option => option === d.value)
        data[d.name] = spicyIndex + 1

        return
      }

      if (d.name === 'address') {
        address = d.value
        return
      }

      data[d.name] = d.value
    })

    data.address = address.road_address_name
    data.lat = address.x
    data.lng = address.y
    data.palce_id = address.id

    let response
    try {
      response = await axios({
        method: 'POST',
        url: '/api/restaurant/restaurant',
        data,
      })

      alert('등록이 완료되었읍니다.')
    }
    catch (err) {
      alert('등록에 실패하였읍니다.')
      throw new Error(err)
    }

    router.back()
  }

  return (
    <PageWrap>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false&libraries=services,clusterer,drawing`}
        onLoad={async () => {
          await window.kakao.maps.load()
          setKakao(window.kakao)
        }}
      />

      <Header />
      {_.map(datas, data => (
        <Form
          key={data.name}
          title={data.title}
          type={data.type}
          name={data.name}
          options={data.options}
          dataValue={data.value}
          onHandleChangeData={handleChangeData}
          handlePopup={handlePopup}
        />
      ))}
      <SubmitBtn
        onClick={handleSubmitData}
      >
        등록하고 달걀 받기
      </SubmitBtn>

      {isShowAddressPopup && <AddressPopup
        Kakao={Kakao}
        handlePopup={handlePopup}
        setPlace={handleSetPlace}
      />}
    </PageWrap>
  )
}

export default AddRestaurantComponent
