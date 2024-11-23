/* eslint react-hooks/exhaustive-deps: 0 */

'use client'

import { Button } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import CustomIcon from '@/components/atoms/CustomIcon'
import { useMyPostsStore } from '@/store/store'
import { SouvenirDetailType } from '@/types/types'

type PostButtonFromDetailProps = {
  currentSouvenir: SouvenirDetailType
}

export default function PostButtonFromDetail({
  currentSouvenir,
}: PostButtonFromDetailProps) {
  const { myPosts } = useMyPostsStore()
  const [isPosted, setIsPosted] = useState<boolean>(false)

  useEffect(() => {
    const hasPost = myPosts.some(
      (post) => post.souvenir.alias_id === currentSouvenir.alias_id,
    )
    if (hasPost) {
      setIsPosted(true)
    }
  }, [myPosts])

  return (
    <>
      {isPosted ? (
        <Button variant="solid" gap={2} disabled>
          <CustomIcon iconName="FaGift" />
          記録済み
        </Button>
      ) : (
        <Button
          variant="primary"
          as={NextLink}
          href={`/post?souvenir_id=${currentSouvenir.alias_id}&souvenir_name=${currentSouvenir.name}`}
          gap={2}
        >
          <CustomIcon iconName="FaGift" />
          買った！
        </Button>
      )}
    </>
  )
}
