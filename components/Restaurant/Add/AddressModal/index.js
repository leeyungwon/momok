import {
  useEffect,
  useState
} from 'react'
import _ from 'lodash'

import {
  SearchWrap,
  SearchKeywordInput,
  SearchBtn,
  SearchIcon,
} from '~/styles/restaurant/add/search'

import Modal from '~/components/Common/Modal'
import SearchResult from './SearchResult'

const AddressModal = ({
  Kakao,
  handleModal,
  setPlace,
}) => {
  const [
    userLocation,
    setUserLocation,
  ] = useState({})
  const [
    searchKeyword,
    setSearchKeyword,
  ] = useState('')
  const [
    searchResults,
    setSearchResults,
  ] = useState([])

  const handleSetPlace = place => {
    setPlace(place)
    handleModal(false)
  }

  const handleKeyPressKeyword = e => {
    if (e.key.toLowerCase() === 'enter') {
      submitSearchKeyword()
    }
  }

  const submitSearchKeyword = async () => {
    const location = new Kakao.maps.LatLng(userLocation.lat, userLocation.lng)
    const places = new Kakao.maps.services.Places()
    const callback = (result, status) => {
      if (status !== Kakao.maps.services.Status.OK) {
        return
      }

      const results = _.filter(result, place => (
        parseInt(place.distance, 10) < 1000
      ))

      setSearchResults(results)
    }

    places.keywordSearch(searchKeyword, callback, {
      location,
    })
  }

  useEffect(() => {
    // 사용자가 위치정보 사용을
    navigator.geolocation.getCurrentPosition(pos => {
      // 허용했을 경우 사용자 위치 기준 검색
      const userLocation = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }
      setUserLocation(userLocation)
    }, () => {
      // 거부했을 경우 회사 위치 기준으로 검색
      const companyLocation = {
        lat: 37.50508329231284,
        lng: 127.05549400986033,
      }
      setUserLocation(companyLocation)
    })
  }, [])

  return (
    <Modal
      title="주소찾기"
      handleIsShowModal={handleModal}
    >
      <SearchWrap>
        <SearchKeywordInput
          value={searchKeyword}
          placeholder="검색어를 입력해주세요"
          onChange={e => setSearchKeyword(e.target.value)}
          onKeyPress={handleKeyPressKeyword}
        />
        <SearchBtn onClick={submitSearchKeyword}>
          <SearchIcon icon="search" />
        </SearchBtn>
      </SearchWrap>

      {searchResults && _.map(searchResults, result => (
        <SearchResult
          key={result.id}
          place={result}
          setPlace={handleSetPlace}
        />
      ))}
    </Modal>
  )
}

export default AddressModal
