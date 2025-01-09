'use client'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useFormState } from 'react-dom'
import TextIconLink from '@/components/molecules/TextIconLink'
import { changeProfileSchema } from '@/schemas/userSchema'
import UploadImageForm from '@/components/molecules/UploadImageForm'
import { changeProfileAction } from '@/actions/changeProfileAction'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import CustomModal from '../modal/CustomModal'
import PasswordInput from '@/components/atoms/PasswordInput'
import UploadAvatarForm from '@/components/molecules/UploadAvatarForm'

type ChangeProfileFormProps = {
  nickname: string
  image: string
}

const ChangeProfileForm = ({ nickname, image }: ChangeProfileFormProps) => {
  const [newNickname, setNewNickname] = useState(nickname)
  const [newAvatarUrl, setNewAvatarUrl] = useState(image)

  const [lastResult, action] = useFormState(changeProfileAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: changeProfileSchema })
    },
  })

  // 成功時のメッセージ
  const toast = useToast()
  useEffect(() => {
    if (lastResult?.status === 'success') {
      toast({
        title: 'プロフィールが更新されました。',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      redirect('/setting')
    }
  }, [lastResult])

  // モーダル
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
      {form.errors && (
        <Alert status="error" my={4} borderRadius={4}>
          <AlertIcon />
          <AlertDescription>{form.errors[0]}</AlertDescription>
        </Alert>
      )}
      <Stack spacing={6}>
        <Box>
          <FormControl isInvalid={!!fields.nickname.errors}>
            <FormLabel>表示名</FormLabel>
            <Input
              type='text'
              name={fields.nickname.name}
              placeholder="例：ボンボヤージュ太郎"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
            />
            <FormErrorMessage>{fields.nickname.errors}</FormErrorMessage>
          </FormControl>
          <Text fontSize="xs" color="gray.500">*未設定時はユーザーIDが表示名となります。</Text>
        </Box>
        <UploadAvatarForm
          name={fields.image.name}
          errors={fields.image.errors}
          isRequired={true}
          newAvatarUrl={newAvatarUrl}
          setNewAvatarUrl={setNewAvatarUrl}
        />
        <VStack>
          <Button variant="primary" onClick={() => onOpen()}>変更内容を確認</Button>
          <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            modalTitle="変更内容の確認"
            buttonText="変更を完了する"
            isSubmit={true}
          >
            <TableContainer whiteSpace="wrap">
              <Table variant='simple' size="sm">
                <Tbody>
                  <Tr>
                    <Td px={2} fontWeight="bold" whiteSpace="nowrap">表示名</Td>
                    <Td px={2}>{newNickname === nickname ? "変更なし" : newNickname}</Td>
                  </Tr>
                  <Tr>
                    <Td px={2} fontWeight="bold" whiteSpace="nowrap">プロフィール<br/>画像</Td>
                    <Td px={2}><Avatar size="md" src={newAvatarUrl || "https://bit.ly/broken-link"} /></Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Stack spacing={4} mt={8}>
              <Text fontSize="sm">上記の内容で問題なければ、パスワードを入力の上、変更を完了してください。</Text>
              <FormControl isRequired={true} isInvalid={!!fields.password.errors}>
                <PasswordInput name={fields.password.name} />
                <FormErrorMessage>{fields.password.errors}</FormErrorMessage>
              </FormControl>
            </Stack>
          </CustomModal>
        </VStack>
        <TextIconLink
          iconPosition="left"
          iconName="FaChevronLeft"
          href="/setting"
        >
          戻る
        </TextIconLink>
      </Stack>
    </form>
  )
}

export default ChangeProfileForm
