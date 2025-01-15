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
  InputRightElement,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import CustomIcon from '@/components/atoms/CustomIcon'
import CustomModal from '@/components/organisms/modal/CustomModal'
import { useCategoryStore } from '@/store/store'
import { CategoriesType } from '@/types/types'
import { fetchCategories } from '@/utils/fetchCategories'

type PlaceInputProps = {
  errors?: Array<string> | undefined
}

const PlaceInput = ({ errors }: PlaceInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [place, setPlace] = useState('')

  return (
    <>
      <Input
        type="hidden"
        isReadOnly
        name="category_id"
        value={place || ''}
      />
      <FormControl isInvalid={!!errors}>
        <FormLabel fontSize="sm" mb={1}>購入場所</FormLabel>
        <Input
          placeholder="お店の名前を検索"
          size="sm"
          name="category_name"
          isReadOnly
          value={place || ''}
          pr={place ? 10 : 3}
          borderRadius="md"
          onClick={onOpen}
        />
        {place && (
          <InputRightElement width={place ? '' : '4.5rem'}>
              <Button size="sm" variant="ghost" p={0}>
                <CustomIcon
                  iconName="FaTimes"
                  color="gray.400"
                  onClick={() => setPlace('')}
                />
              </Button>
          </InputRightElement>
        )}
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
        />
        <Button variant="ghost" w="100%" p={2} justifyContent="flex-start" alignItems="flex-start" gap={1} border="1px solid" borderColor="gray.200" borderRadius={0} h="auto" fontWeight="normal">
          <CustomIcon iconName='FaMapMarkerAlt' fontSize="xs" mt="2px" />
          <Flex flexDirection="column" alignItems="flex-start" gap={1}>
            <Text as="span" fontSize="sm">ABCストア</Text>
            <Text as="span" fontSize="xs" color="brand.primary">255 Beach Walk, Honolulu, HI 96815 アメリカ合衆国</Text>
          </Flex>
        </Button>
      </CustomModal>
      <FormErrorMessage>{errors}</FormErrorMessage>
    </>
  )
}

export default PlaceInput
