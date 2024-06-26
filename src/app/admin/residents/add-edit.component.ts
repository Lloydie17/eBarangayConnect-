import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ResidentService, AlertService } from '@app/_services';
import * as L from 'leaflet';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    residents: any = {};

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private residentService: ResidentService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            birthDate: ['', Validators.required],
            occupation: [''], // Allow null for occupation
            address: ['', Validators.required],
            contactNumber: ['', Validators.required, Validators.pattern('[0-9]{11}')],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
        });

        if (!this.isAddMode) {
            this.residentService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }

        this.initMap();
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
            this.createResident();
        } else {
            this.updateResident();
        }
    }

    private createResident() {
        this.residentService.createResident(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Resident created successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateResident() {
        this.residentService.updateResident(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    initMap() {
        const map = L.map('map').setView([10.297405769592698, 123.89704951632723], 20);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        map.on('click', (e: any) => {
            const { lat, lng } = e.latlng;
            this.form.controls['latitude'].setValue(lat.toString());
            this.form.controls['longitude'].setValue(lng.toString());
        });
    }
}
