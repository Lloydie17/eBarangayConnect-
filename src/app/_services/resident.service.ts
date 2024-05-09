import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Resident } from '@app/_models';

const baseUrl = `${environment.apiUrl}/residents`;

@Injectable({ providedIn: 'root' })
export class ResidentService {
    private residentSubject: BehaviorSubject<Resident>;
    public resident: Observable<Resident>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.residentSubject = new BehaviorSubject<Resident>(null);
        this.resident = this.residentSubject.asObservable();
    }

    public get residentValue(): Resident {
        return this.residentSubject.value;
    }

    getAll() {
        return this.http.get<Resident[]>(baseUrl)
    }

    getById(id: string) {
        return this.http.get<Resident>(`${baseUrl}/${id}`);
    }
    
    createResident(params) {
        return this.http.post(baseUrl, params);
    }
    
    updateResident(id, params) {
        return this.http.put(`${baseUrl}/${id}`, params)
            .pipe(map((resident: any) => {
                // update the current account if it was updated
                if (this.residentValue && resident.id === this.residentValue.id) {
                    // publish updated account to subscribers
                    resident = { ...this.residentValue, ...resident };
                    this.residentSubject.next(resident);
                }
                return resident;
            }));
    }

    deleteResident(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}