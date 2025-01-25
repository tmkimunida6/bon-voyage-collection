'use client'

import { Button, Checkbox, FormControl, FormErrorMessage, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from "@chakra-ui/react"
import TermsOfUseContent from "../policy/TermsOfUseContent"
import PrivacyPolicyContent from "../policy/PrivacyPolicyContent"
import { ReactNode, useState } from "react"

type AgreeToPolicyBoxProps = {
  name: string
  errors: Array<string> | undefined
}

export default function AgreeToPolicyBox({ name, errors }: AgreeToPolicyBoxProps) {
  const [policyContent, setPolicyContent] = useState<ReactNode | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const openPolicyModal = (policy: 'terms' | 'privacy') => {
    if(policy === 'terms') {
      setPolicyContent(<TermsOfUseContent />)
    } else if (policy === 'privacy') {
      setPolicyContent(<PrivacyPolicyContent />)
    } else {
      return
    }
    onOpen()
  }

  return (
    <VStack bg="white" w="100%" p={4} pt="19px" borderRadius={4}>
      <FormControl isRequired isInvalid={!!errors}>
        <Checkbox size="lg" spacing={2} w="fit-content" maxW="80vw" name={name} >
          <Text as="span" fontSize="md" display="block" mt="-3px">
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
              onClick={() => openPolicyModal('terms')}
            >
              利用規約
            </Button>
            と
            <Button
              variant="ghost"
              fontSize="inherit"
              fontWeight="inherit"
              lineHeight="inherit"
              verticalAlign="inherit"
              textDecoration="underline"
              whiteSpace="normal"
              color="brand.link"
              p={0}
              h="auto"
              onClick={() => openPolicyModal('privacy')}
            >
              プライバシーポリシー
            </Button>
            に同意します。
            <Text as="span" color="red.500" fontWeight="bold">
              *
            </Text>
          </Text>
        </Checkbox>
        <FormErrorMessage>{errors}</FormErrorMessage>
        <Modal isOpen={isOpen} onClose={onClose} size="xxl" scrollBehavior="inside">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader p={5}><ModalCloseButton /></ModalHeader>
            <ModalBody px={4}>{policyContent}</ModalBody>
          </ModalContent>
        </Modal>
      </FormControl>
    </VStack>
  )
}