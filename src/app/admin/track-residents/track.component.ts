import { Component } from '@angular/core';
import { ResidentService } from '@app/_services';

@Component({
  templateUrl: 'track.component.html',
  styleUrls: ['track.component.css']
})
export class TrackComponent {
    residentName: string;
    residentLocation: any; // Object to hold latitude and longitude

    constructor(private residentService: ResidentService) { }

    searchResident() {
        this.residentService.getResidentLocation(this.residentName)
            .subscribe((data: any) => {
                console.log("Response from API:", data); // Log the response from the API
                this.residentLocation = data;
                this.updateMap(this.residentLocation.latitude, this.residentLocation.longitude);
            }, error => {
                console.log(error);
            });
    }

    updateMap(latitude: number, longitude: number) {
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        const mapIframe = document.getElementById('googleMap') as HTMLIFrameElement;
        mapIframe.src = `https://www.google.com/maps?q=${latitude},${longitude}&z=90&output=embed`;
    }
}