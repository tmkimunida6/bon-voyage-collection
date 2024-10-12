'use client'

import { Icon, IconProps } from '@chakra-ui/react'
import { iconMapper } from '@/app/iconMapper'

type Props = IconProps & {
  iconName: keyof typeof iconMapper
}

const CustomIcon = (props: Props) => {
  const { iconName } = props;
  return (
    <Icon as={iconMapper[iconName]} {...props} />
  )
}

export default CustomIcon;