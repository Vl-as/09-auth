'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '@/components/NoteList/NoteList';
import css from './NotesPage.module.css';
import { fetchNotes } from '@/lib/api/clientApi';
import { useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';

interface NotesProps {
  tag: string | undefined;
}

export default function Notes({ tag }: NotesProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', search, page, tag],
    queryFn: () => fetchNotes(page, search, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const debounceSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={debounceSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data?.totalPages}
            page={page}
            onPageChange={setPage}
          />
        )}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
