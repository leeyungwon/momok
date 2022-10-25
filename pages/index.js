import Icon from '~/components/Common/Icon'
import Transition from '~/components/Common/Transition'

import Link from 'next/link'

import {
  useDispatch,
  useSelector,
} from 'react-redux'
import {
  setUser,
  resetUser,
} from '~/utils/store/user'

const Home = () => {
  const dispatch = useDispatch()
  const {
    value: user,
  } = useSelector(state => state.user)

  return (
    <Transition>
      <div>
        <h3 style={{
          fontSize: 20,
          textAlign: 'center',
        }}>메인</h3>

        <div
          style={{
            display: 'flex',
          }}
        >
          <div style={{margin:10,}}>
            <p style={{ textAlign: 'center' }}>Link</p>
            <Link href="/icon-list">Icon-list</Link><br />
            <Link href="/page_01">page_01</Link><br />
            <Link href="/page_02">page_02</Link><br />
            <Link href="/home">Home</Link><br />
          </div>
          <div style={{margin:10,}}>
            <p style={{ textAlign: 'center' }}>아이콘 예제</p>
            <Icon
              icon="chicken"
              style={{
                fontSize: '50px',
              }}
            />
            <Icon
              icon="egg"
              style={{
                fontSize: '50px',
              }}
            />
          </div>
        </div>

        <div>
          <p>User Reducer</p>
          <button onClick={() => {dispatch(setUser({
            id: 1,
            name: 'test',
            email: 'o_yg.lee@cnccompany.net',
          }))}}>Set to test user</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={() => {dispatch(resetUser())}}>Reset user</button>
          <p>{JSON.stringify(user)}</p>
        </div>
      </div>
    </Transition>
  )
}

export default Home
