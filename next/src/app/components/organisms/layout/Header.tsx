'use client'

import { HStack, Spacer } from '@chakra-ui/react'
import Logo from '/public/images/logo.svg'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import NextLink from 'next/link'
import CustomIcon from '../../atoms/CustomIcon'

const Header = () => {
  return (
    <header>
      <HStack p={4} bg="brand.secondary">
        <NextLink href="#">
          <Logo />
        </NextLink>
        <Spacer />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <NextLink href="/sign-in">ログイン</NextLink>
        </SignedOut>
        <NextLink href="#">
          <CustomIcon iconName="FaBookmark" color="brand.brown" />
        </NextLink>
      </HStack>
    </header>
  )
}

export default Header
