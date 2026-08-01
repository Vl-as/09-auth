import { type Note } from '@/types/note';

import { nextServer } from './api';
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

export interface NewNoteData {
  title: Note['title'];
  content: Note['content'];
  tag: Note['tag'];
}

export async function createNote(newNote: NewNoteData): Promise<Note> {
  const { data } = await nextServer.post<Note>('/notes', newNote, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function deleteNote(id: Note['id']): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export default async function fetchNoteById(id: Note['id']): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export async function register(data: RegisterRequest) {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const { data } = await nextServer.get<CheckSessionRequest>('/auth/session');
  return data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export type UpdateUserRequest = {
  username?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};
