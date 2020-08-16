import { ClientService } from '../../services/client.service';

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../../models/client';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-client-listing',
  templateUrl: './client-listing.component.html',
  styleUrls: ['./client-listing.component.scss']
})
export class ClientListingComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  dataSource = new MatTableDataSource<Client>();

  constructor(
    private clientService: ClientService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllClients();
  }


  getAllClients() {
    this.clientService.getClients().subscribe(data => {
      this.dataSource.data = data;
      console.log("getAllClients", data)
    })
  };



}



