import { HStack, Spacer } from '@chakra-ui/react'
import Logo from '/public/images/logo.svg'
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
        <NextLink href="#">
          <CustomIcon iconName="FaBookmark" color="brand.brown" />
        </NextLink>
      </HStack>
    </header>
  )
}

export default Header
