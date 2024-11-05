'use client'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFormState } from 'react-dom'
import CustomModal from '../modal/CustomModal'
import { createSouvenirAction } from '@/actions/createSouvenirAction'
import RatingSlider from '@/components/molecules/RatingSlider'
import { newSouvenirSchema } from '@/schemas/souvenirSchema'
import SearchForm from './SearchForm'
import { useSouvenirStore } from '@/store/store'
import SubmitButton from '@/components/atoms/SubmitButton'

const PostForm = () => {
  const [lastResult, action] = useFormState(createSouvenirAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: newSouvenirSchema })
    },
  })

  // モーダル
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleSouvenirModal = () => {
    onOpen()
  }

  // お土産グローバルステート
  const { selectedSouvenir } = useSouvenirStore()

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
      {form.errors && (
        <Alert status="error" my={4} borderRadius={4}>
          <AlertIcon />
          <AlertDescription>{form.errors[0]}</AlertDescription>
        </Alert>
      )}
      <Stack spacing={6}>
        <Input type="hidden" readOnly name="souvenir_id" value={selectedSouvenir.id} />
        <InputGroup size="md">
          <Input
            placeholder="お土産を選択"
            size="md"
            name="souvenir_name"
            value={selectedSouvenir.name}
            readOnly
            pr={10}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              variant="secondary"
              onClick={handleSouvenirModal}
            >
              検索
            </Button>
          </InputRightElement>
          <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            modalTitle="お土産を探す"
            buttonText={selectedSouvenir.id ? "確定する" : ""}
            size="lg"
          >
            <SearchForm page="post" />
          </CustomModal>
        </InputGroup>
        <Stack spacing={1}>
          <Heading as="h2" fontSize="md">
            レビュー
          </Heading>
          <RatingSlider />
          <HStack spacing={1} mt={3}>
            <Select placeholder="誰に？" size="sm" name="toWho">
              <option value="自分">自分</option>
              <option value="家族">家族</option>
              <option value="友人">友人</option>
              <option value="ペット">ペット</option>
              <option value="その他">その他</option>
            </Select>
            <Select placeholder="年齢層" size="sm" name="age">
              <option value="0~9歳">0~9歳</option>
              <option value="10代">10代</option>
              <option value="20代">20代</option>
              <option value="30代">30代</option>
              <option value="40代">40代</option>
              <option value="50代">50代</option>
              <option value="60代">60代</option>
              <option value="70代以上">70代以上</option>
            </Select>
          </HStack>
          <Textarea placeholder="感想を記入" />
        </Stack>
        <SubmitButton>記録する</SubmitButton>
      </Stack>
    </form>
  )
}

export default PostForm
