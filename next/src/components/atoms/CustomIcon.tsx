'use client'

import { Icon, IconProps } from '@chakra-ui/react'
import { iconMapper } from '@/utils/iconMapper'

type Props = IconProps & {
  iconName: keyof typeof iconMapper
}

const CustomIcon = ({ iconName, ...rest }: Props) => {
  return <Icon as={iconMapper[iconName]} {...rest} />
}

export default CustomIcon
