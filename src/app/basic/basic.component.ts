import { Component, OnInit } from '@angular/core';
import { Node } from 'projects/tree/src/lib/node/node';
import { DataService } from '../data.service';

@Component({
  selector: 'basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  tree: Node[];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    //  Get the data from data.json
    this.dataService.getTree('./assets/data.json').subscribe(result => {
      this.tree = JSON.parse(JSON.stringify(result));
    });
  }
}
