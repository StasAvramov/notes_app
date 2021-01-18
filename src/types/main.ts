export type Nullable<T> = T | null;

export type CategoryType = 'Home' | 'Work' | 'Vacation' | 'Hobbie' | '';

export type NoteType = {
  id: string;
  title: string;
  userEmail: string;
  category: CategoryType;
  description: string;
  createdAt: Readonly<string>;
  updatedAt: Nullable<string>;
};

export type NoteOnCreateType = Omit<NoteType, 'id'>;
