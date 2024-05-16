import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCertificateComponent } from './add-certificate.component';
import { ResidentDetailsComponent } from './resident-details.component';

const routes: Routes = [
    { path: ':id', component: ResidentDetailsComponent },
    { path: ':id/add', component: AddCertificateComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResidentDetailsRoutingModule { }