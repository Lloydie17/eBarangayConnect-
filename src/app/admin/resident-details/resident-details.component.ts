import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResidentService, ResidentRecordService } from '@app/_services';

@Component({ templateUrl: 'resident-details.component.html' })
export class ResidentDetailsComponent implements OnInit {
    resident: any = {};
    id: string;
    record: any = {};

    constructor(
        private route: ActivatedRoute,
        private residentService: ResidentService,
        private residentRecordService: ResidentRecordService,
    ) { }

    ngOnInit() {
        console.log('ResidentDetailsComponent initialized');
        // Get the resident id from the route parameters
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log('Route params:', params);
            // Call the method to fetch resident details
            this.loadResidentDetails();
            this.loadResidentRecords();
        });
    }


    loadResidentDetails() {
        this.residentService.getById(this.id).subscribe(
            (resident: any) => {
                this.resident = resident; // Assign the fetched resident data to the local property
                console.log('Resident details loaded:', resident);
            },
            error => {
                console.error('Error fetching resident details:', error);
                // Handle error here (e.g., display error message)
            }
        );
    }

    loadResidentRecords() {
        this.residentRecordService.getById(this.id).subscribe(
            (record: any) => {
                this.record = record; // Assign the fetched resident data to the local property
                console.log('Resident details loaded:', record);
            },
            error => {
                console.error('Error fetching resident details:', error);
                // Handle error here (e.g., display error message)
            }
        );
    }

    generateCertificate() {
        this.residentRecordService.generateCertificate(this.id, this.record.certificatePurpose).subscribe(
            (response: any) => {
                console.log('Certificate generated:', response);
                // Initiate download
                window.open(response.pdfFilePath, '_blank');
            },
            error => {
                console.error('Error generating certificate:', error);
                // Handle error here (e.g., display error message)
            }
        );
    }
}