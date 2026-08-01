import { type Note } from '@/types/note';

import { nextServer } from './api';
import { cookies } from 'next/headers';
import { User } from '@/types/user';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  search: string,
  tag: string | undefined
): Promise<NotesResponse> {
  const response = await nextServer.get<NotesResponse>('/notes', {
    headers: {
      Authorization: `Bearer ${token}`,
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

export default async function fetchNoteById(id: Note['id']): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function checkSession() {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
