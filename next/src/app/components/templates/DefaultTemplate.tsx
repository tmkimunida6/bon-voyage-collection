import { Container, Stack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Header from '../organisms/layout/Header'
import IntersectingNavFooter from '../organisms/layout/IntersectingNavFooter'

const DefaultTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <Stack spacing={0} minH="100dvh">
      <Header />
      <Container flex={1}>{children}</Container>
      <IntersectingNavFooter />
    </Stack>
  )
}

export default DefaultTemplate
