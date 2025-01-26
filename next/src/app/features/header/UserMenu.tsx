'use client'

import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import CustomIcon from '@/components/atoms/CustomIcon'
import SignoutButton from '@/components/atoms/SignoutButton'
import CustomAlertDialog from '@/components/molecules/CustomAlertDialog'
import { CurrentUserType } from '@/types/types'

type UserMenuProps = {
  user: CurrentUserType
}

export default function UserMenu({ user }: UserMenuProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Menu>
      <MenuButton as="button">
        <Avatar w="40px" h="40px" src={user.image || ''} />
      </MenuButton>
      <MenuList>
        <MenuItem
          as={NextLink}
          href="/mypage"
          fontWeight="bold"
          fontSize="sm"
          px={4}
          _focus={{ bg: 'transparent' }}
        >
          {user.nickname || `user_${user.alias_id}`}
        </MenuItem>
        <MenuDivider />
        <MenuItem
          icon={<CustomIcon iconName="FaGear" fontSize="sm" />}
          as={NextLink}
          href="/setting"
        >
          ユーザー設定
        </MenuItem>
        <MenuItem
          icon={<CustomIcon iconName="FaSignOutAlt" fontSize="sm" />}
          onClick={onOpen}
        >
          ログアウト
          <CustomAlertDialog
            alertTitle="ログアウトしますか？"
            button={<SignoutButton size="md" variant="danger" />}
            isOpen={isOpen}
            onClose={onClose}
          />
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
