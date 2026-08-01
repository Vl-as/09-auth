'use client';

import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';
import fetchNoteById from '@/lib/api';
import { Note } from '@/types/note';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function NotePreviewClient() {
  const router = useRouter();
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

  const close = () => {
    router.back();
  };

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <div className={css.item}>
          <button type="button" className={css.button} onClick={close}>
            Back
          </button>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
}
