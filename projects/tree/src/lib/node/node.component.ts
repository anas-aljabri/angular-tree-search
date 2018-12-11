import { Component, Input, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { Node } from './node'

@Component({
    selector: 'tree-node',
    templateUrl: './node.component.html',
    styleUrls: ['./node.component.scss']
})

export class NodeComponent {
    @Input('node') node: Node;
    
    //  Head and body background colors of the node
    @Input('headBGColor') headBGColor: string = 'Transparent';
    @Input('bodyBGColor') bodyBGColor: string = 'Transparent';

    constructor(private globals: Globals) {
    }

    toggle() {
        this.node.IsOpen = !this.node.IsOpen;
    }


}
