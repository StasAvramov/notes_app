import { NoteType } from './main';

export type UserPayloadType = {
  email: NoteType['userEmail'];
  password: string;
};

export type UserLoginSuccessPayloadType = {
  email: NoteType['userEmail'];
  id: string;
};
