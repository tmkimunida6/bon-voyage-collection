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
  buttonText?: string
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
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter justifyContent="center">
          {buttonText && (
            <Button bg="brand.primary" color="white" mr={3} onClick={onClose}>
              {buttonText}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CustomModal
