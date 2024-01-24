import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-post',
    pathMatch: 'full',
  },
  {
    path: 'create-post',
    loadComponent: () =>
      import('./pages/create-post/create-post.page').then(
        (m) => m.CreatePostPage
      ),
  },
  {
    path: 'list-post',
    loadComponent: () =>
      import('./pages/list-post/list-post.page').then((m) => m.ListPostPage),
  },
];
