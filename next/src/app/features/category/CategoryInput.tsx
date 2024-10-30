/* eslint @typescript-eslint/no-explicit-any: 0 */

'use client'

import { Input, useDisclosure, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import CategoryList from './CategoryList'
import CustomModal from '@/components/organisms/modal/CustomModal'
import { CategoryType } from '@/types/types'
import { fetchCategories } from '@/utils/fetchCategories'

const CategoryInput = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [categories, setCategories] = useState<Array<CategoryType> | null>(null)
  const toast = useToast()
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
        placeholder="カテゴリー"
        size="md"
        onClick={handleCategoryModal}
        readOnly
      />
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle="カテゴリーを探す"
        buttonText="確定する"
        size="lg"
      >
        <CategoryList categories={categories} />
      </CustomModal>
    </>
  )
}

export default CategoryInput
