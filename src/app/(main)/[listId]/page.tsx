'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTaskLists, Task } from '@/hooks/useTaskLists'
import { LogoutButton } from '@/components/LogoutButton'
import TaskModal from '@/components/TaskModal'

export default function TaskListDetailsPage() {
    const { listId } = useParams()
    const { lists, editList } = useTaskLists()

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const list = lists.find(l => l.id === listId)

    if (!list) {
        return (
            <main className="max-w-4xl mx-auto p-6 min-h-screen bg-neutral-50 text-neutral-900">
                <LogoutButton />
                <p className="text-red-600 text-lg mt-6">Список задач не найден.</p>
                <Link
                    href="/lists"
                    className="text-blue-600 hover:underline mt-4 inline-block text-sm"
                >
                    ← Вернуться к спискам задач
                </Link>
            </main>
        )
    }

    const addTask = () => {
        const titleTrimmed = newTaskTitle.trim()
        if (!titleTrimmed) return

        const newTask: Task = {
            id: crypto.randomUUID(),
            title: titleTrimmed,
            completed: false,
        }

        editList(list.id, list.title, [...list.tasks, newTask])
        setNewTaskTitle('')
    }

    const editTask = (taskId: string, updatedTask: Partial<Task>) => {
        const updatedTasks = list.tasks.map(task =>
            task.id === taskId ? { ...task, ...updatedTask } : task
        )
        editList(list.id, list.title, updatedTasks)
    }

    const deleteTask = (taskId: string) => {
        const filteredTasks = list.tasks.filter(task => task.id !== taskId)
        editList(list.id, list.title, filteredTasks)
    }

    const openModal = (task: Task) => {
        setSelectedTask(task)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedTask(null)
    }

    return (
        <main className="max-w-4xl mx-auto p-6 min-h-screen bg-neutral-50 text-neutral-900 font-sans">
            <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-neutral-800 tracking-tight">{list.title}</h1>
                <LogoutButton />
            </header>

            <Link
                href="/lists"
                className="text-blue-600 hover:underline mb-6 inline-block text-sm font-medium"
                aria-label="Вернуться к спискам задач"
            >
                ← Назад к спискам задач
            </Link>

            <section className="mb-6 flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Название новой задачи"
                    className="flex-grow px-4 py-2 border-2 border-blue-600 rounded-md text-lg
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
                     transition duration-150"
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') addTask()
                    }}
                />
                <button
                    onClick={addTask}
                    className="px-6 py-2 bg-green-600 text-white font-medium rounded-md
                     hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                >
                    Добавить
                </button>
            </section>

            {list.tasks.length === 0 ? (
                <p className="text-neutral-500 text-lg">Задачи отсутствуют.</p>
            ) : (
                <ul className="space-y-4">
                    {list.tasks.map(task => (
                        <li
                            key={task.id}
                            className="bg-white border border-neutral-200 rounded-lg shadow-sm hover:shadow-md
                         px-5 py-4 flex justify-between items-center transition cursor-pointer"
                            onClick={() => openModal(task)}
                        >
                            <div className="flex items-center gap-3 flex-grow">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={e => {
                                        e.stopPropagation()
                                        editTask(task.id, { completed: !task.completed })
                                    }}
                                    className="accent-blue-600"
                                />
                                <span
                                    className={`text-lg ${
                                        task.completed ? 'line-through text-gray-400' : 'text-neutral-900'
                                    }`}
                                >
                  {task.title}
                </span>
                            </div>
                            <button
                                onClick={e => {
                                    e.stopPropagation()
                                    deleteTask(task.id)
                                }}
                                className="text-red-600 hover:text-red-800 text-sm underline"
                            >
                                Удалить
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <TaskModal
                open={isModalOpen}
                onClose={closeModal}
                task={selectedTask}
                onUpdateTask={updatedTask => {
                    editTask(updatedTask.id, updatedTask)
                    closeModal()
                }}
                onDeleteTask={taskId => {
                    deleteTask(taskId)
                    closeModal()
                }}
            />
        </main>
    )
}