import { Box, Button, HStack, Spacer } from '@chakra-ui/react'
import Logo from '/public/images/logo.svg'
import NextLink from 'next/link'
import CustomIcon from '../../atoms/CustomIcon'
import SignoutButton from '../../atoms/SignoutButton'
import { UserType } from '@/types/types'

type HeaderProps = {
  user: UserType
}

export default async function Header({ user }: HeaderProps) {
  return (
    <Box as="header">
      <HStack px={{ base: 4, sm: 6 }} py={4} bg="brand.secondary">
        <NextLink href="/">
          <Logo />
        </NextLink>
        <Spacer />
        {user.isSignedIn ? (
          <SignoutButton></SignoutButton>
        ) : (
          <Button
            size="sm"
            variant="outline"
            as={NextLink}
            href="/sign_in"
            gap="2px"
          >
            ログイン
            <CustomIcon iconName="FaSignInAlt" />
          </Button>
        )}
      </HStack>
    </Box>
  )
}
