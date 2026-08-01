'use client';

import css from './NoteDetails.module.css';
import fetchNoteById from '@/lib/api';
import { Note } from '@/types/note';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: Note['id'] }>();

  const {
    data: note,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </main>
  );
}
