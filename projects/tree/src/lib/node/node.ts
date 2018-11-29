import { NodeComponent } from "./node.component";

export class Node {
    Id: number;
    Name: string;
    IsOpen?: boolean = false;
    ParentId?: number;
    Children?: Node[];
    Code?: string;
    KeywordMatch?: boolean = false;
    // ChildKeywordMatch?: boolean;
}