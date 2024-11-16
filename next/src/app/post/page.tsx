import { Box, Heading, HStack } from '@chakra-ui/react'
import PostForm from '@/components/organisms/form/PostForm'
import { checkLoginStatus } from '@/utils/checkLoginStatus'

export default async function Post() {
  await checkLoginStatus()

  return (
    <Box maxW="660px" mx="auto">
      <HStack mb={6}>
        <Heading as="h1">コレクションへの追加</Heading>
      </HStack>
      <PostForm />
    </Box>
  )
}
