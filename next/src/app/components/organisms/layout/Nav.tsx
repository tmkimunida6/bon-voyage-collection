import { Box, HStack } from '@chakra-ui/react'
import NavButton from '../../molecules/NavButton'

type NavProps = {
  footerIntersecting: boolean
}

const Nav = ({ footerIntersecting }: NavProps) => {
  return (
    <Box as="nav" minH="48px">
      <HStack
        spacing={1}
        position={!footerIntersecting ? 'fixed' : 'static'}
        bottom={0}
        width="100%"
      >
        <NavButton iconName="FaHome" text="ホーム" />
        <NavButton iconName="FaSearch" text="検索" />
        <NavButton iconName="FaPenSquare" text="投稿" />
        <NavButton iconName="FaUserAlt" text="マイページ" />
      </HStack>
    </Box>
  )
}

export default Nav
