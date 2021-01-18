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

    return () => {}; //Unsubscribe ???
  });
};

//ADD DATA TO COLLECTION
export const firestoreCreateNote = async (params: CreateNoteParamsType) => {
  const newNoteRef = await db.collection('notes').add({
    ...params, //title, description, category, userEmail
    createdAt: new Date().toLocaleString(),
    updatedAt: null,
  });
  // .then((docRef) => {
  //   console.log('Document written with ID: ', docRef.id);
  //   return docRef;
  // })
  const newNote = await newNoteRef.get();
  const newNoteData = await newNote.data();

  return newNoteData;
};

//UPDATE

export const firestoreEditNote = async (
  noteId: NoteType['id'],
  fieldsToUpdate: UpdateNoteFieldsType,
) => {
  const noteRef = await db.collection('notes').doc(noteId);
  // const newNote = await noteRef.get();
  // const newNoteData = await newNote.data();

  // console.log(newNoteData);
  return noteRef.update(fieldsToUpdate);
  // .then(function() {
  //   console.log("Document successfully updated!");
  // })
  // .catch((error) => {
  //   // The document probably doesn't exist.
  //   console.error("Error updating document: ", error);
  // });
};

//DELETE DATA
export const firestoreDeleteNote = async (noteId: NoteType['id']) => {
  const noteRef = await db.collection('notes').doc(noteId);
  return noteRef.delete();
  // .then(function () {
  //   console.log('Document successfully deleted!');
  // })
  // .catch(function (error) {
  //   console.error('Error removing document: ', error);
  // });
};
