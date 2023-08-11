import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',  
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login-component/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register-component/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'character-list',
    loadChildren: () =>
      import('./components/pages/characters/character-list/character-list.module').then(
        m => m.CharacterListModule
      )
  },
  {
    path: 'character-details/:id',
    loadChildren: () =>
      import('./components/pages/characters/character-details/character-details.module').then(
        m => m.CharacterDetailsModule
      )
  },
  {
    path: '**',
    redirectTo: '/login', 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
