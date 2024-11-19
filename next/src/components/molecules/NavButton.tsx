import { VStack, Button, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import CustomIcon from '../atoms/CustomIcon'
import { iconMapper } from '@/utils/iconMapper'

type NavButtonProps = {
  iconName: keyof typeof iconMapper
  text: string
  href: string
}

const NavButton = ({ iconName, text, href }: NavButtonProps) => {
  return (
    <Button
      as={NextLink}
      href={href}
      p={2}
      h="auto"
      flex="1"
      bg="transparent"
      borderRadius={0}
      color="white"
      maxW="calc(660px / 4)"
      _hover={{
        bg: 'white',
        color: 'brand.secondary',
      }}
    >
      <VStack gap="2px">
        <CustomIcon iconName={iconName} />
        <Text fontSize="xs">{text}</Text>
      </VStack>
    </Button>
  )
}

export default NavButton
