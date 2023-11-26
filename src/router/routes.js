const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Todo.vue') },
      { path: '/help', name: 'help', component: () => import('pages/Help.vue') }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/NotFound.vue')
  }
];

export default routes;
