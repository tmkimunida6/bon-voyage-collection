import { Flex, Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'
import CustomIcon from '@/components/atoms/CustomIcon'
import { iconMapper } from '@/utils/iconMapper'

type settingLinkProps = {
  href: string
  linkText: string
  icon: keyof typeof iconMapper
}

const SettingLink = ({ href, linkText, icon }: settingLinkProps) => {
  return (
    <Flex borderBottom="1px solid" borderColor="brand.primary">
      <ChakraLink
        as={NextLink}
        href={href}
        fontSize="md"
        textDecoration="none"
        py={4}
        display="flex"
        alignItems="center"
        gap={2}
        w="100%"
        transition="all 0.3s"
        _hover={{ color: 'brand.link' }}
      >
        <CustomIcon iconName={icon} />
        {linkText}
      </ChakraLink>
    </Flex>
  )
}

export default SettingLink
