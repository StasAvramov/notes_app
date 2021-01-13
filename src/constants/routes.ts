type DynamicRoutesFunc = (param: string | number) => string;

type DynamicRoutes = {
  edit: DynamicRoutesFunc;
  category: DynamicRoutesFunc;
  details: DynamicRoutesFunc;
};

type AppRoutes = {
  login: string;
  home: string;
  category: string;
  details: string;
  add: string;
  edit: string;
  dynamic: DynamicRoutes;
};

export const ROUTES: AppRoutes = {
  login: '/login',
  home: '/notes',
  category: '/notes/:category',
  details: '/note/:id',
  add: '/note/add',
  edit: '/note/edit/:id',
  dynamic: {
    edit: id => `/note/edit/${id}`,
    category: category => `/notes/${category}`,
    details: id => `/note/${id}`,
  },
};
