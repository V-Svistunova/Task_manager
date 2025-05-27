'use client'

import React from 'react'
import Link from 'next/link'
import { useTaskLists } from '@/hooks/useTaskLists'
import { LogoutButton } from '@/components/LogoutButton'

export default function TaskListsPage() {
    const {
        lists,
        title,
        setTitle,
        addList,
        deleteList,
        editingId,
        editedTitle,
        setEditedTitle,
        startEditing,
        cancelEditing,
        saveEditing,
    } = useTaskLists()

    return (
        <main className="max-w-4xl mx-auto p-6 min-h-screen bg-neutral-50 text-neutral-900 font-sans">
            <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-neutral-800 tracking-tight">Списки задач</h1>
                <LogoutButton />
            </header>

            <section className="mb-6 flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Название нового списка"
                    className="flex-grow px-4 py-2 border-2 border-blue-600 rounded-md text-lg
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
                     transition duration-150"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') addList()
                    }}
                    aria-label="Название нового списка задач"
                />
                <button
                    onClick={addList}
                    className="px-6 py-2 bg-green-600 text-white font-medium rounded-md
                     hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    aria-label="Добавить новый список задач"
                >
                    Добавить
                </button>
            </section>

            {lists.length === 0 ? (
                <p className="text-neutral-500 text-lg">Списки задач отсутствуют.</p>
            ) : (
                <ul className="space-y-4">
                    {lists.map(list => (
                        <li
                            key={list.id}
                            className="bg-white border border-neutral-200 rounded-lg shadow-sm hover:shadow-md
                         px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between transition"
                        >
                            {editingId === list.id ? (
                                <div className="flex flex-col sm:flex-row sm:items-center w-full gap-4">
                                    <input
                                        type="text"
                                        className="border-b-2 border-blue-500 bg-transparent focus:outline-none w-full sm:w-64 text-lg"
                                        value={editedTitle}
                                        onChange={e => setEditedTitle(e.target.value)}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter') saveEditing()
                                            if (e.key === 'Escape') cancelEditing()
                                        }}
                                        autoFocus
                                        aria-label={`Редактировать название списка ${list.title}`}
                                    />
                                    <div className="flex gap-2 ml-auto">
                                        <button
                                            onClick={saveEditing}
                                            className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
                                            aria-label="Сохранить название списка"
                                        >
                                            Сохранить
                                        </button>
                                        <button
                                            onClick={cancelEditing}
                                            className="text-neutral-600 hover:underline"
                                            aria-label="Отмена редактирования названия списка"
                                        >
                                            Отмена
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col sm:flex-row sm:items-center w-full justify-between gap-2">
                                    <Link
                                        href={`/${list.id}`}
                                        className="text-lg font-medium text-blue-800 hover:underline"
                                        aria-label={`Перейти к задачам списка ${list.title}`}
                                    >
                                        {list.title} ({list.tasks.length} задач)
                                    </Link>
                                    <div className="flex gap-3 mt-2 sm:mt-0 sm:ml-auto">
                                        <button
                                            onClick={() => startEditing(list.id, list.title)}
                                            className="text-blue-600 hover:underline text-sm"
                                            aria-label={`Редактировать список ${list.title}`}
                                        >
                                            Редактировать
                                        </button>
                                        <button
                                            onClick={() => deleteList(list.id)}
                                            className="text-red-600 hover:underline text-sm"
                                            aria-label={`Удалить список ${list.title}`}
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}