import { Container } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Header from '../organisms/layout/Header'
import IntersectingNavFooter from '../organisms/layout/IntersectingNavFooter'

const DefaultTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Container flex={1}>{children}</Container>
      <IntersectingNavFooter />
    </>
  )
}

export default DefaultTemplate
