import { Task, TaskList } from '@/app/lib/types'

export type ApiResponse<T> = {
  data?: T
  error?: string
}

export type ListApiResponse = ApiResponse<TaskList | TaskList[]>
export type TaskApiResponse = ApiResponse<Task | Task[]>