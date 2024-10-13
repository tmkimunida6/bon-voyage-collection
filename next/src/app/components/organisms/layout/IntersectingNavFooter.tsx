'use client'

import { useRef } from 'react'
import { useIntersection } from 'use-intersection'
import Footer from './Footer'
import Nav from './Nav'

const IntersectingNavFooter = () => {
  const footerRef = useRef<HTMLElement>(null)
  const footerIntersecting = useIntersection(footerRef)

  return (
    <>
      <Nav footerIntersecting={footerIntersecting} />
      <Footer ref={footerRef} />
    </>
  )
}

export default IntersectingNavFooter
