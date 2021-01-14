import { CategoryType, NoteType } from './main';

export type UseParamsIdType = {
  id: string;
};

export type UseParamsCategoryType = {
  category: CategoryType;
};

export type FormikValuesType = Pick<
  NoteType,
  'category' | 'title' | 'description'
>;

export type FormikCategoryInitialValueType = NoteType['category'];
