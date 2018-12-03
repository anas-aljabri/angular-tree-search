import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Globals } from './globals';
import { Node } from './node/node';


@Component({
  selector: 'tree',
  templateUrl: './tree.component.html'
})
export class TreeComponent implements OnInit {
  searchCtrl: FormControl;

  globals: Globals;

  @Input('data') data: Node[];

  constructor(private _globals: Globals) {
    this.globals = this._globals;
    this.searchCtrl = new FormControl();
    this.globals.keyword$ = this.searchCtrl.valueChanges;
  }

  ngOnInit() {

    this.globals.originalTree = this.data;
    this.globals.cloneTree = JSON.parse(JSON.stringify(this.globals.originalTree));


    //  Subscribe the filter to the keyword change
    this.globals.keyword$.pipe(debounceTime(400)).subscribe(keywordTxt => {
      this.globals.cloneTree = JSON.parse(JSON.stringify(this.globals.originalTree));

      this.globals.cloneTree = this.globals.filterTree(this.globals.cloneTree, keywordTxt);
    });
  }
}
