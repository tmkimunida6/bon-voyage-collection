import {
  Heading,
  Input,
  Text,
  HStack,
  Flex,
  VStack,
  Box,
  Stack,
  Image,
  Button,
  FormControl,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import CategoryInput from './features/category/CategoryInput'
import TextIconLink from '@/components/molecules/TextIconLink'

export default function Top() {
  return (
    <Box maxW="660px" mx="auto">
      <Box my={10}>
        <Stack spacing={8}>
          <Heading fontSize="4xl" textAlign={{ base: 'left', md: 'center' }}>
            お土産との出会いを見つけよう。
          </Heading>
          <VStack spacing={6}>
            <Text>まずはお土産を探してみましょう。</Text>
            <HStack>
              <FormControl>
                <Input type="text" placeholder="フリーワード" />
              </FormControl>
              <FormControl>
                <CategoryInput />
              </FormControl>
            </HStack>
            <Button variant="primary" as={NextLink} href="./recommend">
              お土産をみる
            </Button>
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
