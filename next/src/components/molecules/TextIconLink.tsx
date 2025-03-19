import { Link as ChakraLink } from '@chakra-ui/next-js'
import { HStack } from '@chakra-ui/react'
import NextLink from 'next/link'
import { ReactNode } from 'react'
import CustomIcon from '../atoms/CustomIcon'
import { iconMapper } from '@/utils/iconMapper'

type TextIconLinkProps = {
  iconName: keyof typeof iconMapper
  iconPosition?: 'left' | 'right'
  href: string
  openInNew?: boolean
  children: ReactNode
}

const TextIconLink = ({
  iconName,
  iconPosition,
  href,
  children,
  openInNew,
}: TextIconLinkProps) => {
  return (
    <HStack spacing={1} width="max-content">
      {iconPosition === 'left' && (
        <CustomIcon iconName={iconName} color="brand.link" />
      )}
      <ChakraLink
        as={NextLink}
        href={href}
        fontSize="sm"
        color="brand.link"
        target={openInNew ? '_blank' : undefined}
        rel={openInNew ? 'noopener noreferrer' : undefined}
      >
        {children}
      </ChakraLink>
      {iconPosition === 'right' && (
        <CustomIcon iconName={iconName} color="brand.link" />
      )}
    </HStack>
  )
}

export default TextIconLink
