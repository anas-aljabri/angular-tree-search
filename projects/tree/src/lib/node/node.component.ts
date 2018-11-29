import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Globals } from '../globals';
import { Node } from './node'

@Component({
    selector: 'tree-node',
    templateUrl: './node.component.html',
    styleUrls: ['./node.component.scss']
})

export class NodeComponent implements OnInit {
    @Input('node') node: Node;

    //  The search subscription
    searchSub: Subscription;

    // isOpen: boolean;

    constructor(private globals: Globals) {
        // this.node.IsOpen = false;
        // this.node.keywordMatch = false;
    }

    ngOnInit() {
        // this.node.IsOpen = false;
        // this.node.nodeComp = this;

        // The search subscription to expand/collapse
        // Only for nodes with children
        // if (this.node.Children) {
        //     this.searchSub = this.globals.keyword$.subscribe(keyword => {
        //         this.isOpen = this.globals.contains(this.node.Children.map(m => m.Title).join(' ')
        //             , keyword);
        //     }
        //     );
        // }
        // console.log(this.node);console.log(this.isOpen)
    }

    ngOnDestroy(): void {
        // Destory subscriptions
        if (this.searchSub)
            this.searchSub.unsubscribe();
    }

    // isOpen(): boolean {
    //     let childrenText = this.node.Children.map(node => node.Title).reduce(
    //         (previousText, currentText) => {
    //             return previousText + ' ' + currentText;
    //         }
    //     );

    //     return this.toogledOn || childrenText.toLocaleLowerCase().indexOf(this.keyword) > -1;
    // }

    toggle() {
        this.node.IsOpen = !this.node.IsOpen;
    }


}
