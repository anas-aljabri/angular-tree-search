import { NodeComponent } from "./node.component";

export class Node {
    Id: number;
    Name: string;
    Children?: Node[];
    Code?: string;
    KeywordMatch?: boolean = false;
    IsOpen?: boolean = false;
}

export class Field {
    Name: string;
    Width: string;
}