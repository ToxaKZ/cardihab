import { Component, OnInit } from '@angular/core';
import { MedicationSearch } from '../medication-search';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  constructor(private http: HttpClient) { }

  model = new MedicationSearch("0400000000", "0400000000", "NORPACE, AMIODARONE, CORDARONE");
  responseData = [];
  gotData = false;
  submitted = false;
  that = this;
  onSubmit() {
    this.responseData = [];
    this.gotData = false;
    var medications = this.model.medications.split(',')

    let medicationTerm = medications.pop();
    this.doRequest(medicationTerm, medications, this, this.pickNext);

  }

  doRequest(medicationTerm, medications, that, pickNextCb) {
    this.http.get('http://localhost:8080/search_medication', { params: { username: this.model.username, password: this.model.password, term: medicationTerm.trim() } })
      .subscribe(
        data => {
          this.responseData.push({ name: medicationTerm, data: data });
          this.gotData = true;
          pickNextCb(medications, that);
        },
        error => {
          this.responseData.push({ name: medicationTerm, data: error });
          this.gotData = true;
          pickNextCb(medications, that);
        }
      );
  }

  pickNext(medications, that) {    
    let nextmedicationTerm = medications.pop();    
    if (nextmedicationTerm) {      
      setTimeout(() => {        
        that.doRequest(nextmedicationTerm, medications, that, that.pickNext);
      }, 1000);
    }
  }



  ngOnInit() {
  }

}
