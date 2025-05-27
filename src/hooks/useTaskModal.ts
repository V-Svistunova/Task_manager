import { useState, useEffect } from 'react'
import { Task } from './useTaskLists'

interface UseTaskModalParams {
    task: Task | null
    onUpdateTask: (updatedTask: Task) => void
    onDeleteTask: (taskId: string) => void
    onClose: () => void
}

export function useTaskModal({ task, onUpdateTask, onDeleteTask, onClose }: UseTaskModalParams) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedTask, setEditedTask] = useState<Task | null>(null)
    const [timeLeft, setTimeLeft] = useState('')

    useEffect(() => {
        if (task) {
            setEditedTask(task)
            calculateTimeLeft(task.deadline)
        } else {
            setEditedTask(null)
            setTimeLeft('')
        }
    }, [task])

    // Таймер обновления оставшегося времени каждую секунду
    useEffect(() => {
        if (!task?.deadline) return

        const interval = setInterval(() => {
            calculateTimeLeft(task.deadline)
        }, 1000)

        return () => clearInterval(interval)
    }, [task])

    // Функция вычисления оставшегося времени
    function calculateTimeLeft(deadline?: string) {
        if (!deadline) {
            setTimeLeft('')
            return
        }
        const diff = new Date(deadline).getTime() - Date.now()
        if (diff <= 0) {
            setTimeLeft('Время вышло')
            return
        }

        const hours = Math.floor(diff / 1000 / 60 / 60)
        const minutes = Math.floor((diff / 1000 / 60) % 60)
        const seconds = Math.floor((diff / 1000) % 60)

        setTimeLeft(`${hours}ч ${minutes}м ${seconds}с`)
    }

    // Сохраняем изменения
    function handleSave() {
        if (editedTask) {
            onUpdateTask(editedTask)
            setIsEditing(false)
            onClose()
        }
    }

    // Удаляем задачу
    function handleDelete() {
        if (task) {
            onDeleteTask(task.id)
            onClose()
        }
    }

    return {
        isEditing,
        setIsEditing,
        editedTask,
        setEditedTask,
        timeLeft,
        handleSave,
        handleDelete,
    }
}
