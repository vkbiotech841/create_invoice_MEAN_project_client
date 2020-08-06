

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Invoice, InvoicePaginationRsp } from './../../models/invoice';
import { InvoiceService } from './../../services/invoice.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { remove } from 'lodash';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';








@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit, AfterViewInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns: string[] = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  dataSource: Invoice[] = [];
  resultsLength = 0;
  isResultsLoading = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    this.populateInvoices();
    this.invoiceListPagination();
    this.invoiceSorting();
  }




  openSnackBar(message: string, action: string, seconds: number) {
    this.snackBar.open(message, action,
      {
        duration: seconds,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
  };

  errorSnackBar(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', { duration: 2000 });
  };

  saveBtnHandler() {
    this.router.navigate(['dashboard', 'invoices', 'new']);
  };

  editBtnHandler(id) {
    this.router.navigate(['dashboard', 'invoices', id]);
  };


  populateInvoices() {
    this.isResultsLoading = true;
    this.invoiceService.getInvoices({
      page: this.paginator.pageIndex,
      perPage: this.paginator.pageSize,
      sortField: this.sort.active,
      sortDirection: this.sort.direction
    })
      .subscribe(data => {
        this.dataSource = data.docs;
        this.resultsLength = data.total;
        console.log(data);
        this.isResultsLoading = false;
      }, err => {
        this.isResultsLoading = false;
        this.errorSnackBar(err, 'Failed to get invoice data');
        console.error(err);
      })
  };


  deleteBtnHnadler(id) {
    console.log(id)
    this.invoiceService.deleteInvoice(id).subscribe(data => {
      const removedItems = remove(this.dataSource, (item) => {
        return item._id === data._id
      })
      this.dataSource = [...this.dataSource];
      this.openSnackBar('Invoice deleted', 'Success', 2000)
      console.log(data);
    }, err => {
      this.errorSnackBar(err, 'Failed to delete invoice')
      console.error(err);
    })
  };

  // Pagination
  invoiceListPagination() {
    this.paginator.page.subscribe(() => {
      this.isResultsLoading = true;
      this.invoiceService.getInvoices({
        page: this.paginator.pageIndex,
        perPage: this.paginator.pageSize,
        sortField: this.sort.active,
        sortDirection: this.sort.direction
      }).subscribe(data => {
        console.log('pagination data', data)
        this.dataSource = data.docs;
        this.resultsLength = data.total;
        this.isResultsLoading = false;
      })
    }, err => {
      this.isResultsLoading = false;
      this.errorSnackBar(err, 'Failed to get invoice data');
      console.error(err);
    });
  };

  // Sorting
  invoiceSorting() {
    this.sort.sortChange.subscribe(() => {
      this.isResultsLoading = true;
      this.paginator.pageIndex = 0;
      this.invoiceService.getInvoices({
        page: this.paginator.pageIndex,
        perPage: this.paginator.pageSize,
        sortField: this.sort.active,
        sortDirection: this.sort.direction
      })
        .subscribe(data => {
          console.log('sorted data', data);
          this.dataSource = data.docs;
          this.resultsLength = data.total;
          this.isResultsLoading = false;
        }, err => {
          this.isResultsLoading = false;
          this.errorSnackBar(err, 'Failed to get invoice data');
          console.error(err);
        })
    });
  }

}
