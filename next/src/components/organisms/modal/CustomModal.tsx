'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

type CustomModalProps = {
  isOpen: boolean
  onClose: () => void
  modalTitle: string
  buttonText?: string | ReactNode
  isSubmit?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  children: ReactNode
}

const CustomModal = ({
  isOpen,
  onClose,
  modalTitle,
  buttonText,
  size = 'md',
  children,
}: CustomModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pr="44px" fontSize="lg">{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter justifyContent="center">
          {buttonText && (
            <Button variant="primary" onClick={onClose}>
              {buttonText}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CustomModal
