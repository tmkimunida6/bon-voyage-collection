import { ReactNode } from 'react'
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading, HStack, Text, ThemeTypings } from '@chakra-ui/react'

type CustomAccordionItemProps = {
  title: string,
  triggerBgColor?: string,
  hasBorder?: boolean,
  children: ReactNode
}

const CustomAccordionItem = ({ title, triggerBgColor = 'brand.secondary', hasBorder = false, children }: CustomAccordionItemProps) => {
  return (
  <AccordionItem>
    <Heading>
      <AccordionButton
        bg={triggerBgColor}
        color='white'
        borderRadius='4px'
        _hover={{ bg: triggerBgColor, opacity: 0.7 }}
        _expanded={{ borderRadius: '4px 4px 0 0' }}
      >
        <Box as='span' flex='1' textAlign='left'>
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
      borderColor={hasBorder ? 'brand.primary' : 'transparent'}
    >
      {children}
    </AccordionPanel>
  </AccordionItem>
  )
}

export default CustomAccordionItem;