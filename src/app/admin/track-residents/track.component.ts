import { Component } from '@angular/core';
import { ResidentService } from '@app/_services';

@Component({
  templateUrl: 'track.component.html',
  styleUrls: ['track.component.css']
})
export class TrackComponent {
    residentName: string;
    displayedResidentName: string; // Variable to hold the name to be displayed
    residentLocation: any; // Object to hold latitude and longitude
    showResidentName: boolean = false; // Control the visibility of the resident name label

    constructor(private residentService: ResidentService) { }

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
        const mapIframe = document.getElementById('googleMap') as HTMLIFrameElement;
        mapIframe.src = `https://www.google.com/maps?q=${latitude},${longitude}&z=20&t=k&output=embed`;
    }
}
