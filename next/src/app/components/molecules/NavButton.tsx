import { VStack, Button, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import CustomIcon from '../atoms/CustomIcon'
import { iconMapper } from '@/app/iconMapper'

type NavButtonProps = {
  iconName: keyof typeof iconMapper,
  text: string
}

const NavButton = ({ iconName, text }: NavButtonProps) => {
  return (
    <Button as={NextLink} href="#" p={2} h="auto" flex="1" bg="brand.gray">
      <VStack gap="2px">
        <CustomIcon iconName={iconName} color="white" />
        <Text fontSize="xs" color="white">{text}</Text>
      </VStack>
    </Button>
  )
}

export default NavButton;