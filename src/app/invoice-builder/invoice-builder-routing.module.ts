import { MainContentComponent } from './components/main-content/main-content.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceBuilderComponent } from './invoice-builder.component';

const routes: Routes = [
  {
    path: '',
    component: InvoiceBuilderComponent,
    children: [
      { path: '', component: MainContentComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceBuilderRoutingModule { }
