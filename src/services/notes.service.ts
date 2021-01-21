import { CategoryType } from '../types/main';

export const capitalize = (s: string): CategoryType => {
  return (s.charAt(0).toUpperCase() + s.slice(1)) as CategoryType;
};
