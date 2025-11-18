// repositories/booking.ts
import { useApi } from './http'

export async function bookMentorSlot(payload: {
  mentorId: number
  date: string
  time: string
}) {
  const api = useApi()
  return api.post<{ success: boolean; bookingId: string }>('/mentors/book', payload)
}
