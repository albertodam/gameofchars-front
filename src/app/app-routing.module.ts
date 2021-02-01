import { GithubComponent } from './base/github/github.component';
import { MaincontentModule } from './maincontent/maincontent.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';


const routes: Routes = [
  {
    path: 'github',
    component: GithubComponent
  },
  {
    path: '',
    loadChildren: () => import('./maincontent/maincontent.module').then(m => m.MaincontentModule)
  }
];

const config: ExtraOptions = {
 // useHash: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
