import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

type CustomAccordionItemProps = {
  title: string
  triggerBgColor?: string
  hasBorder?: boolean
  children: ReactNode
}

const CustomAccordionItem = ({
  title,
  triggerBgColor = 'brand.secondary',
  hasBorder = false,
  children,
}: CustomAccordionItemProps) => {
  const isWhite = triggerBgColor === 'white' || triggerBgColor === 'transparent'
  const accordionButtonStyles = isWhite
    ? {
        color: 'brand.black',
        borderRadius: 0,
      }
    : {
        color: 'white',
        borderRadius: '4px',
        _hover: { opacity: 0.7 },
        _expanded: { borderRadius: '4px 4px 0 0' },
      }

  return (
    <AccordionItem border="none">
      <Heading>
        <AccordionButton bg={triggerBgColor} {...accordionButtonStyles}>
          <Box as="span" flex="1" textAlign="left" fontWeight="bold">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Heading>
      <AccordionPanel
        p={0}
        borderRadius="0 0 4px 4px"
        border={hasBorder ? '1px solid' : 'none'}
        borderWidth={hasBorder ? '0 1px 1px 1px' : '0'}
        borderColor={hasBorder ? triggerBgColor : 'transparent'}
        overflow="hidden"
      >
        {children}
      </AccordionPanel>
    </AccordionItem>
  )
}

export default CustomAccordionItem
