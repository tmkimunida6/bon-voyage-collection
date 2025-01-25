import { Metadata } from 'next'
import PrivacyPolicyContent from '../features/policy/PrivacyPolicyContent'
import { Box } from '@chakra-ui/react'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | Bon Voyage Collcection',
  description:
    'Bon Voyage Collcectionのプライバシーポリシーについてご紹介しています。',
  keywords: 'お土産,Souvenir,プライバシーポリシー,Bon Voyage Collection',
  robots: {
    index: false,
  },
}

export default function Privacy() {
  return (
    <Box px={{ base: 6, md: 10 }} py={{ base: 10, md: 16 }}>
      <PrivacyPolicyContent />
    </Box>
  )
}
