import { NodeComponent } from "./node.component";

export class Node {
    Id: number;
    Name: string;
    Children?: Node[];
    Code?: string;
    KeywordMatch?: boolean = false;
    IsOpen?: boolean = false;
    Fields?: any[];
}