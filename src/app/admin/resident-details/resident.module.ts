import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ResidentDetailsRoutingModule } from './resident-routing.module';
import { ResidentDetailsComponent } from './resident-details.component';
import { AddCertificateComponent } from './add-certificate.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ResidentDetailsRoutingModule
    ],
    declarations: [
        ResidentDetailsComponent,
        AddCertificateComponent
    ]
})
export class ResidentDetailsModule { }