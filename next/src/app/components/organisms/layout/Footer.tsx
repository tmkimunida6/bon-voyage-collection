import { Link as ChakraLink } from '@chakra-ui/next-js'
import { Box, HStack, VStack } from '@chakra-ui/react'
import Logo from '/public/images/logo.svg'
import NextLink from 'next/link'
import { RefObject } from 'react'

type FooterProps = {
  footerRef: RefObject<HTMLElement>
}

const Footer = ({ footerRef }: FooterProps) => {
  return (
    <Box as='footer' ref={footerRef}>
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
    </Box>
  )
}

export default Footer
