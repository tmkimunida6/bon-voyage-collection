import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Text,
  AlertDialogBody,
} from '@chakra-ui/react'
import { ReactNode, useRef } from 'react'

type CustomAlertDialogProps = {
  alertTitle: string
  alertText?: string
  button: ReactNode
  isOpen: boolean
  onClose: () => void
}

export default function CustomAlertDialog({
  alertTitle,
  alertText = '',
  button,
  isOpen,
  onClose,
}: CustomAlertDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  return (
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
              <Text fontSize="md">{alertText}</Text>
            </AlertDialogBody>
          )}
          <AlertDialogFooter justifyContent="center" gap={4}>
            {button}
            <Button ref={cancelRef} onClick={onClose}>
              キャンセル
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
