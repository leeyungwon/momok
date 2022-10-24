import {
  useEffect,
  useState
} from 'react'
import _ from 'lodash'

import {
  PopupContainer,
  PopupInner,
  PopupHeader,
  Title,
  CloseButton,
  PopupBody,
  SearchWrap,
  SearchKeywordInput,
  SearchBtn,
  SearchIcon,
} from '~/styles/restaurant/add/popup'

import SearchResult from './SearchResult'

const AddressPopup = ({
  Kakao,
  handlePopup,
  setPlace,
}) => {
  const [
    userPosition,
    setUserPosition,
  ] = useState({})
  const [
    searchKeyword,
    setSearchKeyword,
  ] = useState('')
  const [
    searchResults,
    setSearchResults,
  ] = useState([])

  const handleClickCloseBtn = () => {
    handlePopup(false)
  }

  const handleSetPlace = place => {
    setPlace(place)
    handlePopup(false)
  }

  const handleKeyPressKeyword = e => {
    if (e.key.toLowerCase() === 'enter') {
      submitSearchKeyword()
    }
  }

  const submitSearchKeyword = async () => {
    const userLocatn = new Kakao.maps.LatLng(userPosition.lat, userPosition.lng)
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
      location: userLocatn,
    })
  }

  useEffect(() => {
    // 사용자가 위치정보 사용을 허용했을 경우 사용자 위치 기준,
    // 거부했을 경우 회사 위치 기준으로 검색
    navigator.geolocation.getCurrentPosition(pos => {
      setUserPosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      })
    }, err => {
      setUserPosition({
        lat: 37.50508329231284,
        lng: 127.05549400986033,
      })
    })
  }, [])

  return (
    <PopupContainer onClick={() => {handlePopup(false)}}>
      <PopupInner onClick={e => {e.stopPropagation()}}>
        <PopupHeader>
          <Title>주소찾기</Title>
          <CloseButton
            onClick={handleClickCloseBtn}
          >×</CloseButton>
        </PopupHeader>
        <PopupBody>
          <SearchWrap>
            <SearchKeywordInput
              value={searchKeyword}
              placeholder="검색어를 입력해주세요"
              onChange={e => setSearchKeyword(e.target.value)}
              onKeyPress={handleKeyPressKeyword}
            />
            <SearchBtn
              onClick={submitSearchKeyword}
            >
              <SearchIcon icon="search" />
            </SearchBtn>
          </SearchWrap>
          {searchResults && <>
            {_.map(searchResults, result => (
              <SearchResult
                key={result.id}
                place={result}
                setPlace={handleSetPlace}
              />
            ))}
          </>}
        </PopupBody>
      </PopupInner>
    </PopupContainer>
  )
}

export default AddressPopup
