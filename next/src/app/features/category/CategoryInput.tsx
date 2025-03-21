/* eslint @typescript-eslint/no-unused-vars: 0 */

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
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import CategoryList from './CategoryList'
import CustomIcon from '@/components/atoms/CustomIcon'
import CustomModal from '@/components/organisms/modal/CustomModal'
import { useCategoryStore } from '@/store/index'
import { CategoriesType } from '@/types/types'
import { fetchCategories } from '@/utils/fetchCategories'

type CategoryInputProps = {
  errors?: Array<string> | undefined
}

const CategoryInput = ({ errors }: CategoryInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [categories, setCategories] = useState<Array<CategoriesType> | null>(
    null,
  )
  const toast = useToast()
  const handleCategoryModal = async () => {
    if (!categories) {
      try {
        const fetchedCategories = await fetchCategories()
        setCategories(fetchedCategories)
      } catch (error) {
        toast({
          title:
            'サーバーエラーが発生しました。時間をおいてから再度お試しください。',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        return
      }
    }
    onOpen()
  }

  const { selectedCategory, setSelectedCategory } = useCategoryStore()

  // 初回ロード時にクエリにカテゴリーがあった場合にデフォルトの値をセット
  const searchParams = useSearchParams()
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    const defaultCategoryId = params.get('category_id')
    const defaultCategoryName = params.get('category_name')
    if (defaultCategoryId && defaultCategoryName) {
      setSelectedCategory({
        id: Number(defaultCategoryId),
        name: defaultCategoryName,
      })
    }
  }, [searchParams, setSelectedCategory])

  return (
    <>
      <Input
        type="hidden"
        isReadOnly
        name="category_id"
        value={selectedCategory.id || ''}
      />
      <InputGroup size="md">
        <Input
          placeholder="カテゴリーを選択"
          size="md"
          name="category_name"
          isReadOnly
          value={selectedCategory.name || ''}
          pr={selectedCategory.id ? 8 : 4}
          onClick={handleCategoryModal}
        />
        {selectedCategory.id && (
          <InputRightElement>
            <Button size="sm" variant="ghost" p={0}>
              <CustomIcon
                iconName="FaTimes"
                color="gray.400"
                onClick={() => setSelectedCategory({ id: '', name: '' })}
              />
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle="カテゴリーを探す"
        buttonText=""
        size="lg"
      >
        <CategoryList categories={categories} onClose={onClose} />
      </CustomModal>
      <FormErrorMessage>{errors}</FormErrorMessage>
    </>
  )
}

export default CategoryInput
