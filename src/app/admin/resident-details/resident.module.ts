import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ResidentDetailsRoutingModule } from './resident-routing.module';
import { LayoutComponent } from './layout.component';
import { ResidentDetailsComponent } from './resident-details.component';
import { AddCertificateComponent } from './add-certificate.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ResidentDetailsRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ResidentDetailsComponent,
        AddCertificateComponent
    ]
})
export class ResidentDetailsModule { }