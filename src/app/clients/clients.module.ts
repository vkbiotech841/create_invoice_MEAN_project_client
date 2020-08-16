
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './../shared/material.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListingComponent } from './components/client-listing/client-listing.component';
import { ClientService } from './services/client.service';

@NgModule({
  declarations: [ClientListingComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
  ],
  exports: [ClientListingComponent],
  providers: [ClientService]
})
export class ClientsModule { }
