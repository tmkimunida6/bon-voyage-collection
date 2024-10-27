import { Box, Button, HStack, Spacer, Text } from '@chakra-ui/react'
import Logo from '/public/images/logo.svg'
import NextLink from 'next/link'
import CustomIcon from '../../atoms/CustomIcon'
import { fetchUserState } from '@/utils/fetchUserState'
import SignoutButton from '../../atoms/SignoutButton'

export default async function Header() {
  const user = await fetchUserState()

  return (
    <Box as="header">
      <HStack p={4} bg="brand.secondary">
        <NextLink href="#">
          <Logo />
        </NextLink>
        <Spacer />
        {user.isSignedIn ? (
          <>
          <SignoutButton></SignoutButton>
          <Text>{user.email}</Text>
          </>
        ): (
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
        ) }
        <NextLink href="#">
          <CustomIcon iconName="FaBookmark" color="brand.brown" />
        </NextLink>
      </HStack>
    </Box>
  )
}
