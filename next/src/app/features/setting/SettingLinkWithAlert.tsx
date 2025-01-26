/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import { Button, useDisclosure } from '@chakra-ui/react'
import CustomIcon from '@/components/atoms/CustomIcon'
import DeleteUserButton from '@/components/atoms/DeleteUserButton'
import SignoutButton from '@/components/atoms/SignoutButton'
import { iconMapper } from '@/utils/iconMapper'
import CustomAlertDialog from '@/components/molecules/CustomAlertDialog'

type SettingLinkWithAlertProps = {
  linkText: string
  icon: keyof typeof iconMapper
  buttonType: 'signout' | 'delete'
}

const SettingLinkWithAlert = ({
  linkText,
  icon,
  buttonType
}: SettingLinkWithAlertProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        variant="ghost"
        fontSize="md"
        fontWeight="normal"
        textDecoration="none"
        py={4}
        px={0}
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        gap={2}
        w="100%"
        h="auto"
        transition="all 0.3s"
        _hover={{ color: 'brand.link' }}
        onClick={onOpen}
      >
        <CustomIcon iconName={icon} />
        {linkText}
      </Button>
      {buttonType === 'signout' ? (
        <CustomAlertDialog alertTitle="ログアウトしますか？" button={<SignoutButton size="md" variant="danger" />} isOpen={isOpen} onClose={onClose} />
      ) : (
        <CustomAlertDialog alertTitle="投稿を削除してもよろしいですか？" alertText="アカウント削除を行うと、アップロードされた写真や投稿を含む全てのデータが削除されます。" button={<DeleteUserButton onClose={onClose} />} isOpen={isOpen} onClose={onClose} />
      )}
    </>
  )
}

export default SettingLinkWithAlert
