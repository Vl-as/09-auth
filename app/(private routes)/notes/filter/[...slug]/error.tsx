'use client';

interface ErrorNotesProps {
  error: Error;
}
export default function ErrorNotes({ error }: ErrorNotesProps) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}
