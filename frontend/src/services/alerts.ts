import api from './api'
import { Alert } from '../types/alert'

export const getAlerts = async (): Promise<Alert[]> => {
  const response = await api.get('/alerts')
  return response.data
}

export const createAlert = async (data: FormData): Promise<Alert> => {
  data.append('userId', process.env.NEXT_PUBLIC_LOGGED_IN_USER_ID as string) // Always is using default user based on .env variable
  const response = await api.post('/alerts', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const getAlertById = async (id: number): Promise<Alert> => {
  const response = await api.get(`/alerts/${id}`)
  console.log(response.data)
  return response.data
}

export const deleteAlert = async (id: number): Promise<void> => {
  await api.delete(`/alerts/${id}`)
}
