'use client'

import { Box, Input, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import CurrencySelectButton from './CurrencySelectButton'
import { useCurrencyStore } from '@/store/index'
import { currencyResultType } from '@/types/types'

type CurrencySearchBoxProps = {
  results: Array<currencyResultType> | []
  lastSelectedCurrency: currencyResultType | null
  onClose: () => void
}

const CurrencySearchBox = ({
  results,
  lastSelectedCurrency,
  onClose,
}: CurrencySearchBoxProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { setSelectedCurrency } = useCurrencyStore()

  const filteredData = results.filter(
    ({ code, name }) =>
      code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 通貨選択
  const onSelectCurrency = (code: string) => {
    setSelectedCurrency(code)
    onClose()
    // 選択履歴をローカルストレージに保存
    localStorage.setItem('selectedCurrency', code)
  }

  return (
    <Box maxH="60dvh" overflowY="auto">
      <Input
        type="text"
        placeholder="通貨名(英語)で検索"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        m="1px"
        mb={6}
        width="calc(100% - 2px)"
      />
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
      {filteredData.length ? (
        <>
          {filteredData.map((data) => (
            <CurrencySelectButton
              key={data.code}
              code={data.code}
              name={data.name}
              onSelectCurrency={onSelectCurrency}
            />
          ))}
        </>
      ) : (
        <Text fontSize="sm">通貨が見つかりませんでした。</Text>
      )}
    </Box>
  )
}

export default CurrencySearchBox
