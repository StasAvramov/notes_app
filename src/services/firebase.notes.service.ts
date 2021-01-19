import { db } from '../firebase';
import { NoteType } from '../types/main';
import { CreateNoteParamsType, UpdateNoteFieldsType } from '../types/notes';
import { eventChannel } from 'redux-saga';

//NOTES CHANNEL/ LIVE UPDATE NOTES
export const createNotesChannel = (userEmail: NoteType['userEmail']) => {
  return eventChannel(emit => {
    db.collection('notes')
      .where('userEmail', '==', userEmail)
      .onSnapshot(
        querySnapshot => {
          const notes: NoteType[] = [];

          querySnapshot.forEach((doc: any) => {
            notes.push({ id: doc.id, ...doc.data() });
          });

          emit(notes);
        },
        () => emit(false),
      );

    return () => {};
  });
};

//ADD NOTE
export const firestoreCreateNote = async (params: CreateNoteParamsType) => {
  return await db.collection('notes').add({
    ...params,
    createdAt: new Date().toLocaleString(),
    updatedAt: null,
  });
};

//EDIT NOTE
export const firestoreEditNote = async (
  noteId: NoteType['id'],
  fieldsToUpdate: UpdateNoteFieldsType,
) => {
  const newFieldsToUpdate = {
    ...fieldsToUpdate,
    updatedAt: new Date().toLocaleString(),
  };
  return await db.collection('notes').doc(noteId).update(newFieldsToUpdate);
};

//DELETE NOTE
export const firestoreDeleteNote = async (noteId: NoteType['id']) => {
  return await db.collection('notes').doc(noteId).delete();
};
