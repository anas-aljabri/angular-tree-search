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

  foundMatches: number;

  @Input('data') data: Node[];

  //  In milliseconds
  //  400 default value
  @Input('debounceTime') debounceTime: number = 400;

  //  start filtering only after n+ charecters
  //  2 default value
  @Input('minCharSearch') minCharSearch: number = 2;

  constructor(private _globals: Globals) {
    this.globals = this._globals;
    this.searchCtrl = new FormControl();
    this.globals.keyword$ = this.searchCtrl.valueChanges;
  }

  ngOnInit() {
    this.globals.originalTree = this.data;
    this.globals.cloneTree = JSON.parse(JSON.stringify(this.globals.originalTree));


    //  Subscribe the filter to the keyword change
    this.globals.keyword$.pipe(debounceTime(this.debounceTime)).subscribe(keywordTxt => {
      if (keywordTxt.length >= this.minCharSearch || keywordTxt.length == 0) {
        this.globals.cloneTree = JSON.parse(JSON.stringify(this.globals.originalTree));

        let filterTreeResult = this.globals.filterTree(this.globals.cloneTree, keywordTxt);

        this.globals.cloneTree = filterTreeResult.Tree;

        this.foundMatches = filterTreeResult.FoundMatches;
      }
    });
  }
}
