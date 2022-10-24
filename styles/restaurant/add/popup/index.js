import styled, {
  keyframes,
} from 'styled-components'

import Icon from '~/components/Common/Icon'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const PopupContainer = styled.div`
  padding: 20px;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, .2);
  animation-name: ${fadeIn};
  animation-fill-mode: both;
  animation-duration: 500ms;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  display: flex;
`

const PopupInner = styled.div`
  width: 100%;
  background-color: #FFF;
`

const PopupHeader = styled.div`
  padding: 8px 20px;
  border-bottom: 1px solid #DDD;
  position: relative;
`

const Title = styled.div`
  line-height: 30px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
`

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  transition: background-color .2s;
  position: absolute;
  top: 8px;
  right: 8px;

  &:active {
    background-color: rgba(0, 0, 0, .05);
  }
`

const PopupBody = styled.div`
  margin: 0;
`

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
}
