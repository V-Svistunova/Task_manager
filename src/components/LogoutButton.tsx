'use client'

import { useRouter } from 'next/navigation'

export function LogoutButton(): JSX.Element {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem('auth')
        document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        router.push('/welcome')
    }

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md
                       hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500"
            type="button"
            aria-label="Выйти из аккаунта"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                />
            </svg>
            Выйти
        </button>
    )
}