import { firestore } from '../firebase';
import { CreateNoteParamsType } from '../types/notes';

//ADD DATA TO COLLECTION
export const firestoreCreateNote = (params: CreateNoteParamsType): void => {
  firestore
    .collection('notes')
    .add({
      ...params,
      createdAt: new Date().toLocaleString(),
      updatedAt: null,
    })
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
};

//UPDATE
let washingtonRef = firestore.collection('cities').doc('DC');

// Set the "capital" field of the city 'DC'
// return washingtonRef.update({
//   capital: true
// })
//   .then(function() {
//     console.log("Document successfully updated!");
//   })
//   .catch(function(error) {
//     // The document probably doesn't exist.
//     console.error("Error updating document: ", error);
//   });

//READ DATA
firestore
  .collection('users')
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  });

//DELETE DATA
firestore
  .collection('cities')
  .doc('DC')
  .delete()
  .then(function () {
    console.log('Document successfully deleted!');
  })
  .catch(function (error) {
    console.error('Error removing document: ', error);
  });
