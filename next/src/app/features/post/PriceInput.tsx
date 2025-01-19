/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */

'use client'

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import CustomIcon from '@/components/atoms/CustomIcon'
import CustomModal from '@/components/organisms/modal/CustomModal'
import { useCurrencyStore } from '@/store/store'
import { currencyResultType } from '@/types/types'

const PriceInput = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [results, setResults] = useState<Array<currencyResultType> | null>(null)
  const { selectedCurrency, setSelectedCurrency } = useCurrencyStore()

  // 通貨一覧取得
  const handleSelectCurrency = async () => {
    if (results) {
      onOpen()
      return
    }

    try {
      const res = await fetch(`/api/currency`)
      const data = await res.json()
      console.log(data)
      const currencyArray = Object.entries(data as Record<string, string>).map(
        ([code, name]) => ({
          code,
          name,
        }),
      )
      setResults(currencyArray)
      onOpen()
    } catch (error: any) {
      console.log(error)
    }
  }

  const onSelectCurrency = (code: string) => {
    setSelectedCurrency(code)
    onClose()
  }

  return (
    <FormControl>
      <FormLabel fontSize="sm" mb={1}>
        金額
      </FormLabel>
      <InputGroup size="sm">
        <InputLeftAddon>
          <Button
            variant="ghost"
            p={0}
            minW="none"
            h="auto"
            onClick={() => handleSelectCurrency()}
            fontSize="xs"
          >
            {selectedCurrency}
            <CustomIcon iconName="FaChevronDown" fontSize="10px" ml={1} />
          </Button>
        </InputLeftAddon>
        <Input
          type="number"
          placeholder="2,000"
          size="sm"
          name="price"
          borderRadius="md"
        />
      </InputGroup>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle="通貨選択"
        buttonText="決定"
        size="sm"
      >
        <Box maxH="60dvh" overflowY="auto">
          {results?.map((result) => (
            <Button
              key={result.code}
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
              onClick={() => onSelectCurrency(result.code)}
            >
              <Text
                as="span"
                p={1}
                bg="brand.secondary"
                color="white"
                w="43px"
                borderRadius="4px"
              >
                {result.code}
              </Text>
              <Text as="span">{result.name}</Text>
            </Button>
          ))}
        </Box>
      </CustomModal>
    </FormControl>
  )
}

export default PriceInput
