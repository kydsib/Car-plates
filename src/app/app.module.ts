import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatPaginatorModule } from '@angular/material/paginator';

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
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
