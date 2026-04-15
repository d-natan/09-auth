'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '@/lib/api/notes';
import { useNoteStore } from '@/lib/store/noteStore';

import css from './NoteForm.module.css';

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });

      clearDraft();
      router.back();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setDraft({
      [name]: value,
    });
  };

  const handleSubmit = async (formData: FormData) => {
    mutation.mutate({
      title: String(formData.get('title')),
      content: String(formData.get('content')),
      tag: String(formData.get('tag')),
    });
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <input
        name="title"
        value={draft.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <textarea
        name="content"
        value={draft.content}
        onChange={handleChange}
        placeholder="Content"
      />

      <select
        name="tag"
        value={draft.tag}
        onChange={handleChange}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>

      <div className={css.actions}>
        <button type="submit">
          Create
        </button>

        <button
          type="button"
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}