import {
  useEffect,
  useState,
} from 'react'
import {
  useSelector,
} from 'react-redux'
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
  const {
    value: userLocation,
  } = useSelector(state => state.location)

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
