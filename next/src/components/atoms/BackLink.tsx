'use client'

import { Button, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import CustomIcon from './CustomIcon'
import TextIconLink from '../molecules/TextIconLink'

type BackLinkProps = {
  href?: string
  children: ReactNode
}

const BackLink = ({ href, children }: BackLinkProps) => {
  const router = useRouter()

  return (
    <>
    {href ? (
      <TextIconLink iconPosition="left" iconName="FaChevronLeft" href={href}>
        {children}
      </TextIconLink>
    ) : (
      <HStack spacing={1}>
        <CustomIcon iconName="FaChevronLeft" color="brand.link" />
        <Button type="button" variant="ghost" fontWeight="normal" p={0} h="auto" minW="none" justifyContent="left" color="brand.link" fontSize="sm" lineHeight="base" textDecoration="underline" _hover={{ textDecoration: "none"}} onClick={() => router.back()}>
          {children}
        </Button>
      </HStack>
    )}
    </>
  )
}

export default BackLink
