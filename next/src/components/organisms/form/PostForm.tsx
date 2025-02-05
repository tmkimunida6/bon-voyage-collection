/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import {
  Accordion,
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { redirect, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import CustomModal from '../modal/CustomModal'
import SearchForm from './SearchForm'
import { createPostAction } from '@/actions/createPostAction'
import MemoryInputModal from '@/app/features/post/MemoryInputModal'
import PlaceInput from '@/app/features/post/PlaceInput'
import PriceInput from '@/app/features/post/PriceInput'
import CustomIcon from '@/components/atoms/CustomIcon'
import SubmitButton from '@/components/atoms/SubmitButton'
import CustomAccordionItem from '@/components/molecules/CustomAccordionItem'
import RatingSlider from '@/components/molecules/RatingSlider'
import UploadImageForm from '@/components/molecules/UploadImageForm'
import { ageOptions, forWhoOptions } from '@/constants/options'
import { postSchema } from '@/schemas/postSchema'
import { useSouvenirStore } from '@/store/index'

const PostForm = () => {
  const [lastResult, action] = useFormState(createPostAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postSchema })
    },
  })

  // モーダル
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleSouvenirModal = () => {
    onOpen()
  }

  // お土産グローバルステート
  const { selectedSouvenir, setSelectedSouvenir } = useSouvenirStore()

  // パラメータからお土産の入力
  const searchParams = useSearchParams()
  useEffect(() => {
    if (searchParams.size) {
      const souvenir_id = searchParams.get('souvenir_id') || ''
      const souvenir_name = searchParams.get('souvenir_name') || ''
      setSelectedSouvenir({ alias_id: souvenir_id, name: souvenir_name })
    }
  }, [])

  // フォーム送信後の処理
  const toast = useToast()
  useEffect(() => {
    if (!lastResult) return
    if (lastResult.status === 'success') {
      toast({
        title: '記録が完了しました。',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      redirect('/timeline')
    }
  }, [lastResult])

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
      {form.errors && (
        <Alert status="error" my={4} borderRadius={4}>
          <AlertIcon />
          <AlertDescription>{form.errors[0]}</AlertDescription>
        </Alert>
      )}
      <Stack spacing={6}>
        <FormControl isRequired isInvalid={!!fields.souvenir_id.errors}>
          <Input
            type="hidden"
            isReadOnly
            name={fields.souvenir_id.name}
            value={selectedSouvenir.alias_id}
          />
          <InputGroup size="md">
            <Input
              placeholder="お土産を選択"
              size="md"
              name={fields.souvenir_name.name}
              value={selectedSouvenir.name}
              isReadOnly
              pr={selectedSouvenir.alias_id ? 8 : 4}
              onClick={handleSouvenirModal}
            />
            {selectedSouvenir.alias_id && (
              <InputRightElement>
                <Button size="sm" variant="ghost" p={0}>
                  <CustomIcon
                    iconName="FaTimes"
                    color="gray.400"
                    onClick={() =>
                      setSelectedSouvenir({ alias_id: '', name: '' })
                    }
                  />
                </Button>
              </InputRightElement>
            )}
            <CustomModal
              isOpen={isOpen}
              onClose={onClose}
              modalTitle="お土産を探す"
              buttonText=""
              size="lg"
            >
              <SearchForm />
            </CustomModal>
          </InputGroup>
          <FormErrorMessage>{fields.souvenir_id.errors}</FormErrorMessage>
        </FormControl>
        <UploadImageForm
          name={fields.image.name}
          errors={fields.image.errors}
          isRequired={false}
        />
        <Accordion allowMultiple w="100%">
          <CustomAccordionItem title="購入データを入力" hasBorder={true}>
            <Stack spacing={4} p={4} bg="white">
              <PlaceInput />
              <PriceInput
                name={fields.price.name}
                errors={fields.price.errors}
              />
            </Stack>
          </CustomAccordionItem>
        </Accordion>
        <Accordion allowMultiple w="100%">
          <CustomAccordionItem title="レビューを入力" hasBorder={true}>
            <Box p={4} bg="white">
              <Stack spacing={1}>
                <RatingSlider />
                <HStack spacing={1} mt={3}>
                  <Select
                    placeholder="誰に？"
                    size="sm"
                    name={fields.for_who.name}
                  >
                    {forWhoOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <Select placeholder="年齢層" size="sm" name={fields.age.name}>
                    {ageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </HStack>
                <Textarea
                  placeholder="感想を記入"
                  name={fields.review.name}
                  size="md"
                  rows={4}
                />
              </Stack>
            </Box>
          </CustomAccordionItem>
        </Accordion>
        <MemoryInputModal
          memoryImageName={fields.memory_image.name}
          memoryContentName={fields.memory_content.name}
        />
        <SubmitButton>記録する</SubmitButton>
      </Stack>
    </form>
  )
}

export default PostForm
