import { NgModule } from '@angular/core';
import { TreeComponent } from './tree.component';
import { NodeComponent } from './node/node.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Globals } from './globals';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [TreeComponent, NodeComponent],
  providers: [Globals, DataService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [TreeComponent]
})
export class TreeModule { }
