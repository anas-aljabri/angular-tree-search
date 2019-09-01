# angular-tree-search

An easy to use angular component to show tree structured data with powerful search/filter facility. 

### Installing

Simple!

```
$ npm install --save angular-tree-search
```
### Demo

https://anas-aljabri.github.io/angular-tree-search/

### Get Started!

In your .html file

```
<tree [data]="data" *ngIf="tree"></tree>
```

In your .ts file

```
export class AppComponent {
  data: Node[]; 

  constructor() {
      this.data =  [{
        "Id": "104268",
        "Name": "Fresh",
        "Fields": [
            {
                "Name": "50",
                "Width": "50%"
            }
        ],
        "Children": [
            {
                "Id": "113925",
                "Name": "Vegetables",
                "Children": [
                    {
                        "Id": "113955",
                        "Name": "Potatoes"
                    },
                    {
                        "Id": "113964",
                        "Name": "Onions, Leeks & Garlic"
                    }
                ]
            }]}]
  }
}
```

### Dependencies
 * Bootstrap <code>V4</code>

### Prerequisites

For IE please refer to angular polyfills.

### License

MIT
