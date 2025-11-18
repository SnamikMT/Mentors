// repositories/mentors.ts
import { useApi } from './http'
import type { MentorShort, MentorDetails } from '@/types/mentors';

export type MentorDto = {
  id: number
  name: string
  avatar: string
  price: number
  tags: string[]
  // ... что бэк отдаст
}

export async function fetchSuitableMentors(payload: {
  chips?: string[]
  companies?: string[]
  awards?: string[]
}) {
  const api = useApi()
  // бэку потом скажем: вот сюда шлём все фильтры
  return api.post<MentorDto[]>('/mentors/suitable', payload)
}

export async function fetchMentorById(id: number) {
  const api = useApi()
  return api.get<MentorDto>(`/mentors/${id}`)
}

export function useMentorsRepository() {
  const api = useApiClient();

  function list(params?: { suitable?: boolean }): Promise<MentorShort[]> {
    const qs = params?.suitable ? '?suitable=1' : '';
    return api.get<MentorShort[]>(`/mentors${qs}`);
  }

  function details(id: number): Promise<MentorDetails> {
    return api.get<MentorDetails>(`/mentors/${id}`);
  }

  return { list, details };
}