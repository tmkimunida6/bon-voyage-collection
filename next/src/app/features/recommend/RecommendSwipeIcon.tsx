import { Text, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import CustomIcon from '@/components/atoms/CustomIcon'

type RecommendSwipeIcontype = {
  position: 'left' | 'right'
}

export default function RecommendSwipeIcon({
  position,
}: RecommendSwipeIcontype) {
  const stylesByPosition = useMemo(() => {
    const isLeft = position === 'left'
    return {
      side: isLeft
        ? { left: { base: '-16px', sm: 0 } }
        : { right: { base: '-16px', sm: 0 } },
      color: isLeft ? '#708E6F' : '#B87980',
      transform: isLeft ? '' : 'scale(-1, 1)',
      label: isLeft ? 'スキップ' : '欲しい！',
    }
  }, [position])

  return (
    <VStack
      spacing={0}
      position="absolute"
      top="50%"
      {...stylesByPosition.side}
      transform="translateY(-50%)"
      color={stylesByPosition.color}
      zIndex={1}
    >
      <CustomIcon
        iconName="FaReplyAll"
        fontSize={60}
        opacity={0.6}
        transform={stylesByPosition.transform}
      />
      <Text fontSize="sm" fontWeight="bold">
        {stylesByPosition.label}
      </Text>
    </VStack>
  )
}
