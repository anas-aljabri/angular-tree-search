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
    this.dataService.getTree('./assets/data.json').subscribe(result => {
      this.tree = result;

      this.addSalesToLowestChildren(this.tree);

      this.tree.forEach(node => {
        this.calcTotals(node);
      });

      console.log(this.tree)

      this.saveFile('data - sales.json', JSON.stringify(this.tree));
    });
  }

  addSalesToLowestChildren(tree: Node[]) {
    RecursiveLoop(tree);

    function RecursiveLoop(currentTree: Node[]) {
      currentTree.forEach(node => {
        if (node.Children) {
          RecursiveLoop(node.Children);
        }
        else
          node['Sales'] = Math.random() * 100000;
      })
    }
  }

  calcTotals(node: Node) {
    if (node.Children) {
      if(node.Children){
        if (node.Children[0]['Sales']) {
          node['Sales'] = node.Children.map(child => {
            return child['Sales'];
          }).reduce((acc, current) => {
              acc + current;
            });

          console.log(node);
        }

        else {
          this.calcTotals(node);
        }
      }
    }

  }

  saveFile(fileName: string, fileBody: string) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,%EF%BB%BF' + encodeURIComponent(fileBody));
    element.setAttribute('download', fileName);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}
