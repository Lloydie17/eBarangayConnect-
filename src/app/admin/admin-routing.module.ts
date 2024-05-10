import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubNavComponent } from './subnav.component';
import { LayoutComponent } from './layout.component';
import { OverviewComponent } from './overview.component';

const accountsModule = () => import('./accounts/accounts.module').then(x => x.AccountsModule);
const residentsModule = () => import('./residents/residents.module').then(x => x.ResidentsModule);
const residentDetailsModule = () => import('./resident-details/resident.module').then(x => x.ResidentDetailsModule);
const tracksModule = () => import('./track-residents/tracks.module').then(x => x.TracksModule);


const routes: Routes = [
    { path: '', component: SubNavComponent, outlet: 'subnav' },
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: OverviewComponent },
            { path: 'accounts', loadChildren: accountsModule },
            { path: 'residents', loadChildren: residentsModule },
            { path: 'resident-details', loadChildren: residentDetailsModule },
            { path: 'track-resident', loadChildren: tracksModule }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }