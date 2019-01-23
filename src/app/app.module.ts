import { DataService } from './data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TreeModule } from 'projects/tree/src/public_api';
import { DecimalPipe, PercentPipe } from '@angular/common';
import { BasicComponent } from './basic/basic.component';
import { WithFieldsComponent } from './with-fields/with-fields.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    WithFieldsComponent,
  ],
  imports: [
    BrowserModule,
    TreeModule,
  ],
  providers: [DataService, DecimalPipe, PercentPipe],
  bootstrap: [BasicComponent, WithFieldsComponent]
})
export class AppModule { }
