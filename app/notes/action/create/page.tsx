import NoteForm from '@/components/NoteForm/NoteForm';
import css from './NoteForm.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create new Note',
  description: 'Page for creating new Note',
  openGraph: {
    title: 'NoteHub',
    description:
      'NoteHub is a simple and efficient application designed for managing personal notes. It helps keep your thoughts organized and accessible in one place, whether you are at home or on the go.',
    url: `https://08-zustand-pi-ten.vercel.app/notes/action/create`,
    images: [
      {
        url: `https://ac.goit.global/fullstack/react/notehub-og-meta.jpg`,
        alt: 'NoteHub',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
