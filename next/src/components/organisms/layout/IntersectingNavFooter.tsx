'use client'

import { useEffect, useRef, useState } from 'react'
import Footer from './Footer'
import Nav from './Nav'

const IntersectingNavFooter = () => {
  const footerRef = useRef<HTMLElement>(null)
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold: 0 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [footerRef])
  return (
    <>
      <Nav isIntersecting={isIntersecting} />
      <Footer ref={footerRef} />
    </>
  )
}

export default IntersectingNavFooter
