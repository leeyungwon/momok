import Script from 'next/script'
import Head from 'next/head'
import {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react'

import {
  useDispatch,
  useSelector,
} from 'react-redux'
import {
  setLocation,
} from '~/utils/store/location'

import {
  PageWrap,
} from '~/styles/restaurant/common'

import Header from '../Common/Header'

const APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY

const RecommendedRestaurantComponent = () => {
  const dispatch = useDispatch()
  const {
    value: location,
  } = useSelector(state => state.location)

  const mapRef = useRef(null)

  const [
    restaurant,
    setRestaurant,
  ] = useState({})

  const initMap = useCallback(() => {
    if (mapRef.current) {
      const rest = JSON.parse(localStorage.getItem('recent-recommend'))
      /**
       * Lat Lng 잘못 저장하고 있어서 임시로 반대로 입력하여 사용함
       */
      // const restaurantLocation = new kakao.maps.LatLng(parseFloat(rest.lat), parseFloat(rest.lng))
      const restaurantLocation = new kakao.maps.LatLng(parseFloat(rest.lng), parseFloat(rest.lat))
      const map = new kakao.maps.Map(mapRef.current, {
        center: restaurantLocation,
        level: 3,
      })

      const marker = new kakao.maps.Marker({
        map,
        position: restaurantLocation,
      })
    }
  }, [])

  useEffect(() => {
    setRestaurant(JSON.parse(localStorage.getItem('recent-recommend')))

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
    if (window?.kakao) {
      initMap()
    }
  }, [initMap])

  return (
    <PageWrap>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false&libraries=services,clusterer,drawing`}
        onLoad={() => {kakao.maps.load(initMap)}}
      />
      <Head>
        <link rel='preconnect' href='https://dapi.kakao.com' />
        <link rel='dns-prefetch' href='https://dapi.kakao.com' />
      </Head>

      <Header />

      <p>{restaurant.name}</p>
      <div>
        {parseInt(restaurant.grade, 10)}점 <a href="#">리뷰 남기기</a>
      </div>
      <div
        ref={mapRef}
        style={{
          width: 331,
          height: 331,
          position: 'relative'
        }}
      ></div>
      <div>
        <div>{restaurant.type}</div>
        <div>{restaurant.distance}</div>
        <div>{restaurant.popular_menu}</div>
      </div>
    </PageWrap>
  )
}

export default RecommendedRestaurantComponent
