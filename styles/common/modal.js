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

const ModalContainer = styled.div`
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

const ModalInner = styled.div`
  width: 100%;
  background-color: #FFF;
`

const ModalHeader = styled.div`
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

const ModalBody = styled.div`
  margin: 0;
`

export {
  ModalContainer,
  ModalInner,
  ModalHeader,
  Title,
  CloseButton,
  ModalBody,
}
