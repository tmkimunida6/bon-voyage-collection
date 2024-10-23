'use client'

import { Box, Button, HStack, Spacer } from '@chakra-ui/react'
import Logo from '/public/images/logo.svg'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import NextLink from 'next/link'
import CustomIcon from '../../atoms/CustomIcon'

const Header = () => {
  return (
    <Box as='header'>
      <HStack p={4} bg="brand.secondary">
        <NextLink href="/">
          <Logo />
        </NextLink>
        <Spacer />
        <Box>
          <SignedIn>
            <HStack spacing={4}>
              <UserButton />
              <NextLink href="#">
                <CustomIcon iconName="FaBookmark" color="brand.brown" />
              </NextLink>
            </HStack>
          </SignedIn>
          <SignedOut>
            <Button size='sm' variant="outline" as={NextLink} href="./sign-in" gap='2px'>
              ログイン
              <CustomIcon iconName="FaSignInAlt" />
            </Button>
          </SignedOut>
        </Box>
      </HStack>
    </Box>
  )
}

export default Header
