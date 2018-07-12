import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationsResultsComponent } from './medications-results.component';

describe('MedicationsResultsComponent', () => {
  let component: MedicationsResultsComponent;
  let fixture: ComponentFixture<MedicationsResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicationsResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
