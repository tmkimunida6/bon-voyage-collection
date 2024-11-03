import DataWithIcon from '@/components/molecules/DataWithIcon'
import SouvenirCard from '@/components/organisms/Souvenir/SouvenirCard'
import { Box, Flex, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'

const NewSouvenir: NextPage = () => {
  return (
    <Stack spacing={6}>
      <HStack mb={6}>
        <Heading as="h1">お土産の詳細</Heading>
      </HStack>
      <Heading as="h2" fontSize="xl">あああ</Heading>
      <Image src="https://placehold.jp/1080x720.png" />
      <DataWithIcon iconName="FaClipboardList">
        <Text>お菓子 - 甘い系</Text>
      </DataWithIcon>
      <Text>
        マカデミアナッツチョコレートといえばやっぱりこれ! ハワイアンホーストを代表する定番人気商品マカデミアナッツチョコレートといえばやっぱりこれ! ハワイアンホーストを代表する定番人気商品マカデミアナッツチョコレートといえばやっぱりこれ! ハワイアンホーストマカデミアナッツチョコレートといえばやっぱりこれ! ハワイアンホーストを代表する定番人気商品マカデミアナッツチョコレートといえばやっぱりこれ! ハ
      </Text>
      <Stack spacing={4}>
        <Heading as="h3" fontSize="lg">似ているお土産</Heading>
        <Box overflowX='auto' mx={-6} px={6}>
          <Flex flexWrap='nowrap' gap={4} w='max-content'>
            <SouvenirCard size='md' isFavoritable={false} />
            <SouvenirCard size='md' isFavoritable={false} />
            <SouvenirCard size='md' isFavoritable={false} />
            <SouvenirCard size='md' isFavoritable={false} />
            <SouvenirCard size='md' isFavoritable={false} />
          </Flex>
        </Box>
      </Stack>
    </Stack>
  )
}

export default NewSouvenir
