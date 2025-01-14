/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Text,
  useDisclosure,
  AlertDialogBody,
} from '@chakra-ui/react'
import { useRef } from 'react'
import CustomIcon from '@/components/atoms/CustomIcon'
import DeleteUserButton from '@/components/atoms/DeleteUserButton'
import SignoutButton from '@/components/atoms/SignoutButton'
import { iconMapper } from '@/utils/iconMapper'

type SettingLinkWithAlertProps = {
  linkText: string
  icon: keyof typeof iconMapper
  alertTitle: string
  alertText?: string
  buttonType: 'signout' | 'delete'
}

const SettingLinkWithAlert = ({
  linkText,
  icon,
  alertTitle,
  alertText,
  buttonType,
}: SettingLinkWithAlertProps) => {
  // アラート
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

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
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {alertTitle}
            </AlertDialogHeader>
            {alertText && (
              <AlertDialogBody>
                <Text fontSize="md">
                  アカウント削除を行うと、アップロードされた写真や投稿を含む全てのデータが削除されます。
                  {alertText}
                </Text>
              </AlertDialogBody>
            )}
            <AlertDialogFooter justifyContent="center" gap={4}>
              {buttonType === 'signout' ? (
                <SignoutButton size="md" variant="danger" />
              ) : (
                <DeleteUserButton onClose={onClose} />
              )}
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default SettingLinkWithAlert
