import { CategoryType, ErrorType, NoteType, Nullable } from './main';

export type CreateNoteParamsType = {
  userEmail: NoteType['userEmail'];
  title: NoteType['title'];
  description: NoteType['description'];
  category: CategoryType;
};

export type UpdateNoteFieldsType = {
  title?: string;
  category?: CategoryType;
  description?: string;
};

export type NotesReducerArrayStateType = Nullable<NoteType[]>;
export type NotesReducerErrorStateType = Nullable<ErrorType>;

export type DeleteNotePayloadType = {
  id: NoteType['id'];
};

export type EditNoteRequestPayloadType = {
  id: NoteType['id'];
  fieldsToUpdate: UpdateNoteFieldsType;
};
export type EditNoteSuccessPayloadType = {
  note: NoteType;
  idx: number;
};
