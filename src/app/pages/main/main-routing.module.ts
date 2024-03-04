import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'estudiantes',
        loadChildren: () =>
          import('./estudiantes/estudiantes.module').then(
            (m) => m.EstudiantesPageModule
          ),
      },
      {
        path: 'student-info',
        // path: 'student-info/:id',
        loadChildren: () =>
          import('./student-info/student-info.module').then(
            (m) => m.StudentInfoPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
