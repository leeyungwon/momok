import styled from 'styled-components'

import Icon from "~/components/Common/Icon"

const StyledNav = styled.nav`
  height: 74px;
  background-color: #FFF;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  box-shadow:0px -4px 20px rgba(63, 76, 95, 0.12);
`

const StyledLink = styled.a`
  transition: color .2s, background-color .2s;
  justify-content: center;
  align-items: center;
  transition: background-color .2s;
  flex: 1;
  display: flex;

  &:active {
    background-color: rgba(0, 0, 0, .05);
  }

  &:not(.active) .icon.outlined {
    color: #FFF;
    -webkit-text-stroke: 2px #ADADAF;
  }

  &.active {
    .icon {
      color: #FE724C;
      text-shadow: 0px 6px 20px rgba(215, 56, 0, .4);
    }
  }
`

const StyledIcon = styled(Icon)`
  font-size: 30px;
  color: #ADADAF;
`

export {
  StyledNav,
  StyledLink,
  StyledIcon,
}
