import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 // {path:'error',component:AuthorisationErrorComponent},
    {path:'',redirectTo:'/eduxy/login',pathMatch:'full'},
   
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
