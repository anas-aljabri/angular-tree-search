import { Node } from 'projects/tree/src/lib/node/node';
import { DataService } from './data.service';
import { Component, OnInit } from '@angular/core';
import { DecimalPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'angular-tree-search';
  basicTree: Node[];
  tree: Node[];

  constructor(private dataService: DataService, private decimalPipe: DecimalPipe
    , private percentPipe: PercentPipe) {
  }

  ngOnInit() {
    this.dataService.getTree('./assets/data.json').subscribe(result => {

      this.basicTree = JSON.parse(JSON.stringify(result));
      this.tree = JSON.parse(JSON.stringify(result));


      this.addSalesFieldToLowestLevelChildren(this.tree);

      this.calcAccumulatedTotals(this.tree);

      let grandToal = this.calcGrandTotal(this.tree);

      this.addPercentField(this.tree, grandToal);

      this.formatFields(this.tree);

      // this.saveFile('data - sales.json', JSON.stringify(this.tree));
    });
  }

  addSalesFieldToLowestLevelChildren(tree: Node[]) {
    RecursiveLoop(tree);

    function RecursiveLoop(currentTree: Node[]) {
      currentTree.forEach(node => {
        if (node.Children) {
          RecursiveLoop(node.Children);
        }
        else
          node['Fields'] = [Math.round(Math.random() * 100000)]
      })
    }
  }

  calcAccumulatedTotals(tree: Node[]) {
    tree.forEach(node => {
      if (node.Children) {

        //  To check that all children have the sales field
        let allChildrenHaveSales = true;

        node.Children.forEach(child => {
          if (!child['Fields']) {
            allChildrenHaveSales = false;
          }
        });

        if (!allChildrenHaveSales) {
          this.calcAccumulatedTotals(node.Children);
        }

        let salesValue = node.Children.map(child => {
          return child['Fields'][0]
        }).reduce((current, acc) => {
          return current + acc;
        });

        node['Fields'] = [salesValue]
      }
    }
    )
  }

  calcGrandTotal(tree: Node[]): number {
    let grandTotal = 0;

    tree.forEach(node => {
      grandTotal += node['Fields'][0];
      });

    // Recursive(tree);

    // function Recursive(currentTree: Node[]) {
    //   currentTree.forEach(node => {
    //     if (node.Children) {
    //       Recursive(node.Children);
    //     }

    //     grandTotal += node['Fields'][0];
    //   })
    // }

    return grandTotal;
  }

  addPercentField(currentTree: Node[], grandTotal: number) {
    currentTree.forEach(node => {
      if (node.Children) {
        this.addPercentField(node.Children, grandTotal);
      }

      node['Fields'].push(node['Fields'][0] / grandTotal);
    });
  }

  formatFields(currentTree: Node[]) {
    currentTree.forEach(node => {
      if (node.Children) {
        this.formatFields(node.Children);
      }

      node['Fields'][0] = this.decimalPipe.transform(node['Fields'][0]);
      node['Fields'][1] = this.percentPipe.transform(node['Fields'][1], '1.2');
    });
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
