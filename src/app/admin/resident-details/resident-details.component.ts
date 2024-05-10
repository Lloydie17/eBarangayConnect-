import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResidentService, ResidentRecordService } from '@app/_services';
import { ResidentRecord } from '@app/_models';

@Component({ templateUrl: 'resident-details.component.html' })
export class ResidentDetailsComponent {
    resident: any = {};
    id: string;

    constructor(
        private route: ActivatedRoute,
        private residentService: ResidentService
    ) { }

    ngOnInit(): void {
        // Get the resident id from the route parameters
        this.id = this.route.snapshot.params['id'];

        // Call the method to fetch resident details
        this.loadResidentDetails();
    }

    loadResidentDetails(): void {
        this.residentService.getById(this.id).subscribe(
            (resident: any) => {
                this.resident = resident; // Assign the fetched resident data to the local property
            },
            error => {
                console.error('Error fetching resident details:', error);
                // Handle error here (e.g., display error message)
            }
        );
    }
}