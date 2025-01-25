import { Box, HStack, VStack, Link as ChakraLink } from '@chakra-ui/react'
import Logo from '/public/images/logo.svg'
import NextLink from 'next/link'
import { forwardRef } from 'react'

const Footer = forwardRef<HTMLElement>(function Footer(props, ref) {
  return (
    <Box as="footer" ref={ref} position="relative" zIndex={11}>
      <VStack p={4} bg="brand.secondary">
        <HStack spacing={4}>
          <ChakraLink as={NextLink} href="/terms" fontSize="sm" color="white">
            利用規約
          </ChakraLink>
          <ChakraLink as={NextLink} href="/privacy" fontSize="sm" color="white">
            プライバシーポリシー
          </ChakraLink>
        </HStack>
        <NextLink href="/">
          <Logo />
        </NextLink>
      </VStack>
    </Box>
  )
})

export default Footer
