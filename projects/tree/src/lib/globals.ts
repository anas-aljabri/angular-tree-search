import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Node } from './node/node'

@Injectable()
export class Globals {
    originalTree: Node[];
    cloneTree: Node[];
    keyword$: Observable<string>;

    contains(text: string, keyword: string): boolean {
        return keyword.length > 0 && text.toLowerCase().indexOf(keyword) > -1;
    }

    filterTree(tree: Node[], keyword: string): Node[] {
        //  If the entry is empty string return the full tree without filtering and update the matches
        if (keyword.length == 0)
            return tree;

        return tree.filter(function filterCallback(node) {
            //  Check if the keyword is contained in the Title of the root node
            //  If yes, return the entire node
            if (node.Name.toLocaleLowerCase().indexOf(keyword) > -1) {
                node.KeywordMatch = true;

                //  Check for other matches in children, to set the 'IsOpen' and 'KeywordMatch' properties
                if (node.Children) {
                let matchesLookup = (node: Node) => {
                    if (node.Children) {
                        for (let child of node.Children) {
                            if (child.Name.toLocaleLowerCase().indexOf(keyword) > -1) {
                                child.KeywordMatch = true;
                                node.IsOpen = true;
                            }
                            matchesLookup(child);
                        }
                    }
                }

                matchesLookup(node)
                }

                return true;
            }
            //  If the keyword has no matches in the node title, check in chidlren
            else
                if (node.Children) {
                    //  Recursive calls to the filter function to dig down all children, grand children ..etc
                    if ((node.Children = node.Children.filter(filterCallback)).length) {
                        node.IsOpen = true;
                        return true;
                    }
                }
                else {
                    node.KeywordMatch = false;
                }
        });
    }
}
