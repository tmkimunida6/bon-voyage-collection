import { HStack, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'
import CustomIcon from '../atoms/CustomIcon'
import { iconMapper } from '@/app/iconMapper'

type DataWithIconProps = {
  iconName: keyof typeof iconMapper,
  children: ReactNode
}

const DataWithIcon = ({ iconName, children }: DataWithIconProps) => {
  return (
    <HStack spacing={1}>
      <CustomIcon iconName={iconName} color='brand.primary' />
      {children}
    </HStack>
  )
}

export default DataWithIcon;