import {
  useRouter,
} from 'next/router'

import {
  HeaderWrap,
  HeaderBtn,
  HeaderBtnIcon,
  Title,
} from '~/styles/restaurant/Common/header'

const Header = ({
  title,
}) => {
  const router = useRouter()

  const handleClickHeaderBtn = () => {
    router.back()
  }

  return (
    <HeaderWrap>
      <HeaderBtn onClick={handleClickHeaderBtn}>
        <HeaderBtnIcon icon="prev" />
      </HeaderBtn>
      {title && <Title>{title}</Title>}
    </HeaderWrap>
  )
}

export default Header
