import { Heading, HStack } from '@chakra-ui/react'
import NewSouvenirForm from '@/components/organisms/form/NewSouvenirForm'
import { checkLoginStatus } from '@/utils/checkLoginStatus'

export default async function NewSouvenir() {
  await checkLoginStatus()

  return (
    <>
      <HStack mb={6}>
        <Heading as="h1">お土産の新規登録</Heading>
      </HStack>
      <NewSouvenirForm />
    </>
  )
}
