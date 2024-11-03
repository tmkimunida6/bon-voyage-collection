import { Heading, HStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import NewSouvenirForm from '@/components/organisms/form/NewSouvenirForm'

const NewSouvenir: NextPage = () => {
  return (
    <>
      <HStack mb={6}>
        <Heading as="h1">お土産の新規登録</Heading>
      </HStack>
      <NewSouvenirForm />
    </>
  )
}

export default NewSouvenir
