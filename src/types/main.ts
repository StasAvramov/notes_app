export type Nullable<T> = T | null;

export type CategoryType = 'Home' | 'Work' | 'Vacation' | 'Hobbie';

export type ErrorType = {
  message: string;
};

export type NoteType = {
  id: string;
  title: string;
  userEmail: string;
  category: CategoryType;
  description: string;
  createdAt: string;
  updatedAt: Nullable<string>;
};

export enum NoteActions {
  CREATE_NOTE_REQUEST = 'NOTES/CREATE_NOTE_REQUEST',
}
