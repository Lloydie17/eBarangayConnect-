import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResidentService, ResidentRecordService } from '@app/_services';
import { ResidentRecord } from '@app/_models';

@Component({ templateUrl: 'resident-details.component.html' })
export class ResidentDetailsComponent implements OnInit {
    resident: any = {};
    id: string;
    records: ResidentRecord[] = [];
    selectedRecord: ResidentRecord; // To hold the record for certificate generation

    constructor(
        private route: ActivatedRoute,
        private residentService: ResidentService,
        private residentRecordService: ResidentRecordService,
    ) { }

    ngOnInit() {
        console.log('ResidentDetailsComponent initialized');
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log('Route params:', params);
            this.loadResidentDetails();
        });
    }

    loadResidentDetails() {
        this.residentService.getById(this.id).subscribe(
            (resident: any) => {
                this.resident = resident;
                console.log('Resident details loaded:', resident);
                this.loadResidentRecords();
            },
            error => {
                console.error('Error fetching resident details:', error);
            }
        );
    }

    loadResidentRecords() {
        this.residentRecordService.getAllByResidentId(this.id).subscribe(
            (records: ResidentRecord[]) => {
                this.records = records;
                console.log('Resident records loaded:', records);
            },
            error => {
                console.error('Error fetching resident records:', error);
            }
        );
    }

    generateCertificate(record: ResidentRecord) {
        this.selectedRecord = record;
        this.residentRecordService.generateCertificate(this.id, record.certificatePurpose).subscribe(
            (response: any) => {
                console.log('Certificate generated:', response);
                window.open(response.pdfFilePath, '_blank');
            },
            error => {
                console.error('Error generating certificate:', error);
            }
        );
    }
}
