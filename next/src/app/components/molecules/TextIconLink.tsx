import { HStack } from '@chakra-ui/react'
import { Link as ChakraLink } from '@chakra-ui/next-js'
import NextLink from 'next/link'
import { ReactNode } from 'react'
import CustomIcon from '../atoms/CustomIcon'
import { iconMapper } from '@/app/iconMapper'

type TextIconLinkProps = {
  iconName: keyof typeof iconMapper,
  iconPosition?: 'left' | 'right',
  href: string
  children: ReactNode
}

const TextIconLink = ({ iconName, iconPosition, href, children }: TextIconLinkProps) => {
  return (
    <HStack spacing={1}>
      {
        iconPosition === 'left' && <CustomIcon iconName={iconName} color="brand.link" />
      }
      <ChakraLink as={NextLink} href={href} fontSize="sm" color="brand.link">
        {children}
      </ChakraLink>
      {
        iconPosition === 'right' && <CustomIcon iconName={iconName} color="brand.link" />
      }
    </HStack>
  )
}

export default TextIconLink;