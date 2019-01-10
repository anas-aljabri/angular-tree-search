import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Globals } from './globals';
import { Node } from './node/node';
import { Observable } from "rxjs";


@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./styles/tree.component.scss']
})
export class TreeComponent implements OnInit {
  searchCtrl: FormControl;

  originalTree: Node[];
  cloneTree: Node[];
  keyword$: Observable<string>;

  globals: Globals;

  foundMatches: number;

  @Input('data') data: Node[];

  //  In milliseconds
  //  400 default value
  @Input('debounceTime') debounceTime: number = 400;

  //  start filtering only after n+ charecters
  //  2 default value
  @Input('minCharSearch') minCharSearch: number = 2;

  //  search box placehoder
  //  'search' default value
  @Input('placeholder') placeholder: string = 'search..';

  constructor(private _globals: Globals) {
    this.globals = this._globals;
    this.searchCtrl = new FormControl();
    this.keyword$ = this.searchCtrl.valueChanges;
  }

  ngOnInit() {
    this.originalTree = this.data;
    this.cloneTree = JSON.parse(JSON.stringify(this.originalTree));


    //  Subscribe the filter to the keyword change
    this.keyword$.pipe(debounceTime(this.debounceTime)).subscribe(keywordTxt => {
      // Resetting..
      this.cloneTree = JSON.parse(JSON.stringify(this.originalTree));
      this.foundMatches = 0;

      if (keywordTxt.length >= this.minCharSearch) {
        let filterTreeResult = this.globals.filterTree(this.cloneTree, keywordTxt);

        this.cloneTree = filterTreeResult.Tree;

        this.foundMatches = filterTreeResult.FoundMatches;
      }
    });
  }
}
