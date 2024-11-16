import { Box, VStack } from '@chakra-ui/react'
import Logo from '/public/images/logo.svg'
import { forwardRef } from 'react'

const Footer = forwardRef<HTMLElement>(function Footer(props, ref) {
  return (
    <Box as="footer" ref={ref} position="relative" zIndex={11}>
      <VStack p={4} bg="brand.secondary">
        {/* <HStack spacing={4}>
          <ChakraLink as={NextLink} href="#" fontSize="xs">
            リンク
          </ChakraLink>
          <ChakraLink as={NextLink} href="#" fontSize="xs">
            リンクx
          </ChakraLink>
          <ChakraLink as={NextLink} href="#" fontSize="xs">
            リンク
          </ChakraLink>
        </HStack> */}
        <Logo />
      </VStack>
    </Box>
  )
})

export default Footer
