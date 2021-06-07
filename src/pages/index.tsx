import React from 'react'
import Head from 'next/head'

import { Container } from './styles/home'

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>

      <h1>Clean Architecture</h1>
      <p>Next.js + TypeScript + TDD made by Netkings</p>
    </Container>
  )
}

export default Home
