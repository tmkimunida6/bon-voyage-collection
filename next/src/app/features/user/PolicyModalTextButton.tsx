import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { ReactNode, useState } from 'react'
import PrivacyPolicyContent from '../policy/PrivacyPolicyContent'
import TermsOfUseContent from '../policy/TermsOfUseContent'

type PolicyModalTextButtonProps = {
  policy: 'terms' | 'privacy'
}

export default function PolicyModalTextButton({
  policy,
}: PolicyModalTextButtonProps) {
  const [policyContent, setPolicyContent] = useState<ReactNode | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const openPolicyModal = (policy: 'terms' | 'privacy') => {
    if (policy === 'terms') {
      setPolicyContent(<TermsOfUseContent />)
    } else {
      setPolicyContent(<PrivacyPolicyContent />)
    }
    onOpen()
  }

  return (
    <>
      <Button
        variant="ghost"
        fontSize="inherit"
        fontWeight="inherit"
        lineHeight="inherit"
        verticalAlign="inherit"
        textDecoration="underline"
        color="brand.link"
        p={0}
        h="auto"
        onClick={() => openPolicyModal(policy)}
      >
        {policy === 'terms' ? '利用規約' : 'プライバシーポリシー'}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xxl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader p={5}>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody px={4}>{policyContent}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
