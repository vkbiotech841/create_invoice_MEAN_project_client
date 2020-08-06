import { Invoice, InvoicePaginationRsp } from './../models/invoice';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getInvoices({ page, perPage, sortField, sortDirection, filter }): Observable<InvoicePaginationRsp> {
    let queryString = `${BASE_URL}/invoices?page=${page + 1}&perPage=${perPage}`
    if (sortField && sortDirection) {
      queryString = `${queryString}&sortField=${sortField}&sortDirection=${sortDirection}`;
    };
    if (filter) {
      queryString = `${queryString}&filter=${filter}`
    }
    return this.httpClient.get<InvoicePaginationRsp>(queryString);
  };

  createInvoice(body: Invoice): Observable<Invoice> {
    return this.httpClient.post<Invoice>(`${BASE_URL}/invoices`, body)
  };

  deleteInvoice(id: string): Observable<Invoice> {
    return this.httpClient.delete<Invoice>(`${BASE_URL}/invoices/${id}`)
  };

  getInvoice(id: string): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${BASE_URL}/invoices/${id}`)
  };

  updateInvoice(id: string, body: Invoice): Observable<Invoice> {
    return this.httpClient.put<Invoice>(`${BASE_URL}/invoices/${id}`, body);
  };



}
