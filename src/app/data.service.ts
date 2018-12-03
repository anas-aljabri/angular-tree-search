import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class DataService {
    private http: HttpClient;

    constructor(_http: HttpClient) {
        this.http = _http;
    }

    public getTree(url: string): Observable<Node[]> {
        return this.http.get(url) as Observable<Node[]>;
    }
}