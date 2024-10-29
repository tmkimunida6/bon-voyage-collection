'use client'

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
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import TextIconLink from '@/components/molecules/TextIconLink'

const Top: NextPage = () => {
  return (
    <>
      <Box my={10}>
        <Stack spacing={8}>
          <Heading>お土産との出会いを見つけるサービス</Heading>
          <VStack spacing={6}>
            <Text>まずはあなたにおすすめのお土産をいくつかご紹介します。</Text>
            <HStack>
              <Input placeholder="都市名" size="md" />
              <Input placeholder="カテゴリー" size="md" />
            </HStack>
            <Button variant="primary" as={NextLink} href="./recommend">
              おすすめのお土産をみる
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
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100dvh"
        zIndex={-1}
      >
        <Image
          src="/images/bg_top.jpg"
          alt="トップページ"
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition="center"
          opacity="30%"
        />
      </Box>
    </>
  )
}

export default Top
