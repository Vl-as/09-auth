'use client';

interface ErrorNoteProps {
  error: Error;
}
export default function ErrorNote({ error }: ErrorNoteProps) {
  return <p>Could not fetch note details. {error.message}</p>;
}
