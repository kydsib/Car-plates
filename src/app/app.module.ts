import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { InputComponent } from './input/input.component';

import { CarPlatesListComponent } from './car-plates/car-plates-list/car-plates-list.component';
import { CarPlateItemComponent } from './car-plates/car-plates-list/car-plate-item/car-plate-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InputComponent,
    CarPlatesListComponent,
    CarPlateItemComponent
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
