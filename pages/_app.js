import Head from 'next/head'
import {
  Provider,
} from 'react-redux'

import {
  store,
} from '~/utils/store'

import DefaultLayout from '~/layouts/default'

import '~/styles/common/common.css'

const MyApp = ({ Component, pageProps }) => {
  if (!Component.getLayout) {
    Component.getLayout = page => <DefaultLayout>{page}</DefaultLayout>
  }

  const getLayout = Component.getLayout

  return getLayout(
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <Component
        {...pageProps}
      />
    </Provider>
  )
}

export default MyApp
