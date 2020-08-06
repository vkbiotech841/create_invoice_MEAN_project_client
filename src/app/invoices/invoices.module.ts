import { InvoiceService } from './services/invoice.service';
import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { InvoiceListingComponent } from './components/invoice-listing/invoice-listing.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';


@NgModule({
  declarations: [InvoiceListingComponent, InvoiceFormComponent,],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,


  ],
  exports: [InvoiceListingComponent, InvoiceFormComponent],
  providers: [InvoiceService]
})
export class InvoicesModule { }
