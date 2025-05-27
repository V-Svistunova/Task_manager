'use client'

import React from 'react'
import { Dialog } from '@headlessui/react'
import { Task } from '@/hooks/useTaskLists'
import { useTaskModal } from '@/hooks/useTaskModal'

interface TaskModalProps {
    open: boolean
    onClose: () => void
    task: Task | null
    onUpdateTask: (updatedTask: Task) => void
    onDeleteTask: (taskId: string) => void
}

export default function TaskModal({ open, onClose, task, onUpdateTask, onDeleteTask }: TaskModalProps) {
    const {
        isEditing,
        setIsEditing,
        editedTask,
        setEditedTask,
        timeLeft,
        handleSave,
        handleDelete,
    } = useTaskModal({ task, onUpdateTask, onDeleteTask, onClose })

    if (!task || !editedTask) return null

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl border border-gray-200">
                    <Dialog.Title className="text-2xl font-semibold text-gray-800 mb-6">
                        Информация о задаче
                    </Dialog.Title>

                    <div className="space-y-4 text-sm text-gray-700">
                        <div>
                            <label className="block font-medium mb-1">Название</label>
                            <input
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100"
                                disabled={!isEditing}
                                value={editedTask.title}
                                onChange={e => setEditedTask({ ...editedTask, title: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Описание</label>
                            <textarea
                                className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100"
                                rows={3}
                                disabled={!isEditing}
                                value={editedTask.description || ''}
                                onChange={e => setEditedTask({ ...editedTask, description: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Дедлайн</label>
                            <input
                                type="datetime-local"
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100"
                                disabled={!isEditing}
                                value={
                                    editedTask.deadline
                                        ? new Date(editedTask.deadline).toISOString().slice(0, 16)
                                        : ''
                                }
                                onChange={e =>
                                    setEditedTask({
                                        ...editedTask,
                                        deadline: new Date(e.target.value).toISOString(),
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Статус</label>
                            <select
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-100"
                                disabled={!isEditing}
                                value={editedTask.completed ? 'done' : 'pending'}
                                onChange={e =>
                                    setEditedTask({ ...editedTask, completed: e.target.value === 'done' })
                                }
                            >
                                <option value="pending">В процессе</option>
                                <option value="done">Завершено</option>
                            </select>
                        </div>

                        <div className="text-sm text-gray-500 italic">
                            ⏳ Оставшееся время: {timeLeft}
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <button
                            className="text-sm text-red-600 hover:text-red-700 font-medium"
                            onClick={handleDelete}
                        >
                            Удалить задачу
                        </button>

                        <div className="flex gap-2">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleSave}
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
                                    >
                                        Сохранить
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="text-sm text-gray-600 hover:underline"
                                    >
                                        Отмена
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-gray-100 hover:bg-gray-200 text-sm font-medium px-4 py-2 rounded-md transition"
                                >
                                    Редактировать
                                </button>
                            )}
                        </div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}