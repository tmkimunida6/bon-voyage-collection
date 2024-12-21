import {
  Heading,
  Text,
  Flex,
  VStack,
  Box,
  Stack,
  Image,
} from '@chakra-ui/react'
import TextIconLink from '@/components/molecules/TextIconLink'
import TopSearchForm from '@/components/organisms/form/TopSearchForm'

export default function Top() {
  return (
    <Box maxW="660px" mx="auto">
      <Box my={10}>
        <Stack spacing={8}>
          <Heading fontSize="4xl" textAlign={{ base: 'left', md: 'center' }}>
            お土産との出会いを見つけよう。
          </Heading>
          <VStack spacing={6}>
            <Text>まずはあなたにおすすめのお土産をいくつかご紹介します。</Text>
            <TopSearchForm />
          </VStack>
          <Flex justifyContent="right">
            <TextIconLink
              iconName="FaChevronRight"
              iconPosition="right"
              href="./sign_in"
            >
              ログインはこちらから
            </TextIconLink>
          </Flex>
        </Stack>
      </Box>
      <Flex
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100dvh"
        zIndex={-1}
        justifyContent="center"
      >
        <Image
          src="/images/bg_top.png"
          alt="トップページ"
          w="100%"
          h="100%"
          maxH="100%"
          maxW="660px"
          objectFit="contain"
          objectPosition="center"
          opacity="30%"
        />
      </Flex>
    </Box>
  )
}
