import { Node } from 'projects/tree/src/lib/node/node';
import { DataService } from './data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'angular-tree-search';
  tree: Node[]; 

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getTree('./assets/data.json').subscribe(result =>
      this.tree = result);
  }
}
