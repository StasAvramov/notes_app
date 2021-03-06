import { NoteType } from './main';

export type CreateNoteParamsType = Pick<
  NoteType,
  'userEmail' | 'category' | 'title' | 'description'
>;

export type UpdateNoteFieldsType = Partial<
  Pick<NoteType, 'category' | 'title' | 'description'>
>;

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
