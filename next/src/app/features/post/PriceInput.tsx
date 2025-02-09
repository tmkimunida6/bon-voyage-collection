/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */

'use client'

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import CurrencySearchBox from './CurrencySearchBox'
import CustomIcon from '@/components/atoms/CustomIcon'
import CustomModal from '@/components/organisms/modal/CustomModal'
import { useCurrencyStore } from '@/store/index'
import { currencyResultType } from '@/types/types'

type PriceInputProps = {
  name: string
  errors: Array<string> | undefined
}

const PriceInput = ({ name, errors }: PriceInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [results, setResults] = useState<Array<currencyResultType> | []>([])
  const [lastSelectedCurrency, setLastSelectedCurrency] =
    useState<currencyResultType | null>(null)
  const [inputPrice, setInputPrice] = useState<number | string>('')
  const [onBlurError, setOnBlurError] = useState<string>('')
  const { selectedCurrency } = useCurrencyStore()
  const toast = useToast()

  useEffect(() => {
    if (errors) {
      setOnBlurError(errors[0])
    } else {
      setOnBlurError('')
    }
  }, [errors])

  useEffect(() => {
    getLastSelectedCurrency()
  }, [])

  // 金額バリデーション
  const onBlurValidate = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // 数値でない場合
    if (isNaN(Number(value))) {
      setOnBlurError('半角数字のみで入力してください。')
    } else {
      setOnBlurError('')
    }
  }

  // 通貨一覧取得
  const handleSelectCurrency = async () => {
    if (results.length) {
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
      toast({
        title:
          'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      onClose()
    }
  }

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

  return (
    <FormControl isInvalid={!!onBlurError}>
      <FormLabel fontSize="sm" mb={1}>
        金額
      </FormLabel>
      <InputGroup size="md">
        <InputLeftAddon>
          <Button
            variant="ghost"
            p={0}
            minW="none"
            h="auto"
            onClick={() => handleSelectCurrency()}
            fontSize="sm"
          >
            {localStorage.getItem('selectedCurrency')
              ? localStorage.getItem('selectedCurrency')
              : selectedCurrency}
            <CustomIcon iconName="FaChevronDown" fontSize="xs" ml={1} />
          </Button>
        </InputLeftAddon>
        <Input
          type="text"
          placeholder="20.99 (半角数字で入力)"
          size="md"
          name={name}
          borderRadius="md"
          value={inputPrice}
          onChange={(e) => setInputPrice(e.target.value)}
          onBlur={onBlurValidate}
          inputMode="decimal"
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
        <CurrencySearchBox
          results={results}
          lastSelectedCurrency={lastSelectedCurrency}
          onClose={onClose}
        />
      </CustomModal>
      <Input
        type="hidden"
        name="currency"
        value={
          localStorage.getItem('selectedCurrency')
            ? (localStorage.getItem('selectedCurrency') as string)
            : selectedCurrency
        }
      />
    </FormControl>
  )
}

export default PriceInput
