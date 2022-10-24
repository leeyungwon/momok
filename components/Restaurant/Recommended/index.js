import {
  useEffect,
  useState,
} from 'react'

import {
  PageWrap,
} from '~/styles/restaurant/common'

import Header from '../Common/Header'

const RecommendedRestaurantComponent = () => {
  const [
    restaurant,
    setRestaurant,
  ] = useState({})

  useEffect(() => {
    setRestaurant(() => {
      return JSON.parse(localStorage.getItem('recent-recommend'))
    })
  }, [])

  return (
    <PageWrap>
      <Header />

      <p>{restaurant.name}</p>
      <div>
        blah blah 별점 3점 (개수+) <a href="#">리뷰 남기기</a>
      </div>
      <div>
        지도 {restaurant.address} ({restaurant.lat} : {restaurant.lng})
      </div>
      <div>
        <div>{restaurant.type}</div>
        <div>거리 ({restaurant.lat} : {restaurant.lng})</div>
        <div>{restaurant.popular_menu}</div>
      </div>
    </PageWrap>
  )
}

export default RecommendedRestaurantComponent
