'use client'

import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  Text,
  VStack,
} from '@chakra-ui/react'
import PolicyModalTextButton from './PolicyModalTextButton'

type AgreeToPolicyBoxProps = {
  name: string
  errors: Array<string> | undefined
}

export default function AgreeToPolicyBox({
  name,
  errors,
}: AgreeToPolicyBoxProps) {
  return (
    <VStack bg="white" w="100%" p={4} pt="19px" borderRadius={4}>
      <FormControl isRequired isInvalid={!!errors}>
        <Checkbox size="lg" spacing={2} w="fit-content" maxW="80vw" name={name}>
          <Text as="span" fontSize="md" display="block" mt="-3px">
            <PolicyModalTextButton policy="terms" />
            と
            <PolicyModalTextButton policy="privacy" />
            に同意します。
            <Text as="span" color="red.500" fontWeight="bold">
              *
            </Text>
          </Text>
        </Checkbox>
        <FormErrorMessage>{errors}</FormErrorMessage>
      </FormControl>
    </VStack>
  )
}
