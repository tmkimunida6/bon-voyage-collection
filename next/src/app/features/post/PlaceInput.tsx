/* eslint @typescript-eslint/no-unused-vars: 0 */

'use client'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import CustomIcon from '@/components/atoms/CustomIcon'
import CustomModal from '@/components/organisms/modal/CustomModal'
import { placesResultType, selectedPlaceType } from '@/types/types'

type PlaceInputProps = {
  errors?: Array<string> | undefined
}

const PlaceInput = ({ errors }: PlaceInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [selectedPlace, setSelectedPlace] = useState<selectedPlaceType>({
    place_id: '',
    name: '',
  })
  const [results, setResults] = useState<Array<placesResultType>>([])
  const [inputVal, setInputVal] = useState('')

  // 施設名オートコンプリート
  const handleSearchPlace = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value)

    const fetchPlaceData = async () => {
      const res = await fetch(
        `/api/places?query=${encodeURIComponent(inputVal)}`,
      )
      const data = await res.json()
      if (data.predictions.length) {
        setResults(data.predictions)
      }
    }
    fetchPlaceData()
  }

  // 施設名選択
  const handleSelectPlace = (place: placesResultType) => {
    setSelectedPlace({
      place_id: place.place_id,
      name: place.structured_formatting.main_text,
    })
    onClose()
  }

  return (
    <>
      <Input
        type="hidden"
        isReadOnly
        name="category_id"
        value={selectedPlace.place_id || ''}
      />
      <FormControl isInvalid={!!errors}>
        <FormLabel fontSize="sm" mb={1}>
          購入場所
        </FormLabel>
        <InputGroup size="sm">
          <Input
            placeholder="お店の名前を検索"
            size="sm"
            name="category_name"
            isReadOnly
            value={selectedPlace.name || ''}
            pr={selectedPlace.place_id ? 10 : 3}
            borderRadius="md"
            onClick={onOpen}
          />
          {selectedPlace.place_id && (
            <InputRightElement width={selectedPlace.place_id ? '' : '4.5rem'}>
              <Button
                size="sm"
                variant="ghost"
                p={0}
                onClick={() => setSelectedPlace({ place_id: '', name: '' })}
              >
                <CustomIcon iconName="FaTimes" color="gray.400" />
              </Button>
            </InputRightElement>
          )}
        </InputGroup>
      </FormControl>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle="お店を探す"
        buttonText="確定する"
        size="lg"
      >
        <Input
          placeholder="店舗名を入力"
          size="md"
          name="place"
          onChange={handleSearchPlace}
        />
        {results.map((result) => (
          <Button
            key={result.place_id}
            variant="ghost"
            w="100%"
            p={2}
            justifyContent="flex-start"
            alignItems="flex-start"
            gap={1}
            border="1px solid"
            borderColor="gray.200"
            borderRadius={0}
            h="auto"
            fontWeight="normal"
            onClick={() => handleSelectPlace(result)}
          >
            <CustomIcon iconName="FaMapMarkerAlt" fontSize="xs" mt="2px" />
            <Flex
              flexDirection="column"
              alignItems="flex-start"
              gap={1}
              whiteSpace="normal"
              textAlign="left"
            >
              <Text as="span" fontSize="sm">
                {result.structured_formatting.main_text}
              </Text>
              <Text as="span" fontSize="xs" color="brand.primary">
                {result.structured_formatting.secondary_text}
              </Text>
            </Flex>
          </Button>
        ))}
      </CustomModal>
      <FormErrorMessage>{errors}</FormErrorMessage>
    </>
  )
}

export default PlaceInput
