import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputComponent } from './input/input.component';
import { CarPlatesListComponent } from './car-plates/car-plates-list/car-plates-list.component';

const routes: Routes = [
  { path: '', component: InputComponent },
  { path: 'list', component: CarPlatesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
