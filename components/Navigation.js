import {
  useEffect,
  useState,
} from 'react'
import Link from 'next/link'
import {
  useRouter
} from 'next/router'
import _ from 'lodash'

import {
  StyledNav,
  StyledLink,
  StyledIcon,
} from '~/styles/navigation/navigation'

const Navigation = () => {
  const router = useRouter()
  const [
    navigation,
    setNavigation,
  ] = useState([
    {
      path: '/home',
      alias: [
        '/home',
        '/restaurant/recommended',
      ],
      icon: 'home',
      isActive: false,
    },
    {
      path: '/favorite',
      alias: ['/favorite'],
      icon: 'heart',
      isActive: false,
    },
    {
      path: '/user',
      alias: ['/user'],
      icon: 'user',
      isActive: false,
    },
    {
      path: '/history',
      alias: ['/history'],
      icon: 'history',
      isActive: false,
    },
  ])

  useEffect(() => {
    setNavigation(_.map(navigation, nav => {
      nav.isActive = nav.alias.indexOf(router.pathname) > -1

      return nav
    }))
  }, [router.pathname])

  return (
    <StyledNav>
      {
        _.map(navigation, nav => (
          <Link
            href={nav.path}
            key={nav.path}
            passHref
          >
            <StyledLink
              className={nav.isActive && 'active'}
            >
              <StyledIcon
                icon={nav.icon}
                className={
                  (nav.icon === 'home' || nav.icon === 'heart') && 'outlined'
                }
              />
            </StyledLink>
          </Link>
        ))
      }
    </StyledNav>
  )
}

export default Navigation
