import { Link as ChakraLink } from '@chakra-ui/next-js'
import { HStack, VStack } from '@chakra-ui/react'
import Logo from '/public/images/logo.svg'
import NextLink from 'next/link'

const Footer = () => {
  return (
    <footer>
      <VStack p={4} bg="brand.secondary">
        <HStack spacing={4}>
          <ChakraLink as={NextLink} href="#" fontSize="xs" color="brand.brown">
            リンク
          </ChakraLink>
          <ChakraLink as={NextLink} href="#" fontSize="xs" color="brand.brown">
            リンク
          </ChakraLink>
          <ChakraLink as={NextLink} href="#" fontSize="xs" color="brand.brown">
            リンク
          </ChakraLink>
        </HStack>
        <Logo />
      </VStack>
    </footer>
  )
}

export default Footer
