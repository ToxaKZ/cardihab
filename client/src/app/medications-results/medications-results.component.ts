import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-medications-results',
  templateUrl: './medications-results.component.html',
  styleUrls: ['./medications-results.component.css']
})
export class MedicationsResultsComponent implements OnInit {
  @Input() medications: any;
  constructor() { }

  ngOnInit() {
  }
}
