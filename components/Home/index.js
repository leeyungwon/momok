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
  axios,
} from '~/utils'

const HomeComponent = ({
  eggs,
}) => {
  const router = useRouter()

  const [
    isBreakingEgg,
    setIsBreakingEgg,
  ] = useState(false)
  const [
    myEggs,
    setMyEggs,
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
