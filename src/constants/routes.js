export const ROUTES = {
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
