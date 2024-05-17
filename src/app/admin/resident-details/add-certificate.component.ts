import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ResidentRecordService, AlertService } from '@app/_services';
import { ResidentRecord } from '@app/_models';

@Component({ templateUrl: 'add-certificate.component.html' })
export class AddCertificateComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private residentRecordService: ResidentRecordService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
    console.log('AddCertificateComponent initialized');
    this.id = this.route.snapshot.params['id'];
    console.log('Route snapshot params:', this.route.snapshot.params);
    this.isAddMode = true; // Always set to add mode

    this.form = this.formBuilder.group({
        residentId: [this.id],
        certificatePurpose: ['', Validators.required]
    });

    if (this.id) {
        this.residentRecordService.getById(this.id)
            .pipe(first())
            .subscribe((x: ResidentRecord) => {
                this.form.patchValue(x);
                console.log('Resident Record:', x);
            });
    }
}


    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createCertificate();
        }
    }

    private createCertificate() {
        const formData = { ...this.form.value, residentId: this.id };
        this.loading = true; // Set loading to true before making the request
        this.residentRecordService.createCertificate(formData)
            .pipe(first())
            .subscribe({
                next: (residentRecord: ResidentRecord) => { // Specify the type of residentRecord
                    this.alertService.success('Certificate created successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../../resident', residentRecord.id], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false; // Make sure to stop loading on error
                }
            });
    }
      
    
}
