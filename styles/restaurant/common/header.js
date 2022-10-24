import styled from 'styled-components'
import Icon from '~/components/Common/Icon'

const HeaderWrap = styled.div`
  height: 38px;
  margin-bottom: 35px;
  position: relative;
`

const HeaderBtn = styled.button`
  width: 38px;
  height: 38px;
  box-shadow: 5px 10px 20px #D3D1D8;
  border-radius: 12px;
  background-color: #FFF;
  transition: background-color .2s;
  position: absolute;
  top: 0;
  left: 0;

  &:active {
    background-color: rgba(0, 0, 0, .05);
  }
`

const HeaderBtnIcon = styled(Icon)`
  height: 16px;
  font-size: 16px;
  display: block;
`

const Title = styled.p`
  line-height: 38px;
  text-align: center;
  font-weight: 500;
  font-size: 18px;
`

export {
  HeaderWrap,
  HeaderBtn,
  HeaderBtnIcon,
  Title,
}
