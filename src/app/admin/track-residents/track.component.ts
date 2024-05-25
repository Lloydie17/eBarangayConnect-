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
    satelliteLayer: L.TileLayer;
    streetLayer: L.TileLayer;

    constructor(private residentService: ResidentService) { }

    ngOnInit() {
        this.initMap();
    }

    initMap() {
        this.map = L.map('map').setView([10.297405769592698, 123.89704951632723], 20);

         // Street view layer
         this.streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        });

        // Satellite view layer
        this.satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles © Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });

        // Add the street view layer by default
        this.streetLayer.addTo(this.map);

        const icon = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41], // size of the icon
            iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
            popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
            shadowSize: [41, 41] // size of the shadow
        });

        this.marker = L.marker([10.297405769592698, 123.89704951632723], { icon }).bindPopup('Loading...').addTo(this.map);

        // Layer control to switch between street and satellite views
        const baseLayers = {
            "Street View": this.streetLayer,
            "Satellite View": this.satelliteLayer
        };
        L.control.layers(baseLayers).addTo(this.map);
    }

    searchResident() {
        this.residentService.getResidentLocation(this.residentName)
            .subscribe((data: any) => {
                console.log("Response from API:", data); // Log the response from the API
                this.residentLocation = data;
                this.updateMap(this.residentLocation.latitude, this.residentLocation.longitude, this.residentLocation.fullName);
                this.displayedResidentName = this.residentLocation.fullName;
                this.showResidentName = true;
            }, error => {
                console.log(error);
                this.showResidentName = false;
            });
    }

    updateMap(latitude: number, longitude: number, fullName: string) {
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        this.map.setView([latitude, longitude], 30);
        this.marker.setLatLng([latitude, longitude]);
        this.marker.setPopupContent(fullName).openPopup();
    }
}
