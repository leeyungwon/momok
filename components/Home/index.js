import {
  useEffect,
  useState,
} from 'react'
import {
  PageWrap,
  AddRestaurantBtn,
  ContentBox,
  ContentClickableArea,
  ContentIcon,
  ContentText,
} from '~/styles/home/home'
import {
  useRouter,
} from 'next/router'

import {
  useDispatch,
} from 'react-redux'
import {
  setLocation,
} from '~/utils/store/location'

import {
  axios,
} from '~/utils'

const HomeComponent = ({
  eggs,
}) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [
    isBreakingEgg,
    setIsBreakingEgg,
  ] = useState(false)
  const [
    myEggs,
  ] = useState(eggs)
  const [
    content,
    setContent,
  ] = useState({
    icon: '',
    message: '',
  })

  const handleClickAddRestaurant = () => {
    router.push('/restaurant/add')
  }

  const handleClickContent = () => {
    if (isBreakingEgg) {
      return
    }

    if (!myEggs) {
      router.push('/restaurant/add')
      return
    }

    if (myEggs) {
      setIsBreakingEgg(true)
      return
    }
  }

  const animateEggBreaking = async () => {
    setContent({
      icon: 'broken-egg',
      message: `...`,
    })
    await new Promise(r => setTimeout(r, 700))
    setContent({
      icon: 'broken-egg',
      message: `....`,
    })
    await new Promise(r => setTimeout(r, 700))
    setContent({
      icon: 'broken-egg',
      message: `.....`,
    })

    await new Promise(r => setTimeout(r, 1200))

    setContent({
      icon: 'fried-egg',
      message: `Wow!`,
    })

    await new Promise(r => setTimeout(r, 1500))

    let recentRecommend = JSON.parse(localStorage.getItem('recent-recommend'))

    const response = await axios({
      method: 'GET',
      url: '/api/restaurant/restaurant',
      params: {
        restaurantIdx: recentRecommend?.idx || 0,
      },
    })
    const recommended = response.data.result

    localStorage.setItem('recent-recommend', JSON.stringify(recommended))

    router.push('/restaurant/recommended')
  }

  useEffect(() => {
    if (myEggs) {
      setContent({
        icon: 'egg',
        message: `Click to eat (${myEggs}/2)`,
      })
    }
    else {
      setContent({
        icon: 'question-egg',
        message: `등록하고 달걀 받기`,
      })
    }

    // 사용자가 위치정보 사용을
    navigator.geolocation.getCurrentPosition(pos => {
      // 허용했을 경우 사용자 위치 기준 검색
      const userLocation = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }
      dispatch(setLocation(userLocation))
    }, () => {
      // 거부했을 경우 회사 위치 기준으로 검색
      const companyLocation = {
        lat: 37.50508329231284,
        lng: 127.05549400986033,
      }
      dispatch(setLocation(companyLocation))
    })
  }, [])

  useEffect(() => {
    if (isBreakingEgg) {
      animateEggBreaking()
    }
  }, [isBreakingEgg])

  return (
    <PageWrap>
      {
        !isBreakingEgg && myEggs ?
        <AddRestaurantBtn onClick={handleClickAddRestaurant}>
          등록하고 달걀 받기
        </AddRestaurantBtn>
        : <></>
      }

      <ContentBox>
        <ContentClickableArea onClick={handleClickContent}>
          <ContentIcon
            icon={content.icon}
            className={ isBreakingEgg && 'shaking' }
          />
          <ContentText>
            {content.message}
          </ContentText>
        </ContentClickableArea>
      </ContentBox>
    </PageWrap>
  )
}

export default HomeComponent
