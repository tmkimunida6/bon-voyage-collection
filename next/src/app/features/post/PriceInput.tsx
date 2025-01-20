/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */

'use client'

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import CurrencySelectButton from './CurrencySelectButton'
import CustomIcon from '@/components/atoms/CustomIcon'
import CustomModal from '@/components/organisms/modal/CustomModal'
import { useCurrencyStore } from '@/store/store'
import { currencyResultType } from '@/types/types'

type PriceInputProps = {
  name: string
  errors: Array<string> | undefined
}

const PriceInput = ({ name, errors }: PriceInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [results, setResults] = useState<Array<currencyResultType> | null>(null)
  const [lastSelectedCurrency, setLastSelectedCurrency] =
    useState<currencyResultType | null>(null)
  const [inputPrice, setInputPrice] = useState<number | string>('')
  const [onBlurError, setOnBlurError] = useState<string>('')
  const { selectedCurrency, setSelectedCurrency } = useCurrencyStore()

  useEffect(() => {
    if (errors) {
      setOnBlurError(errors[0])
    } else {
      setOnBlurError('')
    }
  }, [errors])
  // 前回選択した通貨を取得
  const getLastSelectedCurrency = () => {
    if (!localStorage.getItem('selectedCurrency') || !results) return

    const currencyData = results.find(
      (currency) => currency.code === localStorage.getItem('selectedCurrency'),
    )

    if (currencyData) {
      setLastSelectedCurrency({
        code: currencyData.code,
        name: currencyData.name,
      })
    }
  }

  // 通貨一覧取得
  const handleSelectCurrency = async () => {
    if (results) {
      getLastSelectedCurrency()
      onOpen()
      return
    }

    try {
      const res = await fetch(`/api/currency`)
      const data = await res.json()
      const currencyArray = Object.entries(data as Record<string, string>).map(
        ([code, name]) => ({
          code,
          name,
        }),
      )
      setResults(currencyArray)
      getLastSelectedCurrency()
      onOpen()
    } catch (error: any) {
      console.log(error)
    }
  }

  const onSelectCurrency = (code: string) => {
    setSelectedCurrency(code)
    onClose()
    // 選択履歴をローカルストレージに保存
    localStorage.setItem('selectedCurrency', code)
  }

  const onBlurValidate = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // 数値でない場合
    if (isNaN(Number(value))) {
      setOnBlurError('半角数字のみで入力してください。')
    } else {
      setOnBlurError('')
    }
  }

  return (
    <FormControl isInvalid={!!onBlurError}>
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
          type="text"
          placeholder="20.99 (半角数字で入力)"
          size="sm"
          name={name}
          borderRadius="md"
          value={inputPrice}
          onChange={(e) => setInputPrice(e.target.value)}
          onBlur={onBlurValidate}
          inputMode="numeric"
        />
      </InputGroup>
      <FormErrorMessage>{onBlurError}</FormErrorMessage>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle="通貨選択"
        buttonText="決定"
        size="sm"
      >
        <Box maxH="60dvh" overflowY="auto">
          {lastSelectedCurrency && (
            <Stack mb={4} spacing={0}>
              <Text fontSize="sm" fontWeight="bold">
                前回選択した通貨
              </Text>
              <CurrencySelectButton
                code={lastSelectedCurrency.code}
                name={lastSelectedCurrency.name}
                onSelectCurrency={onSelectCurrency}
              />
            </Stack>
          )}
          {results?.map((result) => (
            <CurrencySelectButton
              key={result.code}
              code={result.code}
              name={result.name}
              onSelectCurrency={onSelectCurrency}
            />
          ))}
        </Box>
      </CustomModal>
      <Input type="hidden" name="currency" value={selectedCurrency} />
    </FormControl>
  )
}

export default PriceInput
