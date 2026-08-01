import { type Note } from '@/types/note';

import { api } from './api';
import { cookies } from 'next/headers';
import { User } from '@/types/user';

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  search: string,
  tag: string | undefined
): Promise<NotesResponse> {
  const cookieStore = await cookies();
  const response = await api.get<NotesResponse>('/notes', {
    headers: {
      Cookie: cookieStore.toString(),
    },
    params: {
      page,
      perPage: 12,
      search,
      tag,
    },
  });

  return response.data;
}

export async function fetchNoteById(id: Note['id']): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function checkSession() {
  const cookieStore = await cookies();
  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await api.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
