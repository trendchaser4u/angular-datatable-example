import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DataTablesModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
