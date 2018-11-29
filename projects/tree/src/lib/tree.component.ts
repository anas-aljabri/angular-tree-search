import { Component, OnInit, Input } from '@angular/core';
import { Node } from './node/node';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { Globals } from './globals';
import { DataService } from './data.service';


@Component({
  selector: 'tree-tree',
  templateUrl: './tree.component.html'
})
export class TreeComponent implements OnInit {
  searchCtrl: FormControl;

  globals: Globals;

  @Input('keyword') keyword: string;

  constructor(private _globals: Globals, private dataService: DataService) {
    this.globals = this._globals;
    this.searchCtrl = new FormControl();
    this.globals.keyword$ = this.searchCtrl.valueChanges;
  }

  ngOnInit() {
    this.dataService.getTree('./assets/data.json').subscribe(result => {
      console.log(result)
      this._globals.originalTree = result;
      this._globals.cloneTree = JSON.parse(JSON.stringify(this.globals.originalTree));
    });



    // this.globals.originalTree = generateNodes(10, 100);

    //subscribe the filter to the keyword change
    this.globals.keyword$.pipe(debounceTime(400)).subscribe(keywordTxt => {
      this._globals.cloneTree = JSON.parse(JSON.stringify(this.globals.originalTree));

      this.globals.cloneTree = this.globals.filterTree(this.globals.cloneTree, keywordTxt);
    });
  }
}

var depthGlobal = 3;

function recursive(node: Node) {
  if (depthGlobal != 0) {
    depthGlobal--;

    node.Children = generateNodes(0, 2);

    for (let childNode of node.Children) {
      recursive(childNode);
    }
  }
}

function generateNodes(depth: number, count: number): Node[] {
  let nodes = [];
  let currentNode: Node;

  for (let i = 0; i < count; i++) {
    currentNode = {
      Id: i, Name: generate_random_string(Math.floor(Math.random() * 50)),
      // IsOpen: false, KeywordMatch: false
    }

    recursive(currentNode);

    nodes.push(currentNode);
  }

  return nodes;
}

function generate_random_string(string_length: number): string {
  let random_string = '';
  let random_ascii;
  for (let i = 0; i < string_length; i++) {
    random_ascii = Math.floor((Math.random() * 25) + 97);
    random_string += String.fromCharCode(random_ascii)
  }
  return random_string
}
