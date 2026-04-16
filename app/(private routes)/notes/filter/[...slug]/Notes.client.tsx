"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api/clientApi";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";

import { Note } from "@/types/note";

type NotesResponse = {
  notes: Note[];
  totalPages: number;
};

export default function NotesClient() {
  const params = useParams();

  const slugParam = params?.slug;

  const slug = Array.isArray(slugParam)
    ? slugParam
    : undefined;

  const tag = slug?.[0];

  const [page, setPage] = useState<number>(1);

  const [search, setSearch] =
    useState<string>("");

  const [debouncedSearch, setDebouncedSearch] =
    useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data,
    isLoading,
    isError,
  } = useQuery<NotesResponse>({
    queryKey: [
      "notes",
      page,
      debouncedSearch,
      tag,
    ],

    queryFn: () =>
      fetchNotes({
        page,
        search: debouncedSearch,
        tag,
      }),
  });

  function handleSearchChange(
    value: string
  ): void {
    setSearch(value);
  }

  function handlePageChange(
    newPage: number
  ): void {
    setPage(newPage);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !data) {
    return <p>Error loading notes</p>;
  }

  return (
    <div>
      <h1>Notes</h1>

      <Link href="/notes/action/create">
        Create note
      </Link>

      <SearchBox
        value={search}
        onChange={handleSearchChange}
      />

      <NoteList notes={data.notes} />

      <Pagination
        currentPage={page}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}