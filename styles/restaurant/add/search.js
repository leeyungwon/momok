import styled from 'styled-components'

import Icon from '~/components/Common/Icon'

const SearchWrap = styled.div`
  border-bottom: 1px solid #DDD;
  position: relative;
`

const SearchKeywordInput = styled.input`
  width: 100%;
  height: 45px;
  padding: 12px 85px 12px 20px;
  border: 0;
  font-size: 15px;
`

const SearchBtn = styled.button`
  width: 45px;
  height: 45px;
  transition: background-color .2s;
  position: absolute;
  top: 0;
  right: 0;

  &:active {
    background-color: rgba(0, 0, 0, .05);
  }
`

const SearchIcon = styled(Icon)`
  width: 20px;
  height: 20px;
  font-size: 20px;
  color: #888;
`

export {
  SearchWrap,
  SearchKeywordInput,
  SearchBtn,
  SearchIcon,
}
