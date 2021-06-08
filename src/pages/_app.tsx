import React from 'react'
import { AppProps } from 'next/app'

import 'antd/dist/antd.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
