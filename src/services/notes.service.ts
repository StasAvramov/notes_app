import { CategoryType, NoteOnCreateType, NoteType } from '../types/main';
import { UpdateNoteFieldsType, CreateNoteParamsType } from '../types/notes';

export function createNote(params: CreateNoteParamsType): NoteOnCreateType {
  return {
    ...params, //title, description, category, userEmail
    createdAt: new Date().toLocaleString(),
    updatedAt: null,
  };
}

export function getNoteToUpdateIndex(allNotes: NoteType[], id: string) {
  const noteToEdit = allNotes.find(note => note.id === id);

  return noteToEdit ? allNotes.indexOf(noteToEdit) : 1;
}

export function updateNote(
  allNotes: NoteType[],
  noteToUpdateIndex: number,
  fieldsToUpdate: UpdateNoteFieldsType,
) {
  allNotes[noteToUpdateIndex] = {
    ...allNotes[noteToUpdateIndex],
    ...fieldsToUpdate,
    updatedAt: new Date().toLocaleString(),
  };
}

export const capitalize = (s: string): CategoryType => {
  return (s.charAt(0).toUpperCase() + s.slice(1)) as CategoryType;
};
