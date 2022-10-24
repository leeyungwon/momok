import {
  SearchResultItemBtn,
  ResultName,
  ResultAddress,
} from '~/styles/restaurant/add/popup/search-result'

const SearchResult = ({
  place,
  setPlace,
}) => {
  const handleClickItemBtn = () => {
    setPlace(place)
  }

  return (
    <SearchResultItemBtn
      onClick={handleClickItemBtn}
    >
      <ResultName>{place.place_name}</ResultName>
      <ResultAddress>
        {place.road_address_name} (거리: {place.distance}m)
      </ResultAddress>
    </SearchResultItemBtn>
  )
}

export default SearchResult
