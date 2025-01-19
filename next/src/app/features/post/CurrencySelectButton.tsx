'use client'

import { Button, Text } from '@chakra-ui/react'

type CurrencySelectButtonProps = {
  code: string
  name: string
  onSelectCurrency: (code: string) => void
}

const CurrencySelectButton = ({
  code,
  name,
  onSelectCurrency,
}: CurrencySelectButtonProps) => {
  return (
    <Button
      variant="ghost"
      px={0}
      py={2}
      minW="auto"
      h="auto"
      borderBottom="1px solid"
      borderColor="gray.100"
      borderRadius={0}
      w="100%"
      justifyContent="flex-start"
      gap={2}
      fontSize="sm"
      _hover={{
        bg: 'brand.secondary',
        color: 'white',
      }}
      _last={{
        border: 'none',
      }}
      onClick={() => onSelectCurrency(code)}
    >
      <Text
        as="span"
        p={1}
        bg="brand.secondary"
        color="white"
        w="43px"
        borderRadius="4px"
      >
        {code}
      </Text>
      <Text as="span" fontWeight="normal">{name}</Text>
    </Button>
  )
}

export default CurrencySelectButton
