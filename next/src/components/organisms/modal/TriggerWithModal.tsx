'use client'

import { useDisclosure } from '@chakra-ui/react'
import { ReactElement, ReactNode } from 'react'
import CustomModal from './CustomModal'

type TriggerWithModalProps = {
  renderTrigger: (props: { onClick: () => void }) => ReactElement
  modalTitle: string
  buttonText: string
  children: ReactNode
}

const TriggerWithModal = ({
  renderTrigger,
  modalTitle,
  buttonText,
  children,
}: TriggerWithModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {renderTrigger({ onClick: onOpen })}
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle={modalTitle}
        buttonText={buttonText}
      >
        {children}
      </CustomModal>
    </>
  )
}

export default TriggerWithModal
