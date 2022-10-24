import styled from 'styled-components'

const SearchResultItemBtn = styled.button`
  width: 100%;
  padding: 10px 20px;
  text-align: left;
  transition: background-color .2s;

  &:active {
    background-color: rgba(0, 0, 0, .05);
  }
`

const ResultName = styled.p`
  font-weight: 500;
  font-size: 17px;
  color: #444;
`

const ResultAddress = styled.p`
  margin-top: 5px;
  font-size: 13px;
  color: #888;
`

export {
  SearchResultItemBtn,
  ResultName,
  ResultAddress,
}
