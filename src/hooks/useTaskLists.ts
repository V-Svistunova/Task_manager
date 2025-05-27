'use client'

import { useEffect, useState } from 'react'

export type Task = {
    id: string
    title: string
    description?: string
    deadline?: string
    completed: boolean
}

export type TaskList = {
    id: string
    title: string
    tasks: Task[]
}

const generateMockData = (): TaskList[] => [
    {
        id: crypto.randomUUID(),
        title: 'Работа',
        tasks: [
            {
                id: crypto.randomUUID(),
                title: 'Подготовить презентацию для клиента',
                description: 'Создать слайды, подготовить демо и обсудить ключевые пункты',
                deadline: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), // +2 дня
                completed: false,
            },
            {
                id: crypto.randomUUID(),
                title: 'Проверить и ответить на важные письма',
                description: 'Сосредоточиться на письмах от руководства и клиентов',
                deadline: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 часов назад
                completed: true,
            },
            {
                id: crypto.randomUUID(),
                title: 'Встретиться с командой разработки',
                description: 'Обсудить архитектуру нового модуля',
                deadline: new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString(), // через 3 часа
                completed: false,
            },
        ],
    },
    {
        id: crypto.randomUUID(),
        title: 'Дом',
        tasks: [
            {
                id: crypto.randomUUID(),
                title: 'Купить продукты на неделю',
                description: 'Молоко, яйца, овощи, мясо, крупы, хлеб',
                deadline: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // +1 день
                completed: false,
            },
            {
                id: crypto.randomUUID(),
                title: 'Уборка квартиры',
                description: 'Пропылесосить, вытереть пыль, помыть полы',
                deadline: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(), // +8 часов
                completed: true,
            },
            {
                id: crypto.randomUUID(),
                title: 'Полить цветы',
                description: 'Особенно орхидеи и фикус',
                completed: false,
            },
        ],
    },
    {
        id: crypto.randomUUID(),
        title: 'Личное',
        tasks: [
            {
                id: crypto.randomUUID(),
                title: 'Позвонить бабушке',
                description: 'Уточнить, как она себя чувствует, и поболтать',
                deadline: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(), // через 4 часа
                completed: false,
            },
            {
                id: crypto.randomUUID(),
                title: 'Пробежка в парке',
                description: 'Мин. 30 минут, не забыть растяжку',
                deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(), // +3 дня
                completed: false,
            },
            {
                id: crypto.randomUUID(),
                title: 'Прочитать 1 главу книги',
                description: 'Книга: «Магия утра»',
                completed: true,
            },
        ],
    },
]

export function useTaskLists() {
    const [lists, setLists] = useState<TaskList[]>([])
    const [title, setTitle] = useState('')

    // --- Добавляем редактирование ---
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editedTitle, setEditedTitle] = useState('')

    useEffect(() => {
        const saved = localStorage.getItem('taskLists')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setLists(parsed)
                } else {
                    const mocks = generateMockData()
                    setLists(mocks)
                    localStorage.setItem('taskLists', JSON.stringify(mocks))
                }
            } catch {
                const mocks = generateMockData()
                setLists(mocks)
                localStorage.setItem('taskLists', JSON.stringify(mocks))
            }
        } else {
            const mocks = generateMockData()
            setLists(mocks)
            localStorage.setItem('taskLists', JSON.stringify(mocks))
        }
    }, [])

    useEffect(() => {
        if (lists.length > 0) {
            localStorage.setItem('taskLists', JSON.stringify(lists))
        }
    }, [lists])

    const addList = () => {
        if (!title.trim()) return
        const newList: TaskList = {
            id: crypto.randomUUID(),
            title: title.trim(),
            tasks: [],
        }
        setLists([...lists, newList])
        setTitle('')
    }

    const editList = (id: string, newTitle: string, newTasks?: Task[]) => {
        setLists(prev =>
            prev.map(list =>
                list.id === id ? { ...list, title: newTitle, tasks: newTasks ?? list.tasks } : list
            )
        )
    }

    const deleteList = (id: string) => {
        setLists(prev => prev.filter(list => list.id !== id))
    }

    const startEditing = (id: string, currentTitle: string) => {
        setEditingId(id)
        setEditedTitle(currentTitle)
    }

    const cancelEditing = () => {
        setEditingId(null)
        setEditedTitle('')
    }

    const saveEditing = () => {
        if (!editingId) return
        const trimmed = editedTitle.trim()
        if (trimmed) {
            editList(editingId, trimmed)
        }
        cancelEditing()
    }

    return {
        lists,
        title,
        setTitle,
        addList,
        editList,
        deleteList,
        editingId,
        editedTitle,
        setEditedTitle,
        startEditing,
        cancelEditing,
        saveEditing,
    }
}