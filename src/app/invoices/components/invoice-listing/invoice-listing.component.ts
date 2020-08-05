import { Invoice } from './../../models/invoice';
import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { remove } from 'lodash';



@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns: string[] = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  dataSource: Invoice[] = [];



  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getAllInvoices();

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


  getAllInvoices() {
    this.invoiceService.getInvoices().subscribe(data => {
      this.dataSource = data;
      console.log(data);
    }, err => {
      this.errorSnackBar(err, 'Failed to get invoice data')
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


}
