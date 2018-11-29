import { Pipe, PipeTransform } from '@angular/core';
import { Node } from './node/node'
import { Globals } from './globals';

@Pipe({ name: 'filterPipe' })
export class FilterPipe implements PipeTransform {
    constructor(private globals: Globals) {
    }

    transform(tree: Node[], keyword: string): Node[] {

        return JSON.parse(JSON.stringify(tree)).filter(function f(node) {
            // let result = false;

            //  Check if the keyword is contained in the Title of the root node
            //  If yes, return the entire node
            if (node.Title.toLocaleLowerCase().indexOf(keyword) > -1) {
                if (node.nodeComp)
                    node.nodeComp.keywordMatch = true;

                return true;
            }
            else
                if (node.Children) {
                    // console.log((node.Children = node.Children.filter(f)));
                    if ((node.Children = node.Children.filter(f)).length) {
                        return true;
                    }
                    else {
                        node.nodeComp.keywordMatch = false;
                    }
                }
        });
    }
}

// function filter(arr, term) {
//     var matches = [];
//     if (!Array.isArray(arr)) return matches;

//     arr.forEach(function(i) {
//         if (i.value.includes(term)) {
//             matches.push(i);
//         } else {
//             let childResults = filter(i.children, term);
//             if (childResults.length)
//                 matches.push(Object.assign({}, i, { children: childResults }));
//         }
//     })

//     return matches;
// }

// function cloneTree(tree: Node[]): Node[] {
//     return Object.assign({}, tree);
// }