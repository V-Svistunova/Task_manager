'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home(): JSX.Element | null {
  const router = useRouter()

  useEffect(() => {
    const isAuth = localStorage.getItem('auth') === 'true'
    router.replace(isAuth ? '/lists' : '/welcome')
  }, [router])

  return null
}
