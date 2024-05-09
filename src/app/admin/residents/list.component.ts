import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ResidentService } from '@app/_services';
import { Resident } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    residents: any[];

    constructor(private residentService: ResidentService) {}

    ngOnInit() {
        this.residentService.getAll()
            .pipe(first())
            .subscribe(residents => this.residents = residents);
    }
    
    deleteResident(id: string) {
        const resident = this.residents.find(x => x.id === id);
        resident.isDeleting = true;
        this.residentService.deleteResident(id)
            .pipe(first())
            .subscribe(() => {
                this.residents = this.residents.filter(x => x.id !== id) 
            });
    }

}