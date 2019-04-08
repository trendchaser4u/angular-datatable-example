# AngularDatatable

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Column Re-Ordering

Run following npm command

`npm install datatables.net-colreorder --save`
`npm install datatables.net-colreorder-dt --save`

Update _angular.json_ to add the dependencies in the scripts and styles attributes:

```
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              ...
              "node_modules/datatables.net-colreorder-dt/css/colReorder.dataTables.css"
            ],
            "scripts": [
              ...
              "node_modules/datatables.net-colreorder/js/dataTables.colReorder.js"
            ],
            ...
}
```

**HTML**

`<table datatable [dtOptions]="dtOptions" class="row-border hover"></table>`

**Typescript**

```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-colreorder-extension',
  templateUrl: 'colreorder-extension.component.html'
})
export class ColreorderExtensionComponent implements OnInit {
  // Must be declared as "any", not as "DataTables.Settings"
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = {
      ajax: 'data/data.json', //api data
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'firstName',
        data: 'firstName'
      }, {
        title: 'lastName',
        data: 'lastName'
      }],
      // Use this attribute to enable colreorder
      colReorder: true
    };
  }
}

```

## Individual column searching

**HTML**

```
<table datatable [dtOptions]="dtOptions" class="row-border hover">
  <tfoot>
    <tr>
      <th><input type="text" placeholder="Search ID" name="search-id"/></th>
      <th><input type="text" placeholder="Search first name" name="search-first-name"/></th>
      <th><input type="text" placeholder="Search last name" name="search-last-name"/></th>
    </tr>
  </tfoot>
</table>
```

**Typescript**

```
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-individual-column-filtering',
  templateUrl: 'individual-column-filtering.component.html'
})
export class IndividualColumnFilteringComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      ajax: 'data/data.json',
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'First name',
        data: 'firstName'
      }, {
        title: 'Last name',
        data: 'lastName'
      }]
    };
  }

  ngAfterViewInit(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          if (that.search() !== this['value']) {
            that
              .search(this['value'])
              .draw();
          }
        });
      });
    });
  }
}
```

## Row level accordion and complete example with above scenarios

Please do check **app.component.ts**
