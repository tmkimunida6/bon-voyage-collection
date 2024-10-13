'use client'

import { ReactNode } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'

type CustomModalProps = {
  isOpen: boolean
  onClose: () => void,
  modalTitle: string,
  buttonText: string,
  children: ReactNode
}

const CustomModal = ({ isOpen, onClose, modalTitle, buttonText, children }: CustomModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter justifyContent='center'>
          <Button bg='brand.primary' color='white' mr={3} onClick={onClose}>
            {buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CustomModal;