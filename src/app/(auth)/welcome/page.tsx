'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Welcome(): JSX.Element {
    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem('auth') === 'true') {
            router.replace('/lists')
        }
    }, [router])

    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-900">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center max-w-xl">
                Добро пожаловать в <span className="text-blue-600">Task Manager</span>
            </h1>
            <button
                onClick={() => router.push('/login')}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
                aria-label="Перейти к странице входа"
            >
                Войти
            </button>
            <p className="mt-6 max-w-sm text-center text-gray-600 text-sm sm:text-base">
                Управляйте своими задачами легко и удобно. Начните прямо сейчас!
            </p>
        </main>
    )
}