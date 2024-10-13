import { Container } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Footer from '../organisms/layout/Footer'
import Header from '../organisms/layout/Header'
import Nav from '../organisms/layout/Nav'

const DefaultTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
      <Nav />
      <Footer />
    </>
  )
}

export default DefaultTemplate
