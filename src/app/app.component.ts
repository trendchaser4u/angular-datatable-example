import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  @ViewChild('table', { read: ElementRef }) table: ElementRef;
  dtOptions: any;

  format(d) {
    return (
      '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
      '<tr>' +
      '<td>Full name:</td>' +
      '<td>' +
      d.firstName +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td>Extension number:</td>' +
      '<td>' +
      d.id +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td>Extra info:</td>' +
      '<td>And any further details here (images etc)...</td>' +
      '</tr>' +
      '</table>'
    );
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      ajax: 'https://next.json-generator.com/api/json/get/Ey09USEYI',
      columns: [
        {
          title: '',
          data: null,
          defaultContent: '',
          className: 'details-control',
          orderable: false
        },
        {
          title: 'ID',
          data: 'id'
        },
        {
          title: 'First Name',
          data: 'firstName'
        },
        {
          title: 'Last Name',
          data: 'lastName'
        }
      ],
      colReorder: true
    };
  }

  ngAfterViewInit(): void {
    // Row Level Accordian
    const _that = this;
    $(this.table.nativeElement).on('click', 'td.details-control', function() {
      const tr = $(this).closest('tr');
      $('tr').removeClass('active');
      tr.addClass('active');
      _that.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        const row = dtInstance.row('tr.active', { page: 'current' });
        if (row.child.isShown()) {
          row.child.hide();
          tr.removeClass('shown');
        } else {
          row.child(_that.format(row.data())).show();
          tr.addClass('shown');
        }
      });
    });

    // col level search
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function() {
        const that = this;
        $('input', this.footer()).on('keyup change', function() {
          if (that.search() !== this['value']) {
            that.search(this['value']).draw();
          }
        });
      });
    });
  }
}
