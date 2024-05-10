import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { AddCertificateComponent } from './add-certificate.component';
import { ResidentDetailsComponent } from './resident-details.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: ResidentDetailsComponent },
            { path: 'addCertificate', component: AddCertificateComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResidentDetailsRoutingModule { }