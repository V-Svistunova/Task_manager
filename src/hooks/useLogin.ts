import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function useLogin() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    function validateEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    async function handleLogin(): Promise<void> {
        setError('')

        if (!validateEmail(email)) {
            setError('Введите корректный email')
            return
        }

        if (password.length < 6) {
            setError('Пароль должен быть не менее 6 символов')
            return
        }

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            })

            if (res.ok) {
                localStorage.setItem('auth', 'true')
                document.cookie = 'auth=true; path=/'
                router.push('/lists')
            } else {
                setError('Неверные учетные данные')
            }
        } catch {
            setError('Ошибка сервера, попробуйте позже')
        }
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        error,
        handleLogin,
    }
}
