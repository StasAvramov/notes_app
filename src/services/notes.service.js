import { v4 as uuidv4 } from 'uuid';

export function createNote(params) {
  return {
    ...params,
    id: uuidv4(),
    createdAt: new Date().toLocaleString(),
    updatedAt: '',
  };
}

export function getNoteToUpdateIndex(allNotes, id) {
  const noteToEdit = allNotes.find(note => note.id === id);

  return allNotes.indexOf(noteToEdit);
}

export function updateNote(allNotes, noteToUpdateIndex, fieldsToUpdate) {
  allNotes[noteToUpdateIndex] = {
    ...allNotes[noteToUpdateIndex],
    ...fieldsToUpdate,
    updatedAt: new Date().toLocaleString(),
  };
}
