import { Component, OnInit } from '@angular/core';
import { ResidentService } from '@app/_services';

import * as L from 'leaflet';

@Component({
  templateUrl: 'track.component.html',
  styleUrls: ['track.component.css']
})
export class TrackComponent implements OnInit {
    residentName: string;
    displayedResidentName: string; // Variable to hold the name to be displayed
    residentLocation: any; // Object to hold latitude and longitude
    showResidentName: boolean = false; // Control the visibility of the resident name label
    map: L.Map;
    marker: L.Marker;

    constructor(private residentService: ResidentService) { }

    ngOnInit() {
        this.initMap();
    }

    initMap() {
        this.map = L.map('map').setView([10.297405769592698, 123.89704951632723], 20);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        this.marker = L.marker([10.297405769592698, 123.89704951632723]).addTo(this.map);
    }

    searchResident() {
        this.residentService.getResidentLocation(this.residentName)
            .subscribe((data: any) => {
                console.log("Response from API:", data); // Log the response from the API
                this.residentLocation = data;
                this.updateMap(this.residentLocation.latitude, this.residentLocation.longitude);
                this.displayedResidentName = this.residentName;
                this.showResidentName = true;
            }, error => {
                console.log(error);
                this.showResidentName = false;
            });
    }

    updateMap(latitude: number, longitude: number) {
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        this.map.setView([latitude, longitude], 20);
        this.marker.setLatLng([latitude, longitude]);
    }
}
