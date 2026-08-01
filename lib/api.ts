import axios from 'axios';
import { type Note } from '../types/note';

const API = 'https://notehub-public.goit.study/api/notes';
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
  const response = await axios.get<NotesResponse>(API, {
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
  const { data } = await axios.post<Note>(API, newNote, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function deleteNote(id: Note['id']): Promise<Note> {
  const { data } = await axios.delete<Note>(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export default async function fetchNoteById(id: Note['id']): Promise<Note> {
  const { data } = await axios.get<Note>(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}
