import { v4 as uuidv4 } from 'uuid';
import { CategoryType, NoteType } from '../types/main';
import { UpdateNoteFieldsType, CreateNoteParamsType } from '../types/notes';

export function createNote(params: CreateNoteParamsType): NoteType {
  return {
    ...params,
    id: uuidv4(),
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
