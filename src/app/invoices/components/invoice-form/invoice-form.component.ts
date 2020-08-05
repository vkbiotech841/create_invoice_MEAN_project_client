import { Invoice } from './../../models/invoice';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})


export class InvoiceFormComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  invoiceForm: FormGroup;
  item: FormControl;
  date: FormControl;
  due: FormControl;
  qty: FormControl;
  rate: FormControl;
  tax: FormControl;

  private invoice: Invoice;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createForm();
    this.setInvoiceToForm();
  }

  openSnackBar(message: string, action: string, seconds: number) {
    this.snackBar.open(message, action,
      {
        duration: seconds,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ["blue-text"]
      })
  };

  errorSnackBar(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', { duration: 2000 });
  };


  createForm() {
    this.invoiceForm = this.fb.group({
      item: ['', Validators.required],
      date: ['', Validators.required],
      due: ['', Validators.required],
      qty: ['', Validators.required],
      rate: '',
      tax: ''
    })
  };


  onSubmit() {
    console.log(this.invoiceForm.value);
    // debugger;
    if (this.invoice) {
      this.updateInvoice();
    } else {
      this.createInvoice();
    }
  };

  createInvoice() {
    // Condidtion: When user just want to save the invoice.
    this.invoiceService.createInvoice(this.invoiceForm.value).subscribe(data => {
      this.invoiceForm.reset();
      this.openSnackBar('Invoice created', 'Success', 2000);
      this.router.navigate(['dashboard', 'invoices']);
      console.log(data)
    }, err => {
      this.errorSnackBar(err, 'Failed to create Invoice');
      console.error(err);
    })
  };

  updateInvoice() {
    // Condition: When user wants to edit the invoice.
    this.invoiceService.updateInvoice(this.invoice._id, this.invoiceForm.value).subscribe(data => {
      this.openSnackBar('Invoice updated', 'Success', 2000);
      this.router.navigate(['dashboard', 'invoices']);
    }, err => {
      this.errorSnackBar(err, 'Failed to update Invoice');
      console.error(err);
    })
  };

  setInvoiceToForm() {
    // get the id of the invoice
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (!id) {
        return;
      } else {
        this.invoiceService.getInvoice(id).subscribe(invoice => {
          // debugger;
          this.invoice = invoice;
          this.invoiceForm.patchValue(this.invoice);
        }, err => {
          this.errorSnackBar(err, 'Failed to get Invoice');
          console.error(err);
        })
      }
    })
  };

}
