/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import {
  Button,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import CategoryList from './CategoryList'
import CustomModal from '@/components/organisms/modal/CustomModal'
import { useCategoryStore } from '@/store/store'
import { CategoriesType } from '@/types/types'
import { fetchCategories } from '@/utils/fetchCategories'
import CustomIcon from '@/components/atoms/CustomIcon'

type CategoryInputProps = {
  errors?: Array<string> | undefined
}

const CategoryInput = ({ errors }: CategoryInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [categories, setCategories] = useState<Array<CategoriesType> | null>(
    null,
  )
  const toast = useToast()
  const { selectedCategory } = useCategoryStore()
  const setSelectedCategory = useCategoryStore(
    (state) => state.setSelectedCategory,
  )
  const handleCategoryModal = async () => {
    if (!categories) {
      try {
        const fetchedCategories = await fetchCategories()
        setCategories(fetchedCategories)
      } catch (error: any) {
        toast({
          title: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        return
      }
    }
    onOpen()
  }
  return (
    <>
      <Input
        type="hidden"
        readOnly
        name="category_id"
        value={selectedCategory ? selectedCategory.id : ''}
      />
      <InputGroup size='md'>
        <Input
          placeholder="カテゴリー"
          size="md"
          name="category_name"
          readOnly
          value={selectedCategory ? selectedCategory.name : ''}
          pr={10}
        />
        <InputRightElement width='4.5rem'>
          {selectedCategory ? (
            <Button size='sm' variant='ghost' p={0}><CustomIcon iconName="FaTimes" color='brand.gray' onClick={() => setSelectedCategory('')} /></Button>
          ) : (
            <Button h='1.75rem' size='sm' variant='secondary' onClick={handleCategoryModal}>選択</Button>
          )}
        </InputRightElement>
      </InputGroup>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle="カテゴリーを探す"
        buttonText="削除"
        size="lg"
      >
        <CategoryList categories={categories} onClose={onClose} />
      </CustomModal>
      <FormErrorMessage>{errors}</FormErrorMessage>
    </>
  )
}

export default CategoryInput
