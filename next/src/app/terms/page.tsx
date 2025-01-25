import { Box } from '@chakra-ui/react'
import { Metadata } from 'next'
import TermsOfUseContent from '../features/policy/TermsOfUseContent'

export const metadata: Metadata = {
  title: '利用規約 | Bon Voyage Collcection',
  description: 'Bon Voyage Collcectionの利用規約についてご紹介しています。',
  keywords: 'お土産,Souvenir,利用規約,Bon Voyage Collection',
  robots: {
    index: false,
  },
}

export default function Terms() {
  return (
    <Box px={{ base: 6, md: 10 }} py={{ base: 10, md: 16 }} bg="white">
      <TermsOfUseContent />
    </Box>
  )
}
