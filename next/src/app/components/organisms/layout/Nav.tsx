import { HStack } from '@chakra-ui/react'
import NavButton from '../../molecules/NavButton'

const Nav = () => {
  return (
    <nav>
      <HStack spacing={1}>
        <NavButton iconName="FaHome" text="ホーム" />
        <NavButton iconName="FaSearch" text="検索" />
        <NavButton iconName="FaPenSquare" text="投稿" />
        <NavButton iconName="FaUserAlt" text="マイページ" />
      </HStack>
    </nav>
  )
}

export default Nav;