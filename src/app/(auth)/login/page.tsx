'use client'

import { useLogin } from '@/hooks/useLogin'
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function LoginPage(): JSX.Element {
    const { email, setEmail, password, setPassword, error, handleLogin } = useLogin()

    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem('auth') === 'true') {
            router.replace('/lists')
        }
    }, [router])

    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-br from-white via-blue-50 to-white text-gray-900">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-semibold mb-6 text-center">Вход</h2>

                <label className="block mb-4">
                    <span className="text-gray-700 mb-1 block font-medium">Email</span>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Введите email"
                        autoComplete="email"
                        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        aria-label="Email"
                    />
                </label>

                <label className="block mb-6">
                    <span className="text-gray-700 mb-1 block font-medium">Пароль</span>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Введите пароль"
                        autoComplete="current-password"
                        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        aria-label="Пароль"
                    />
                </label>

                {error && (
                    <p className="mb-4 text-center text-red-600 font-semibold" role="alert" aria-live="assertive">
                        {error}
                    </p>
                )}

                <button
                    onClick={handleLogin}
                    type="button"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 font-semibold"
                    aria-label="Войти в систему"
                >
                    Войти
                </button>
            </div>
        </main>
    )
}