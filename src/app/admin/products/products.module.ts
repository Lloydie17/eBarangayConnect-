import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProductsRoutingModule
    ],
    /*
    declarations: [
        SubNavComponent,
        LayoutComponent,
        OverviewComponent
    ]*/
})
export class ProductsModule { }