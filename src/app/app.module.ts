import { DataService } from './data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TreeModule } from 'projects/tree/src/public_api';
import { DecimalPipe, PercentPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    TreeModule,
  ],
  providers: [DataService, DecimalPipe, PercentPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
