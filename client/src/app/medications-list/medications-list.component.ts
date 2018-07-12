import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-medications-list',
  templateUrl: './medications-list.component.html',
  styleUrls: ['./medications-list.component.css']
})
export class MedicationsListComponent implements OnInit {
  @Input() medications: any;
  constructor() { }

  ngOnInit() {

  }

  get errors() {
    var errorMedications = [];
    this.medications.forEach(medication => {
      if (medication.data.error && medication.data.error.httpStatus == "INTERNAL_SERVER_ERROR") {
        errorMedications.push(medication.name);
      }
    });
    return errorMedications;
  }

  get notFounds() {
    var notFoundMedications = [];
    this.medications.forEach(medication => {
      if (medication.data.error && medication.data.error.httpStatus == "NOT_FOUND") {
        notFoundMedications.push(medication.name);
      }
    });
    return notFoundMedications;
  }

  get foundMedications() {
    var foundMedications = [];
    this.medications.forEach(medication => {
      if (medication.data.httpStatus == "OK") {
        foundMedications.push({ name: medication.name, data: medication.data.data, expanded: false });
      }
    });
    return foundMedications;
  }


}
